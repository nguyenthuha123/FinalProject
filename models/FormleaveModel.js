var mongoose = require('mongoose'); 
var FormSchema = mongoose.Schema({
  usernameEmployee:{
    type: String,
  },
  email:{
    type: String,
  },
// department:{
//     type: mongoose.SchemaTypes.ObjectId, 
//     ref: 'department'
//   },
categorybreak: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'categorybreak'
  }, 
  startdate: {
    type: String, 
    require: true
  },
  enddate: {
    type: String, 
    require: true
  }, 
  leader:{
    type: mongoose.SchemaTypes.ObjectId, 
    ref: 'user'
  },
  description:{
    type: String, 
    minLength: [3, "status can not be smaller than 3 characters"], 
    maxLength: 30
  }, 
  status:{
    type: String, 
    require: true, 
    enum: ["refuse", "accept"],
    minLength: [3, "status can not be smaller than 3 characters"], 
    maxLength: 30
  },
  // user:{
  //   type: mongoose.SchemaTypes.ObjectId, 
  //   ref: 'user'
  // },
  // datelimit:{
  //   type: mongoose.SchemaTypes.ObjectId, 
  //   ref: 'datebreaklimit'
  // },
}); 

var FormModel = mongoose.model('form', FormSchema, 'form' ); 
module.exports = FormModel; 