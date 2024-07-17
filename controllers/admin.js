const { ValidationError } = require('sequelize');
const Product = require('../models/product');
const { body, validationResult } = require('express-validator');
const fileHelper = require('../util/file')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    hasError: false,
    errorMessage: null,
  });
};

exports.postAddProduct = [
  body('title', 'Title must be at least 3 characters long.')
  .isString()
  .isLength({ min: 3 })
  .trim()
  .custom(value => {
    if (!/^[a-zA-Z0-9 ]+$/.test(value)) {
      throw new Error('Title can only contain letters, numbers, and spaces.');
    }
    return true;
  }),
  body('price', 'Price must be a number.').isFloat(),
  body('description', 'Description must be a valid string.').isString(),
  (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.file.path; // Assign the uploaded file path to imageUrl
    const price = req.body.price;
    const description = req.body.description;
    
    // Check if imageUrl is not defined (indicating no file was attached)
    if (!imageUrl) {
      return res.status(422).render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
        hasError: true,
        errorMessage: 'Attached file is not an image.',
        product: {
          title: title,
          price: price,
          description: description,
        },
        ValidationErrors: []  // Ensure ValidationErrors is correctly spelled
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
        hasError: true,
        errorMessage: errors.array()[0].msg,
        product: {
          title: title,
          imageUrl: imageUrl,
          price: price,
          description: description,
        },
        ValidationErrors: []  // Ensure ValidationErrors is correctly spelled
      });
    }

    const product = new Product({
      title: title,
      price: price,
      description: description,
      imageUrl: imageUrl,
      userId: req.user
    });
    product
      .save()
      .then(result => {
        console.log('Created Product');
        // Redirect to a page where you display the newly created product
        res.redirect('/admin/products');
      })
      .catch(err => {
        console.log(err);
        // Handle error appropriately
        res.status(500).render('admin/edit-product', {
          pageTitle: 'Add Product',
          path: '/admin/add-product',
          editing: false,
          hasError: true,
          errorMessage: 'Database operation failed, please try again.',
          product: {
            title: title,
            imageUrl: imageUrl,
            price: price,
            description: description,
          },
          ValidationErrors: []
        });
      });
  }
];

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        hasError: false,
        product: product,
        errorMessage: null,
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const image = req.file;
  const updatedDesc = req.body.description;

  Product.findById(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      if(image)
      {
        fileHelper.deleteFile(product.imageUrl);
        product.imageUrl = image.path;
      }
      return product.save();
    })
    .then(result => {
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId).then(product => {
    if(!product)
    {
      return next(new Error('Product Not Found.'))
    }
    fileHelper.deleteFile(product.imageUrl);
    return Product.findByIdAndRemove(prodId)
  })
  .then(() => {
    console.log('DESTROYED PRODUCT');
    res.redirect('/admin/products');
  })
  .catch((err) => {
    next(err);
  })
  
};
