'use strict';

require('dotenv').config();
const nodemailer = require('nodemailer');

const sendEmail = async(recipient, subject, message) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'outlook',
            port: 587,
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_ID,
            to: recipient,
            subject: subject,
            text: message
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
        console.log("otp maill senttt");
    } catch (error) {
        console.log("Error sending OTP mail:", error.message);
        console.log("error while sending otp mail");
    }
};

const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
}

// function sha256(data) {
//     const hash = crypto.createHash('sha256');
//     hash.update(data);
//     return hash.digest('hex');
// }

const OTPpairs = {};

const sendOTP = async(recipient) => {
    try {
        const otp = generateOTP();
        const subject = 'OTP Signup';
        const message = `Your OTP is ${otp}`;

        await sendEmail(recipient, subject, message);
        console.log("otp senntttt  kkk");

        OTPpairs[recipient] = otp;
        // OTPpairs[recipient] = sha256(otp);

        setInterval(()=>{
            delete OTPpairs[recipient];
        }, 600000)

    } catch (error) {
        console.log("error sending otp: ",error);
    }
};

const verifyOTP = (recipient, userOTP) => { 
    console.log("in verify otp 1111  func");
    const storedOTP = OTPpairs[recipient];

    if(!storedOTP){
        res.status(400).send('OTP not found or expired.');
        // throw new Error('OTP not found or expired.');
    }

    if(storedOTP === userOTP){
        delete OTPpairs[recipient];
        console.log("otp matching");
        return true;
    }else{
        return false;
    }
};

const sendOTPmail = async (req, res) => {
    try {
        console.log("in sendotp api")
        const recipient = req.body.email;
        await sendOTP(recipient);

        console.log("k otp sent");
        
        res.status(200).send("OTP Sent");

        // res.status(200).status(200);
    } catch(error) {
        res.status(400).send(error.message);
    }
};

const verifyOTPmail = async(req, res) => {
    try {
        const recipient = req.body.email;
        const userOTP = req.body.otp;

        const result = verifyOTP(recipient, userOTP);
        if(result) {
            console.log("valid otp");
            res.status(200).send('OTP Verified');
        } else {
            console.log("invalid otp");
            res.status(400).send('Invalid OTP');
        }
        console.log("in verifyotp func");

    } catch(error) {
        res.status(400).send(error.message);
    }
};


module.exports = {
    sendOTPmail,
    verifyOTPmail
};
