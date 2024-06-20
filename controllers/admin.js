const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render("admin/add-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
    });
  }

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const product = new Product(title,description,imageUrl,price);
    product.save();
    res.redirect("/");
  }

exports.getProducts = (req,res,next) => {
    Product.fetchAll((products) => {
        res.render("admin/products", {
          prods: products,
          pageTitle: "Admin Products",
          path: "/admin/products",
        });
      });
}