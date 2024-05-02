var express = require('express');
var router = express.Router();
const FormleaveModel = require('../models/FormleaveModel');
const axios = require('axios');
const {
    layouts
} = require('chart.js');


//tiep nhan don leader. 
router.get('/', async (req, res) => {
    console.log(req.body.documment);
    FormleaveModel.find({}).populate('categorybreak')
    .then((formleaves, err) => {
        if (err) {
            // console.log(err);
        } else {
            console.log(formleaves);

            res.render('leaveManagement/index', {
                data: {
                    formleaves: formleaves,
                    // apiResponse: response
                },
                layout: 'admin_layout'
            });
        }
    });
})
router.get('/detail/:id', async (req, res) => {
    const id = req.params.id;
    await FormleaveModel.findById(id);
    res.render('leaveManagement/detail');
});


router.get('/approved/:id', async (req, res) => {
    const id = req.params.id;
    var form = await FormleaveModel.findByIdAndUpdate(id, 
                {status: "approved"},   
            );
    res.redirect('/leaveManagement');
});
 

// router.get('/rejected/:id', async (req, res) => {
//     const id = req.params.id;
//     const reason = req.query.reason; 
//     var form = await FormleaveModel.findByIdAndUpdate(id, 
//                 {status: "rejected", 
//                 reasonRejected: reason}
//             );
//     // res.redirect('/leaveManagement');
//     res.render('leaveManagement/rejected', {form});
// });
 


router.get('/rejected/:id', async (req, res) => {
    const id = req.params.id;
    const { reason } = req.query; // Lấy lí do từ query parameter
    try {
        // Tìm kiếm và cập nhật bản ghi với trạng thái từ chối và lí do từ chối
        const form = await FormleaveModel.findByIdAndUpdate(id, 
            { status: "rejected", reasonRejected: reason }
        );

        if (!form) {
            return res.status(404).send("Không tìm thấy bản ghi nghỉ phép để từ chối.");
        }

        // Chuyển hướng đến trang quản lý nghỉ phép sau khi cập nhật thành công
        res.redirect('/leaveManagement');
    } catch (error) {
        console.error("Lỗi khi từ chối yêu cầu nghỉ phép:", error);
        res.status(500).send("Đã xảy ra lỗi khi xử lý yêu cầu.");
    }
});

// router.get('/rejected/:id', async (req, res) => {
//     var id = req.params.id;
//     var  form = await FormleaveModel.findById(id);
//     res.render('leaveManagement/rejected', {form});
// })


// router.post('/rejected/:id', async (req, res) => {
//     const id = req.params.id;
//     const reason = req.body.reason;
//     await FormleaveModel.findByIdAndUpdate(id, {
//         status: "rejected", 
//         reasonRejected: reason
//     });

//     res.redirect('/leaveManagement');
// });



module.exports = router;