var mongoose = require("mongoose");
var Temple = require("../models/Temple");
var Horoscope = require("../models/Horoscope");
var Users = require("../models/Users");

var horoscopeController = {};

// Show horoscope by id
horoscopeController.view = function (req, res) {
    Horoscope.findOne({ _id: req.params.id }).populate('temple').exec(function (err, Horoscope) {
      if (err) {
        res.redirect("/");
      }
      else {
        res.render("../views/view", { Horoscope: Horoscope });
      }
    });
};

// Show horoscope by id
horoscopeController.view2 = function (req, res) {
  Horoscope.findOne({ _id: req.params.id }).populate('temple').exec(function (err, Horoscope) {
    if (err) {
      res.redirect("/");
    }
    else {
      res.render("../views/view2", { Horoscope: Horoscope });
    }
  });
};

// Show horoscope by id
horoscopeController.view3 = function (req, res) {
  Horoscope.findOne({ _id: req.params.id }).populate('temple').exec(function (err, Horoscope) {
    if (err) {
      res.redirect("/");
    }
    else {
      res.render("../views/view3", { Horoscope: Horoscope });
    }
  });
};

module.exports = horoscopeController;