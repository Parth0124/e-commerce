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

exports.getProduct = (req,res,next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('shop/product-detail', {product: product, pageTitle: product.title, path:'/products'})
  });
}

exports.getCart = (req,res,next) => {
  res.render('shop/cart.ejs', {
    path: '/cart',
    pageTitle: 'Your Cart'
  })
}

exports.getOrders = (req,res,next) => {
  res.render('shop/orders.ejs', {
    path: '/orders',
    pageTitle: 'Your Orders'
  })
}


exports.getCheckout = (req,res,next) => {
  res.render('shop/checkout.ejs', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
}
 