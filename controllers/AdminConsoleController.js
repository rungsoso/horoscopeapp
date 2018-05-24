var mongoose = require("mongoose");
var Temple = require("../models/Temple");
var Horoscope = require("../models/Horoscope");
var Users = require("../models/Users");
var fs = require('fs');

// message
var msgInvalidUser = "ชื่อผู้ใช้หรือรหัสผ่านที่ระบุไม่ถูกต้อง";
var msgCompleted = "การดำเนินการเสร็จสิ้น";
var msgNotCompleted = "ไม่สามารถทำรายการได้";
var msgPermissionDenied = "ไม่มีสิทธิ์ในการเข้าถึงหน้านี้";
var msgNoData = "ไม่พบข้อมูล";
var msgDuplicate = "ข้อมูลซ้ำซ้อน";

var adminconsoleController = {};

// Home
adminconsoleController.list = function (req, res) {
  res.render("../views/adminconsole/index");
};

/****** Temples ******/
// Show list of temples
adminconsoleController.temple_list = function (req, res) {
  Temple.find({}).exec(function (err, temples) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      var _status = req.query.status;
      if (_status == "success") {
        res.render("../views/adminconsole/temple_list", { temples: temples, msgSuccess: msgCompleted });
      }
      else if (_status == "error") {
        res.render("../views/adminconsole/temple_list", { temples: temples, msgError: msgNotCompleted });
      }
      else {
        res.render("../views/adminconsole/temple_list", { temples: temples });
      }
    }
  });
};

// Show temple by id
adminconsoleController.temple_show = function (req, res) {
  Temple.findOne({ _id: req.params.id }).exec(function (err, Temple) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      var _status = req.query.status;
      if (_status == "success") {
        res.render("../views/adminconsole/temple_show", { Temple: Temple, msgSuccess: msgCompleted });
      }
      else if (_status == "error") {
        res.render("../views/adminconsole/temple_show", { Temple: Temple, msgError: msgNotCompleted });
      }
      else {
        res.render("../views/adminconsole/temple_show", { Temple: Temple });
      }
    }
  });
};

// Create new temple
adminconsoleController.temple_create = function (req, res) {
  res.render("../views/adminconsole/temple_create");
};

// Save new temple
adminconsoleController.temple_save = function (req, res) {
  var temple = new Temple(req.body);
  temple.temple_photo = req.file.path;
  temple.createid = '5a85a8c566c53a37bc763583';
  temple.updateid = '5a85a8c566c53a37bc763583';

  temple.save(function (err) {
    if (err) {
      console.log(err);
      res.render("../views/adminconsole/temple_create");
    } else {
      console.log("Successfully created an Temple.");
      res.redirect("/adminconsole/temple_show/" + temple._id + "?status=success");
    }
  });
};

// Edit an temple
adminconsoleController.temple_edit = function (req, res) {
  Temple.findOne({ _id: req.params.id }).exec(function (err, Temple) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/adminconsole/temple_edit", { Temple: Temple });
    }
  });
};

// Update an temple
adminconsoleController.temple_update = function (req, res) {
  Temple.findByIdAndUpdate(req.params.id, {
    $set: {
      name: req.body.name,
      address: req.body.address,
      position: req.body.position,
      templeName: req.body.templeName,
      templeExplain: req.body.templeExplain,
      address: req.body.address,
      tambol: req.body.tambol,
      district: req.body.district,
      province: req.body.province,
      postcode: req.body.postcode,
      phone: req.body.phone,
      contactsName: req.body.contactsName,
      contactsPhone: req.body.contactsPhone,
      contactsEmail: req.body.contactsEmail,
      status: req.body.status,
      temple_photo: req.file.path
    }
  }, { new: true }, function (err, Temple) {
    if (err) {
      console.log(err);
      res.render("../views/adminconsole/temple_edit", { Temple: req.body, msgError: msgNotCompleted });
    }
    res.redirect("/adminconsole/temple_show/" + Temple._id + "?status=success");
  });
};

// Delete an temple
adminconsoleController.temple_delete = function (req, res) {
  Temple.remove({ _id: req.params.id }, function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Temple deleted!");
      res.redirect("/adminconsole/temple_list?status=success");
    }
  });
};

/****** Horoscopes ******/
// Show list of horoscopes
adminconsoleController.horoscope_list = function (req, res) {
  //generate query object based on availability of value 
  var query = {};
  var templechecked = "";
  if ((typeof req.query.temple !== 'undefined' && req.query.temple)) {
    if (req.query.temple !== "") {
      query["temple"] = req.query.temple;
      templechecked = req.query.temple;
    }
  }

  Horoscope.find(query).populate('temple').exec(function (err, horoscopes) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      Temple.find({ status: true }).exec(function (err, temples) {
        if (err) {
          console.log("Error:", err);
        }
        else {
          var _status = req.query.status;
          var host = req.get('host');
          if (_status == "success") {
            res.render("../views/adminconsole/horoscope_list", { horoscopes: horoscopes, temples: temples, host: host, templechecked: templechecked, msgSuccess: msgCompleted });
          }
          else if (_status == "error") {
            res.render("../views/adminconsole/horoscope_list", { horoscopes: horoscopes, temples: temples, host: host, templechecked: templechecked, msgError: msgNotCompleted });
          }
          else {
            res.render("../views/adminconsole/horoscope_list", { horoscopes: horoscopes, temples: temples, host: host, templechecked: templechecked });
          }
        }
      });
    }
  });
};

// Show horoscope by id
adminconsoleController.horoscope_show = function (req, res) {
  Horoscope.findOne({ _id: req.params.id }).populate('temple').exec(function (err, Horoscope) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      var _status = req.query.status;
      var host = req.get('host');
      if (_status == "success") {
        res.render("../views/adminconsole/horoscope_show", { Horoscope: Horoscope, host: host, msgSuccess: msgCompleted });
      }
      else if (_status == "error") {
        res.render("../views/adminconsole/horoscope_show", { Horoscope: Horoscope, host: host, msgError: msgNotCompleted });
      }
      else {
        res.render("../views/adminconsole/horoscope_show", { Horoscope: Horoscope, host: host });
      }
    }
  });
};

// Create new horoscope
adminconsoleController.horoscope_create = function (req, res) {
  var templechecked = "";
  if ((typeof req.query.temple !== 'undefined' && req.query.temple)) {
    if (req.query.temple !== "") {
      templechecked = req.query.temple;
    }
  }
  Temple.find({}).exec(function (err, temples) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/adminconsole/horoscope_create", { temples: temples, templechecked: templechecked });
    }
  });
};

// Save new horoscope
adminconsoleController.horoscope_save = function (req, res) {
  var horoscope = new Horoscope(req.body);
  horoscope.horoscope_photo = req.file.path;
  horoscope.createid = '5a85a8c566c53a37bc763583';
  horoscope.updateid = '5a85a8c566c53a37bc763583';

  horoscope.save(function (err) {
    if (err) {
      console.log(err);
      res.render("../views/adminconsole/horoscope_create");
    } else {
      console.log("Successfully created an Horoscope.");
      res.redirect("/adminconsole/horoscope_show/" + horoscope._id + "?status=success");
    }
  });
};

// Edit an horoscope
adminconsoleController.horoscope_edit = function (req, res) {
  Horoscope.findOne({ _id: req.params.id }).populate('temple').exec(function (err, Horoscope) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/adminconsole/horoscope_edit", { Horoscope: Horoscope });
    }
  });
};

// Update an horoscope
adminconsoleController.horoscope_update = function (req, res) {
  Horoscope.findByIdAndUpdate(req.params.id, {
    $set: {
      horoscopeno: req.body.horoscopeno,
      horoscope_photo: req.file.path
      // horoscope_th: req.body.horoscope_th,
      // horoscope_en: req.body.horoscope_en,
      // horoscope_chn: req.body.horoscope_chn
    }
  }, { new: true }, function (err, Horoscope) {
    if (err) {
      console.log(err);
      res.render("../views/adminconsole/horoscope_edit", { Horoscope: req.body, msgError: msgNotCompleted });
    }
    // fs.unlink('C:\\demo\\dog.jpg', function (error) {
    //   if (error) {
    //     throw error;
    //   }
    // });
    res.redirect("/adminconsole/horoscope_show/" + Horoscope._id + "?status=success");
  });
};

// Delete an horoscope
adminconsoleController.horoscope_delete = function (req, res) {
  Horoscope.remove({ _id: req.params.id }, function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Horoscope deleted!");
      res.redirect("/adminconsole/horoscope_list?status=success");
    }
  });
};

module.exports = adminconsoleController;
