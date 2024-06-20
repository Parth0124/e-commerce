const express = require("express");
const path = require("path");
const { getAddProduct, postAddProduct, getProducts } = require("../controllers/admin");

const router = express.Router();

router.get("/add-product", getAddProduct);

router.get('/products', getProducts);

router.post("/add-product", postAddProduct);

module.exports = router
