const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        maxLength: 8
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
            required: [true]
        },
        url: {
            type: String,
            required: [true]
        }
    }
    ],
    category: {
        type: String,
        required: true
    },
    Stock: {
        type: String,
        required: true,
        maxLength: [4, "Stock cannot exceed 4 Character"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{type:String,
                //required:[true]
            },
            rating:{
                type:Number,
               // required:[true]
            },
            comment:{
                type:String,
                //required:[true]
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Product = mongoose.model("Product", productSchema);
module.exports =Product;