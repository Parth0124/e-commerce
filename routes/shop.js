const express = require('express');

const router = express.Router()

router.get('/', (req,res,next) => {
    console.log("In the second middleware");
    res.send('<h1>Hello from express</h1>')
})

module.exports = router