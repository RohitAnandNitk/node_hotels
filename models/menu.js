const mongoose  = require('mongoose');

// define the person sechema 
const MenuSchema =new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    price:{
        type : Number
    },
    taste:{
        type : String,
        required : true
    },
    is_drink :{
        type : Boolean,
        default: false,
        required: true
    },
    ingredients : {
        type : String,
        enum : ["chicken wings" , "spices"  ,"sauce"],
    },
    num_sales :{
        type : Number,
        required: true
    }
}); 

// create person model
const Menu = mongoose.model('Menu', MenuSchema);
module.exports = Menu;
 