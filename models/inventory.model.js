const mongoose = require('mongoose');

// Creating a model to represent documents which can be saved and retrieved from database.
let Inventory = mongoose.model('Inventory',
{
    id:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true,
    },
    item_name:{
        type:String,
        required:true
    },
    item_description:{
        type:String,
        required:true
    },
    item_category:{
        type:String,
        required:true
    },
    colour:{
        type:String,
        required:true
    },
    project_location:{
        type:String,
        required:true
    },
    cost_price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
});

module.exports = { Inventory };