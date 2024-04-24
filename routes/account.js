var express = require('express');
const UserModel = require('../models/UserModel');
const DepartmentModel = require('../models/DepartmentModel');
const { layouts } = require('chart.js');
var router = express.Router();

//get all user
router.get('/',  async(req, res) => {
    try{
        const userList = await UserModel.find({}).populate('department'); 
        res.render('account/index', {userList, layout: 'admin_layout'}); 
    }catch(error){
        res.send(error); 
    }
 })

router.get('/edit/:id' , async(req, res) => {
    var id = req.params.id; 
    var departmentList = await DepartmentModel.find({}); 
    var user = await UserModel.findById(id);
    res.render('account/edit', {departmentList, user,layout: 'admin_layout'});
})

//xu li xu kien 
router.post('/edit/:id', async(req, res)=>{
    try{
        var id = req.params.id;
        var user = req.body
        await UserModel.findByIdAndUpdate(id, user);
        res.redirect('/account'); 
    }
    catch(error) {
                if(err.name === 'ValidationError'){
                    let InputErrors = {};
                    for(let field in err.errors){
                        InputErrors[field] = err.errors[field].message; 
                    }
                    res.render('account/edit', {InputErrors, user});
                } 
                res.send(error); 
    }  
})

//new

//get user by role.

//get user by department

//edit user 

//xu li nut delete by id 
router.get('/delete/:id', async(req, res) => {
    var id = req.params.id; 
    await UserModel.findByIdAndDelete(id); 
    res.redirect('/account'); 
})

//profile
//edit profile. 
router.get('/edit/:id' , async(req, res) => {
    var id = req.params.id; 
    var departmentList = await DepartmentModel.find({}); 
    var user = await UserModel.findById(id);
    res.render('profile/edit', {departmentList, user,layout: 'user_layout'});
})
module.exports = router; 