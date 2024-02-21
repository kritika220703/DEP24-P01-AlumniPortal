const express = require('express');
const router = express.Router();

const {sendOTPmail, verifyOTPmail} = require('../controllers/emailController.js');

router.post('/sendotp', sendOTPmail);
router.post('/verifyotp', verifyOTPmail);

module.exports = {
    routes: router
}