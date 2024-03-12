const express = require('express');
const router = express.Router();

const {
    sendOTPmail, 
    verifyOTPmail,
    sendContactUsmail,
    sendGivingBackInKindmail,
    sendSignUpAsAdminEmail
} = require('../controllers/emailController.js');

router.post('/sendotp', sendOTPmail);
router.post('/verifyotp', verifyOTPmail);
router.post('/contactUs', sendContactUsmail);
router.post('/signUpAsAdmin', sendSignUpAsAdminEmail);
router.post('/givingBackInKind', sendGivingBackInKindmail);

module.exports = {
    routes: router
}