const { layouts } = require('chart.js');
var express = require('express');
var router = express.Router();; 

/* GET home page. */
router.get('/',  function(req, res, next) {
  res.render('auth/loginUser',{layout: 'auth_layout'});
});
router.get('/login', (req, res)=>{
  res.render('auth/loginUser', {layout: 'auth_layout'});
}), 

router.get('/admin', (req, res)=>{
  res.render('admin/dashboard', {layout: 'admin_layout'}); 
})
router.get('/employee', (req, res)=>{
  res.render('employee/homepage', {layout: 'user_layout'}); 
})

// router.get('/leader', (req, res)=>{
//   res.render('leader/homepage',{layout: 'leader_layout'}); 
// })

router.get("/abc", function (req, res) {
  res.json({ a: 1 });
});

module.exports = router;
