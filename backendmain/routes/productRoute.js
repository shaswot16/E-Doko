//We will create roots in this file and the functions will be defined in the controller

const express = require("express");
const { getAllProducts, createProducts, updateProducts, deleteProducts, getProductDetails, homePage } = require("../controllers/productController");
const { isAuthenticateduser, authorizeRoles } = require("../middleware/authentication");
const router = express.Router();

router.route("/").get(isAuthenticateduser,homePage);

router.route("/products").get( getAllProducts);

router
    .route("/admin/products/new")
    .post(isAuthenticateduser, authorizeRoles("admin"), createProducts);
router
    .route("/admin/products/:id")
    .put(isAuthenticateduser, authorizeRoles("admin"), updateProducts)
    .delete(isAuthenticateduser, deleteProducts)
    .get(getProductDetails);

module.exports = router;