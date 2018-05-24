var express = require('express');
var router = express.Router();
var adminconsole = require("../controllers/AdminConsoleController.js");
var auth = require("../controllers/AuthController.js");
var path = require('path');
var multer = require('multer');

// multer upload
var storage = multer.diskStorage({
	destination:function(req,file,callback){
		callback(null,'./public/uploads');
	},
    filename:function(req,file,callback){
    	callback(null,file.fieldname+'-' +Date.now() +  path.extname(file.originalname));
    }
});

var upload = multer({ storage:storage });

/****** Authentication ******/
// restrict index for logged in user only
router.get('/', auth.home);

// route to login page
router.get('/login', auth.login);

// route for login action
router.post('/login', auth.doLogin);

// route for logout action
router.get('/logout', auth.logout);

/****** Temples ******/
// Get all temples
router.get('/temple_list', auth.requiresLogin, function(req, res) {
  adminconsole.temple_list(req, res);
});

// Get single temple by id
router.get('/temple_show/:id', auth.requiresLogin, function(req, res) {
  adminconsole.temple_show(req, res);
});

// Create temple
router.get('/temple_create', auth.requiresLogin, function(req, res) {
  adminconsole.temple_create(req, res);
});

// Save temple
router.post('/temple_save', upload.single('temple_photo'), auth.requiresLogin, function(req, res) {
  adminconsole.temple_save(req, res);
});

// Edit temple
router.get('/temple_edit/:id', auth.requiresLogin, function(req, res) {
  adminconsole.temple_edit(req, res);
});

// Update temple
router.post('/temple_update/:id', upload.single('temple_photo'), auth.requiresLogin, function(req, res) {
  adminconsole.temple_update(req, res);
});

// Delete temple
router.post('/temple_delete/:id', auth.requiresLogin, function(req, res, next) {
  adminconsole.temple_delete(req, res);
});

/****** Horoscopes ******/
// Get all horoscopes
router.get('/horoscope_list', auth.requiresLogin, function(req, res) {
  adminconsole.horoscope_list(req, res);
});

// Get single horoscope by id
router.get('/horoscope_show/:id', auth.requiresLogin, function(req, res) {
  adminconsole.horoscope_show(req, res);
});

// Create horoscope
router.get('/horoscope_create', auth.requiresLogin, function(req, res) {
  adminconsole.horoscope_create(req, res);
});

// Save horoscope
router.post('/horoscope_save', upload.single('horoscope_photo'), auth.requiresLogin, function(req, res) {
  adminconsole.horoscope_save(req, res);
});

// Edit horoscope
router.get('/horoscope_edit/:id', auth.requiresLogin, function(req, res) {
  adminconsole.horoscope_edit(req, res);
});

// Update horoscope
router.post('/horoscope_update/:id', upload.single('horoscope_photo'), auth.requiresLogin, function(req, res) {
  adminconsole.horoscope_update(req, res);
});

// Delete horoscope
router.post('/horoscope_delete/:id', auth.requiresLogin, function(req, res, next) {
  adminconsole.horoscope_delete(req, res);
});

module.exports = router;
