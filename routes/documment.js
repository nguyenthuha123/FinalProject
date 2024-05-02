var express = require('express');
const FormleaveModel = require('../models/FormleaveModel');
const CategoryBreakModel = require('../models/CategorybreakModel');
const UserModel = require('../models/UserModel');
var router = express.Router();
const axios = require('axios');

// //get all formleave
router.get('/', async (req, res) => {
    try {
        const formleavelist = await FormleaveModel.find({}).populate('categorybreak');
        res.render('documment/index', {
            formleavelist,
            layout: 'user_layout'
        });
    } catch (error) {
        res.send(error);
    }
})

router.get('/add', async (req, res) => {
    try {
        const typeleaveList = await CategoryBreakModel.find({});
        res.render('documment/add', {
            typeleaveList,
            layout: 'user_layout'
        });
    } catch (error) {
        res.send(error);
    }
});

router.post('/add', async(req, res) => {
    try {
        var documment = req.body;
        documment.status = "appending";
        await FormleaveModel.create(documment); 
        // console.log(documment);
        res.redirect("/documment");
    } catch (err) {
        if (err.name === 'ValidationError') {
            let InputErrors = {};
            for (let field in err.errors) {
                InputErrors[field] = err.errors[field].message;
            }
            console.log(err); 
            res.render('documment/add', {InputErrors,  documment});
        }
    }
});


// trong form chưa: typeleave, leader, department. 
router.get('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var typeleaveList = await CategoryBreakModel.find({});
    var documment = await FormleaveModel.findByIdAndUpdate(id);
    res.render('documment/edit', {
        typeleaveList,
        documment,
        layout: 'user_layout'
    });
})

// router.post('/add', async (req, res) => {
//     var documment = req.body;
//     console.log(documment);
//     const {
//         name,
//         email,
//         department, 
//         position, 
//         categorybreak, 
//         startdate,
//         enddate, 
//         description
//     } = req.body;
//     await FormleaveModel.create({
//         employeeName: name,
//         employeeEmail: email,
//         department: department,
//         position: position,
//         categorybreak: categorybreak,
//         startdate: startdate,
//         enddate: enddate,
//         status: "appending",
//         description: description
//     });

//     res.redirect("/documment");

// });

//xu li xu kien 
router.post('/edit/:id', async (req, res) => {
    try {
        var id = req.params.id;
        var documment = req.body
        await FormleaveModel.findByIdAndUpdate(id, documment);
        res.redirect('/documment');
    } catch (err) {
        if (err.name === 'ValidationError') {
            let InputErrors = {};
            for (let field in err.errors) {
                InputErrors[field] = err.errors[field].message;
            }
            res.render('documment/edit', {
                InputErrors,
                documment
            });
        }
        res.send(error);
    }
})

router.get('/delete/:id', async (req, res) => {
    var id = req.params.id;
    await FormleaveModel.findByIdAndDelete(id);
    res.redirect('/documment');
})



module.exports = router;