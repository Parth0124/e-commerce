const getDb = require('../util/database').getDb

class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title,
    this.imageUrl = imageUrl,
    this.price = price,
    this.description = description
  }

  save()
  { 
    const db = getDb();
    return db.collection('products')
    .insertOne(this)
    .then(result => {
      console.log(result);
    })
    .catch (err => {
      console.log(err)
    });
  }

static fetchAll() 
{
  const db = getDb()
  return db.collection('products').find().toArray()
  .then(products => {
    console.log(products);
    return products
  })
  .catch(error => {
    console.log(error);
  });
}

}

module.exports = Product;

//const Product = sequelize.define('product', {
  //   id: {
  //     type: Sequelize.INTEGER,
  //     autoIncrement: true,
  //     allowNull: false,
  //     primaryKey: true
  //   }, 
  //   title: {
  //     type: Sequelize.STRING,
  //     allowNull: false
  //   },
  //   price: {
  //     type: Sequelize.DOUBLE,
  //     allowNull: false
  //   },
  //   imageUrl: {
  //     type: Sequelize.STRING,
  //     allowNull: false,
  //   },
  //   description: {
  //     type: Sequelize.STRING,
  //     allowNull: false
  //   }
  // })