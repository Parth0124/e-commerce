const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, price, description);
  product
  .save()
  .then(result => {
    console.log('Created Product!');
    res.redirect('/admin/products')
  })
  .catch(err => {
    console.log(err);
  })
};

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect('/');
//   }
//   const prodId = req.params.productId;
//   req.user.getProducts({ where: { id: prodId } })
//     .then(products => {
//       const product = products[0];
//       if (!product) {
//         return res.redirect('/');
//       }
//       res.render('admin/edit-product', {
//         pageTitle: 'Edit Product',
//         path: '/admin/edit-product',
//         editing: editMode,
//         product: product
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.redirect('/');
//     });
// };


// exports.postEditProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedPrice = req.body.price;
//   const updatedDescription = req.body.description;
//   Product.findByPk(prodId)
//   .then(product => {
//     product.title = updatedTitle;
//     product.imageUrl = updatedImageUrl;
//     product.price = updatedPrice;
//     product.description = updatedDescription;
//     return product.save();
//   })
//   .then(result => {
//     console.log("Updated the Product!")
//     res.redirect('/admin/products');
//   })
//   .catch(err => {
//     console.log(err);
//   });
// };

// exports.getProducts = (req, res, next) => {
//   req.user
//   .getProducts()
//     .then(products => {
//       res.render('admin/products', {
//         prods: products,
//         pageTitle: 'Admin Products',
//         path: '/admin/products'
//       });
//     })
//     .catch(err => console.log(err));
// };

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findByPk(prodId)
//   .then(product => {
//     return product.destroy();  
//   })
//   .then(result => {
//     console.log("destroyed product");
//     res.redirect('/admin/products');
//   })
//   .catch(err => {
//     console.log(err);
//   });
// };
