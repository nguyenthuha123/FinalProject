var express = require('express');
var router = express.Router(); 
const UserModel = require('../models/UserModel');
const DepartmentModel = require('../models/DepartmentModel');

var bcrypt = require('bcryptjs'); 
var salt = 8; 


//create form 
router.get('/register', async (req, res)=>{
    const departmentList = await DepartmentModel.find({});
    res.render('auth/register', {departmentList, layout: 'auth_layout'});
})

//xu li creatw user. 
router.post('/register',async (req, res) =>{
    try{
        var userRegistration = req.body;  
        var hashPassword = bcrypt.hashSync(userRegistration.password, salt); 
        var user = {
            username: userRegistration.username,
            email: userRegistration.email, 
            password: hashPassword, 
            department: userRegistration.department, 
            role: userRegistration.role, 
        }
        await UserModel.create(user); 
        res.redirect('/auth/login'); 

    }catch(err){
        if(err.name === 'ValidationError'){
            let InputErrors = {};
            for(let field in err.errors){
                InputErrors[field] = err.errors[field].message; 
            }
            res.render('auth/register', {InputErrors, userRegistration});
        } 
    }
})

router.get('/login', async(req, res)=>{
    res.render('auth/login', {layout: 'auth_layout'});
})

router.post('/login', async (req, res)=>{
  
        var userLogin = req.body; 
        var user = await UserModel.findOne({email: userLogin.email}); 
        if(user){
            var hash = bcrypt.compareSync(userLogin.password, user.password); 
            if(hash){
               //create session after login succeed
                req.session.username = user.username;
                req.session.email = user.email; 
                req.session.department = user.department; 
                req.session.role = user.role; 
                if(req.session.role =="admin")
                res.redirect('/admin'); 
                else if(req.session.role == "employee"){
                res.redirect('/employee'); 
                }
                else{
                    res.redirect('/leader'); 
                }
            } 
        }
        else{
            res.redirect('/auth/login');
    }
})

router.get('/logout', (req, res) =>{
    req.session.destroy(); 
    res.redirect("/auth/login"); 
})

router.get('/forgotpw', (req, res)=>{
    res.render('auth/forgotpw');
})

module.exports = router; 