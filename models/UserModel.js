var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
    username: {
        type: String,
        // unique: true,
        require: true,
        minLength: [3, "username can not be smaller than 3 characters, please try again"],
        maxLength: 50
    },
    email: {
        type: String,
        require: true,
        unique: true,
        minLength: [3, "email can not be smaller than 3 characters, please try again"],
        maxLength: 50
    },
    password: {
        type: String,
        require: true,
    },

    role: {
        type: String,
        require: true,
        minLength: [3, "role can not be smaller than 3 characters, please try again"],
        maxLength: 50
    },
    department: {
        type: String,
        require: true,
        minLength: [3, "Department can not be smaller than 3 characters, please try again"],
        maxLength: 50
    },
    position: {
        type: String,
        // unique: true,
        minLength: [3, "Position can not be smaller than 3 characters, please try again"],
        maxLength: 50
    },
    birthdate: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
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
var UserModel = mongoose.model('user', UserSchema, 'user');
module.exports = UserModel;