var express = require('express');
var router = express.Router();

router.get('/', async(req, res) => {
    res.render('history/index',  {layout: 'admin_layout'});
})

module.exports = router; 