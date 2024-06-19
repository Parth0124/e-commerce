const express = require("express");
const bodyParser= require('body-parser')
const path = require('path')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use((req,res,next) => {
    res.status(404).render('404', {pageTitle: 'Page not found', path: ''})
})

app.listen(3000);