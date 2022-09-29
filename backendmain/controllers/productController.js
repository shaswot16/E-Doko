const Product = require("../models/productModel");
const express = require('express')
const bp = require('body-parser');
const Errorhandler = require("../utilis/errorhandler");
const ApiFeatures = require("../utilis/apifatures");





//json parser
const app = express()
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(express.json());

require('../config/database')

//Create Product -- Admin
exports.createProducts = async (req, res) => {

    const user = new Product(req.body);
    console.log(user);

    await user.save();

    res.status(201).json({
        sucess: true,

    })

}

// Get all Products
exports.getAllProducts = async (req, res) => {

    const resultPerPage =5;
    const productCount = await Product.countDocuments();


    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    const product = await apiFeature.query;//To get all the products
    res.status(200).json({
        sucess: true,
        product,
        productCount

    });
}

// Update Product -- Admin
exports.updateProducts = async (req, res,next) => {

    const id = req.params.id;

    try {
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true, runValidators: true,
            useFindAndModify: false
        })
    
        res.status(200).json({
            sucess: true,
            product
        });

    }
    catch (error) {
        return next(new Errorhandler("Product not Found",404))
       

    }




}

exports.deleteProducts = async (req, res, next) => {

    const id = req.params.id;

    try {
        const product = await Product.findById(id);
        await product.remove();

        res.status(200).json({
            sucess: true,
            message: "Product Delete Successfully"
        });

    }
    catch (error) {
        return next(new Errorhandler("Product not Found",404))
       

    }
}


//Get Product Details
exports.getProductDetails = async (req, res, next) => {

    const id = req.params.id;

    try {
        const product = await Product.findById(id);
        res.status(200).json({
            sucess: true,
            product
        });

    }
    catch (error) {
        return next(new Errorhandler("Product not Found",404))
       

    }
}