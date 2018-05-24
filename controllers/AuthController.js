var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/Users");

var AuthController = {};

// Restrict access to root page
AuthController.home = function (req, res) {
    res.render('../views/adminconsole/login');
};

// Go to login page
AuthController.login = function (req, res) {
    res.render('../views/adminconsole/login');
};

// Post login
AuthController.doLogin = function (req, res) {
    // passport.authenticate('local', { failureRedirect: '/adminconsole/login?login=failed' })(req, res, function () {
    //     res.redirect("/adminconsole/temple_list/");
    // });
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            res.render("../views/adminconsole/login", { msgError: "มีความผิดพลาดไม่สามารถติดต่อฐานข้อมูลได้" });
        }
        // Redirect if it fails
        if (!user) {
            res.render("../views/adminconsole/login", { msgError: "ไม่พบชื่อผู้ใช้ในระบบหรือรหัสผ่านไม่ถูกต้อง" });
        }
        req.logIn(user, function (err) {
            if (err) {
                res.render("../views/adminconsole/login", { msgError: "มีความผิดพลาดไม่สามารถติดต่อฐานข้อมูลได้" });
            }
            // Redirect if it succeeds
            return res.redirect("/adminconsole/temple_list/");
        });
    })(req, res);
};

// logout
AuthController.logout = function (req, res) {
    req.logout();
    res.redirect('/adminconsole/login/');
};

AuthController.requiresLogin = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/adminconsole/login/');
}

module.exports = AuthController;