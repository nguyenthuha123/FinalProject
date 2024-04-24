var mongoose = require('mongoose'); 
var UserSchema = mongoose.Schema({
    username: {
      type: String,
      unique: true, 
      require: true,
      minLength: [3, "username can not be smaller than 3 characters, please try again"], 
      maxLength: 50
    },
    email: {
        type: String,
        require: true,
        minLength: [3, "email can not be smaller than 3 characters, please try again"], 
        maxLength: 50
    },
    password: {
        type: String, 
        require: true, 
    }, 
    department:{
        type: mongoose.SchemaTypes.ObjectId, 
        ref: 'department'
    },
    role:{
        type: String,
        require: true,
    },
    position: {
        type: String, 
        minLength: [3, "address can not be smaller than 3 characters, please try again"], 
        maxLength: 50
     },
    uploadimage: {
        type: String, 
    }, 
    address: {
     type: String, 
     minLength: [3, "address can not be smaller than 3 characters, please try again"], 
     maxLength: 50
    },
 
}); 
var UserModel = mongoose.model('user', UserSchema,'user'); 
module.exports = UserModel; 