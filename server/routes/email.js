const express = require('express');
const router = express.Router();

const {
    sendOTPmail, 
    verifyOTPmail,
    sendContactUsmail
} = require('../controllers/emailController.js');

router.post('/sendotp', sendOTPmail);
router.post('/verifyotp', verifyOTPmail);
router.post('/contactUs', sendContactUsmail);

module.exports = {
    routes: router
}