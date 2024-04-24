var mongoose = require('mongoose'); 
var DepartmentSchema = mongoose.Schema({
  name: {
        type: String, 
        require: true,
        minLength: [3, "Name department can not be smaller than 3 characters"], 
        maxLength: 30
      },
  user:{
    type: mongoose.SchemaTypes.ObjectId, 
    ref: 'user'
  },

}); 
var DepartmentModel = mongoose.model('department', DepartmentSchema, 'department'); 
module.exports = DepartmentModel ; 