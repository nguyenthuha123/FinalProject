var express = require('express');
const CategorybreakModel = require('../models/CategorybreakModel');
// const { layouts } = require('chart.js');
var router = express.Router();

//get interface
router.get('/', async (req, res) => {
    try {
        const typeleaveList = await CategorybreakModel.find({});
        res.render('categorybreak/index', {
            typeleaveList,
            layout: 'admin_layout'
        });
    } catch (error) {
        res.send(error);
    }
})
//get form add
router.get('/add', async (req, res) => {
    res.render('categorybreak/add');
})

// xu li su kien add
router.post('/add', async (req, res) => {
    try {
        var categorybreak = req.body;
        await CategorybreakModel.create(categorybreak);
        res.redirect("/categorybreak");
    } catch (err) {
        if (err.name === 'ValidationError') {
            let InputErrors = {};
            for (let field in err.errors) {
                InputErrors[field] = err.errors[field].message;
            }
            res.render('categorybreak/add', {
                InputErrors,
                categorybreak
            });
        }
    }
})
//delete
router.get('/delete/:id', async (req, res) => {
    var id = req.params.id;
    await CategorybreakModel.findByIdAndDelete(id);
    res.redirect("/categorybreak");
})

router.get('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var categorybreak = await CategorybreakModel.findById(id);
    res.render('categorybreak/edit', {
        categorybreak
    });
})


router.post('/edit/:id', async (req, res) => {
    try {
        var id = req.params.id;
        var categorybreak = req.body;
        await CategorybreakModel.findByIdAndUpdate(id, categorybreak);
        res.redirect('/categorybreak');
    } catch (err) {
        if (err.name === 'ValidationError') {
            let InputErrors = {};
            for (let field in err.errors) {
                InputErrors[field] = err.errors[field].message;
            }
            res.render('categorybreak/edit', {
                InputErrors,
                categorybreak
            });
        }
    }
})


// //xu li xu kien 
// router.post('/edit/:id', async(req, res)=>{
//     try{
//         var id= req.params.id;
//         var categorybreak = req.body;
//         await  CategorybreakModel.findByIdAndUpdate(id, categorybreak);
//         res.redirect('/categorybreak'); 
//     }
//     catch(error) {
//                 if(err.name === 'ValidationError'){
//                     let InputErrors = {};
//                     for(let field in err.errors){
//                         InputErrors[field] = err.errors[field].message; 
//                     }
//                     res.render('categorybreak/edit', {InputErrors, register});
//                 } 
//                 res.send(error); 
//     }  
// })


module.exports = router;