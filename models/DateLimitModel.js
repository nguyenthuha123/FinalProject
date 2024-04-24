var mongoose = require('mongoose'); 
var DateBreakLimitSchema = mongoose.Schema({
  //so ngay da nghi
  Anual_leave_balance: {
        type: Number, 
        require: true,
        minLength : [0, 'can not enter negative interger'], 
      },
  //ngay nghi gioi han 
  Annual_leave_limit:{
    type: Number, 
    require: true, 
    enum: [12],
  },
}); 
var  DateBreakLimit = mongoose.model('datebreaklimit', DateBreakLimitSchema, 'datebreaklimit' ); 
module.exports =  DateBreakLimit; 