// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// const ObjectId = mongodb.ObjectId;

// class User {
//   constructor(username, email, cart = { items: [] }, id) {
//     this.name = username;
//     this.email = email;
//     this.cart = cart; // Default to { items: [] }
//     this._id = id ? new ObjectId(id) : null;
//   }

//   async save() {
//     const db = getDb();
//     try {
//       const result = await db.collection('users').insertOne(this);
//       return result;
//     } catch (err) {
//       console.error('Error saving user:', err);
//       throw err;
//     }
//   }

//   async addToCart(product) {
//     if (!this.cart) {
//       this.cart = { items: [] };
//     }

//     const cartProductIndex = this.cart.items.findIndex(cp => {
//       return cp.productId.toString() === product._id.toString();
//     });

//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];

//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({
//         productId: new ObjectId(product._id),
//         quantity: newQuantity
//       });
//     }

//     const updatedCart = { items: updatedCartItems };
//     const db = getDb();

//     try {
//       const result = await db
//         .collection('users')
//         .updateOne(
//           { _id: new ObjectId(this._id) },
//           { $set: { cart: updatedCart } }
//         );
//       return result;
//     } catch (err) {
//       console.error('Error adding to cart:', err);
//       throw err;
//     }
//   }

//   getCart()
//   {
//     const db = getDb();
//     const productIds = this.cart.items.map(i => {
//       return i.productId;
//     })
//     return db.collection('products').find({_id: {$in: productIds}}).toArray()
//     .then(products => {
//       return products.map(p=> {
//         return {...p, quantity: this.cart.items.find(i => {
//           return i.productId.toString() === p._id.toString();
//         }). quantity};
//       });
//     });
//   }

//   deleteItemFromCart(productId)
//   {
//     const updatedCartItems = this.cart.items.filter(item => {
//       return item.productId.toString() !== productId.toString();
//     });
//     const db = getDb();
//     return db 
//     .collection('users')
//       .updateOne(
//         { _id: new ObjectId(this._id) },
//         { $set: {cart: {items: updatedCartItems}}}
//       )
//   }

//   static async findById(userId) {
//     const db = getDb();
//     try {
//       const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
//       return user;
//     } catch (err) {
//       console.error('Error finding user by ID:', err);
//       throw err;
//     }
//   }
// }

// module.exports = User;
