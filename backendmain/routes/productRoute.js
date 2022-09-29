//We will create roots in this file and the functions will be defined in the controller

const express =require("express");
const { getAllProducts ,createProducts,updateProducts,deleteProducts,getProductDetails} = require("../controllers/productController");
const router= express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/new").post(createProducts);
router.route("/products/:id").put(updateProducts).delete(deleteProducts).get(getProductDetails);




module.exports = router;