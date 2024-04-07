const express = require('express');
const router = express.Router();

const {
    sendOTPmail, 
    verifyOTPmail,
    sendContactUsmail,
    sendGivingBackInKindmail,
    sendSignUpAsAdminEmail,
    sendReunionAlertmail,
    sendEventsTalkmail,
    sendEventsWorkshopsmail,
    sendEventsStartupPresentationsmail
} = require('../controllers/emailController.js');

router.post('/sendotp', sendOTPmail);
router.post('/verifyotp', verifyOTPmail);
router.post('/contactUs', sendContactUsmail);
router.post('/signUpAsAdmin', sendSignUpAsAdminEmail);
router.post('/givingBackInKind', sendGivingBackInKindmail);
router.post('/invite', sendReunionAlertmail);
router.post('/events/talks', sendEventsTalkmail);
router.post('/events/workshops', sendEventsWorkshopsmail);
router.post('/events/startupPresentations', sendEventsStartupPresentationsmail);

module.exports = {
    routes: router
}