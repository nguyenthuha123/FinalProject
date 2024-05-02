var express = require('express');
var router = express.Router();
const UserModel = require('../models/UserModel');
// const { layouts } = require('chart.js');

// router.get('/', async (req, res) => {
//     try {
//         // const userId = req.session.userId; // Lấy ID của người dùng từ session
//         const email = req.session.email; 
//         // const user = await UserModel.findOne({ email: email });
//         res.render('profile/index', { email, 
            
//             layout: 'user_layout' });
//     } catch (error) {
//         console.log(error);
//         res.send(error);
//     }
// });


router.get('/', async (req, res) => {
    try {
        const email = req.session.email;
        const user = await UserModel.findOne({ email: email });
        if ( user && req.session.role == 'admin') {
            res.render('profile', { email, layout: 'admin_layout' });
        } else if (user && req.session.role == 'employee') {
            res.render('profile', { email, layout: 'user_layout' });
        } else {
            res.render('error', { message: 'User not found or unauthorized' });
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

// Route POST để cập nhật thông tin hồ sơ người dùng
router.post('/', async (req, res) => {
    try {
        const email = req.session.email; 
        const { department, position, birthdate, gender,  address } = req.body;
        const user = await UserModel.findOneAndUpdate(
            { email: email },
            { department, position, birthdate, gender, address },
            { new: true } 
        );

        // console.log("user" + user); 
        if (user) {
            req.session.department = user.department;
            req.session.position = user.position;
            req.session.birthdate = user.birthdate;
            req.session.gender = user.gender;
            req.session.address = user.address;

            // console.log(req.session);
            res.redirect('/profile');
        }else{
            res.render('error', { message: 'User not found or update failed' });
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = router;