var express = require('express');
const UserModel = require('../models/UserModel');
const DepartmentModel = require('../models/DepartmentModel');
const { layouts } = require('chart.js');
var router = express.Router();

//get all department
router.get('/',  async(req, res) => {
    try{
        const departmentList = await DepartmentModel.find({}).populate('user'); 
        res.render('department/index', {departmentList, layout: 'admin_layout'}); 
    }catch(error){
        res.send(error); 
    }
 })

//add department. 
router.get('/add', async(req, res)=>{
    const leaderList = await UserModel.find({});
    res.render('department/add', {leaderList, layout: 'admin_layout'}); 
})

// xu li su kien add
router.post('/add' , async(req, res) => {
    try{
        var department = req.body; 
        await DepartmentModel.create(department); 
        res.redirect('/department'); 
    }catch(err){
        if(err.name === 'ValidationError'){
            let InputErrors = {};
            for(let field in err.errors){
                InputErrors[field] = err.errors[field].message; 
            }
            res.render('department/add', {InputErrors, department});
        } 
    }

})
 //delete
 router.get('/delete/:id', async(req, res) => {
    var id = req.params.id; 
    await DepartmentModel.findByIdAndDelete(id); 
    res.redirect("/department"); 
})
//edit

//delete

router.get('/edit/:id' , async(req, res) => {
    var id = req.params.id; 
    var userList = await UserModel.find({}); 
    var department = await DepartmentModel.findById(id);
    res.render('department/edit', {userList, department});
})

//xu li xu kien 
router.post('/edit/:id', async(req, res)=>{
    try{
        var id = req.params.id;
        var department = req.body;
        await DepartmentModel.findByIdAndUpdate(id, department);
        res.redirect('/department'); 
    }
    catch(err) {
        if(err.name === 'ValidationError'){
            let InputErrors = {};
            for(let field in err.errors){
                InputErrors[field] = err.errors[field].message; 
            }
            res.render('department/edit', {InputErrors, department});
        } 
    }  
})

module.exports = router; 