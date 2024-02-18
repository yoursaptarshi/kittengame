const express = require('express')
const {getOtp, register, login, deleteProfile, getProfile, logout, generateCards, drawCards, getCardDetails,scoreboard}  = require('../controllers/userController');
const {isAuthenticated} = require("../middlewares/auth");

const Router = express.Router();

Router.route("/getotp").post(getOtp);
Router.route("/register").post(register)
Router.route("/login").post(login)

Router.route("/delete/profile").delete(isAuthenticated,deleteProfile)
Router.route("/me").get(isAuthenticated,getProfile);
Router.route("/logout").get(isAuthenticated,logout);
Router.route("/generate").get(isAuthenticated,generateCards)
Router.route("/draw").get(isAuthenticated,drawCards);
Router.route("/getcarddetails").get(isAuthenticated,getCardDetails)
Router.route("/scoreboard").get(isAuthenticated,scoreboard)
module.exports =Router;

