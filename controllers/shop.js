const Product = require('../models/product')

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getCart = (req,res,next) => {
  res.render('shop/cart.ejs', {
    path: '/cart',
    pageTitle: 'Your Cart'
  })
}

exports.getCheckout = (req,res,next) => {
  res.render('shop/checkout.ejs', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
}
 