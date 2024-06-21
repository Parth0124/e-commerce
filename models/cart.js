const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err && fileContent.length > 0) {
        try {
          cart = JSON.parse(fileContent);
        } catch (parseError) {
          console.error('Error parsing JSON file: ', parseError);
        }
      }
      const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products.push(updatedProduct);
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        if (err) {
          console.error('Error writing to file: ', err);
        }
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, data) => {
      if (err || data.length === 0) {
        return;
      }
      let updatedCart;
      try {
        updatedCart = JSON.parse(data);
      } catch (parseError) {
        console.error('Error parsing JSON file: ', parseError);
        return;
      }
      const product = updatedCart.products.find(prod => prod.id === id);
      if (!product) {
        return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
      updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        if (err) {
          console.error('Error writing to file: ', err);
        }
      });
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, data) => {
      if (err || data.length === 0) {
        cb({ products: [], totalPrice: 0 }); // Return default cart object instead of null
        return;
      }
      let cart;
      try {
        cart = JSON.parse(data);
      } catch (parseError) {
        console.error('Error parsing JSON file: ', parseError);
        cb({ products: [], totalPrice: 0 }); // Return default cart object in case of parsing error
        return;
      }
      cb(cart);
    });
  }
};
