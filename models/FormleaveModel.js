var mongoose = require('mongoose'); 
var FormSchema = mongoose.Schema({
  employeeName:{
    type: String,
  },
  employeeEmail:{
    type: String,
  },
  department:{
  type: String,
  },
  position:{
    type: String,
    },
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
  status:{
    type: String, 
    enum: ["appending", "approved","rejected"], 
  },
  description:{
    type: String, 
    minLength: [3, "description can not be smaller than 3 characters"], 
    maxLength: 30
  },
  reasonRejected:{
    type: String, 
    minLength: [3, "reasonRejected can not be smaller than 3 characters"], 
    maxLength: 30
  },
}); 

var FormModel = mongoose.model('form', FormSchema, 'form' ); 
module.exports = FormModel; 