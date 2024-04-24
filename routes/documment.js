var express = require('express');
const FormleaveModel = require('../models/FormleaveModel');
const CategoryBreakModel = require('../models/CategorybreakModel'); 
const UserModel = require('../models/UserModel'); 
var router = express.Router();

//get all user
router.get('/',  async(req, res) => {
    try {
        const formleaveList = await  FormleaveModel.find({}).populate('user').populate('categorybreak');
        res.render('documment/index', {formleaveList, layout: 'user_layout' });
    } catch (error) {
        res.send(error);
    }
})

//create document -> form htm css
//get form add
router.get('/add', async (req, res) => {
    try {
        const typeleaveList = await CategoryBreakModel.find({});
        var leaderList = await UserModel.findOne({role: 'leader'});
        res.render('documment/add', {  typeleaveList, leaderList, layout: 'user_layout' });
    } catch (error) {
        res.send(error);
    }
});

// xu li su kien add
router.post('/add' , async(req, res) => {
    try{
        var  documment= req.body; 
        
        await FormleaveModel.create(documment); 
        res.redirect("/documment"); 
    }catch(err){
        if(err.name === 'ValidationError'){
            let InputErrors = {};
            for(let field in err.errors){
                InputErrors[field] = err.errors[field].message; 
            }
            res.render('documment/add', {InputErrors, documment});
        } 
    } 
})
//trong form chưa: typeleave, leader, department. 
router.get('/edit/:id' , async(req, res) => {
    var id = req.params.id; 
    var typeleaveList = await CategoryBreakModel.find({}); 
    var leaderList = await UserModel.findOne({role: 'leader'});
    // var departmentList = await DepartmentModel.find({}); 
    var documment = await FormModel.findByIdAndUpdate(id); 
    res.render('account/edit', {typeleaveList,leaderList,documment,layout: 'user_layout'});
})

//xu li xu kien 
router.post('/edit/:id', async(req, res)=>{
    try{
        var id = req.params.id;
        var documment = req.body
        await FormModel.findByIdAndUpdate(id, documment);
        res.redirect('/documment'); 
    }
    catch(error) {
                if(err.name === 'ValidationError'){
                    let InputErrors = {};
                    for(let field in err.errors){
                        InputErrors[field] = err.errors[field].message; 
                    }
                    res.render('documment/edit', {InputErrors, documment});
                } 
                res.send(error); 
    }  
})

router.get('/delete/:id', async(req, res) => {
    var id = req.params.id; 
    await FormModel.findByIdAndDelete(id); 
    res.redirect('/documment'); 
})
module.exports = router; 