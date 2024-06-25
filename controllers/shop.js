const Product = require('../models/product');
const Cart = require('../models/cart');
const { where } = require('sequelize');

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err => {
    console.log(err)
  })
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll({where: {id: prodId}})
  .then(products => {
    res.render('shop/product-detail', {
      product: products[0],
      pageTitle: products[0].title,
      path: '/products'
    });
  })
  .catch(err => {
    console.log(err);
  })
};

exports.getIndex = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err => {
    console.log(err)
  })
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
  .then(cart => {
    return cart.getProducts()
    .then(products => {
      res.render('shop/cart', {
         path: '/cart',
         pageTitle: 'Your Cart',
         products: products
       });
    })
    .catch(err => {
      console.log(err);
    })
  })
  .catch(err => {
    console.log(err);
  })
  // Cart.getCart(cart => {
  //   if (!cart) {
  //     cart = { products: [], totalPrice: 0 };
  //   }
  //   Product.fetchAll()
  //     .then(([products, fieldData]) => {
  //       const cartProducts = [];
  //       for (let product of products) {
  //         const cartProductData = cart.products.find(prod => prod.id === product.id);
  //         if (cartProductData) {
  //           cartProducts.push({ productData: product, qty: cartProductData.qty });
  //         }
  //       }
  //       res.render('shop/cart', {
  //         path: '/cart',
  //         pageTitle: 'Your Cart',
  //         products: cartProducts
  //       });
  //     })
  //     .catch(err => console.log(err));
  // });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  req.user.getCart()
  .then(cart => {
    fetchedCart = cart;
    return cart.getProducts({where: {id: prodId}});
  })
  .then(products => {
    let product;
    if(products.length> 0)
      {
        const product = products[0]
      }
    let newQuantity = 1;
    if(product)
    {
      //
    }
    return Product.findByPk(prodId)
    .then(product => {
      return fetchedCart.addProduct(product, { through: {quantity: newQuantity} })
    })
    .catch(err => {
      console.log(err);
    })
    .then(() => {
      res.redirect('/cart');
    })
  })
  .catch(err => {
    console.log(err);
  })
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(([product]) => {
      Cart.deleteProduct(prodId, product[0].price);
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
