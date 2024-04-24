var mongoose = require('mongoose'); 
var categorybreakSchema = mongoose.Schema({

    name:{
        type: String, 
        require: true, 
        minLength: [3, "Name category break can not be smaller than 3 characters"], 
        maxLength: 30
    }, 
    description: {
        type: String, 
        require: true, 
        minLength: [3, "description break can not be smaller than 3 characters"], 
        maxLength: 50
    }
    
}); 

var CategorybreakModel = mongoose.model('categorybreak', categorybreakSchema, 'categorybreak'); 
module.exports = CategorybreakModel; 
