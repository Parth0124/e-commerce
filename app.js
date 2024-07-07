const path = require("path");
const mongoose = require('mongoose')

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("66852d53362fe6925c3cc038")
    .then(user => {
      req.user = user
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes); 

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://abhangparth:ParthECommerce@cluster0.c2oyrqb.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((result) => {
    User.findOne()
    .then(user => {
      if(!user)
        {
        const user = new User({
          name: "Parth",
          email: 'abhangparth@gmail.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    })
    app.listen(3000);
    console.log("Connected to database and server is running live")
  })
  .catch((error) => {
    console.log(error);
  });
