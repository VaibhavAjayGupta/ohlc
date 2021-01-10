var express = require('express');
var router = express.Router();

let index_controller = require('../controllers/indexController'); 

/* GET home page. */
router.get('/',index_controller.ohlc_data);

module.exports = router;

