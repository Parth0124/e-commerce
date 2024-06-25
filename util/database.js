// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("e_commerce", "root", "Parth0124", {
//   dialect: "mysql",
//   host: 'localhost',
// });

// module.exports = sequelize

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://abhangparth:Parth0124@cluster0.c2oyrqb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
    .then((result) => {
      console.log("Successfully connected!");
      _db = client.db()
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err
    });
};

const getDb = () => {
    if(_db)
    {
        return _db;
    }
    else
    {
        throw 'No Database found!'
    }
}


exports.mongoConnect = mongoConnect;
exports.getDb = getDb;