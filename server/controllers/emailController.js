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
        throw error;
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
        console.log('Invalid OTP');
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

const sendSignUpAsAdminEmail = async (req, res) => {
    try {
        console.log("in send admin mail api")
        const Email = req.body.email;
        const messageSubject = `New  User trying to Sign Up as Admin`;
        const messageBody= `Details:\n\nEmail : ${Email}\n\n`;

        await sendEmail("2021csb1184@iitrpr.ac.in", messageSubject, messageBody);

        console.log("sign up admin mail sent");
        
        res.status(200).send("signup admin mail Sent");

        // res.status(200).status(200);
    } catch(error) {
        res.status(400).send(error.message);
    }
};

const sendContactUsmail = async (req, res) => {
    try {
        console.log("in send contact us api")
        const Email = req.body.email;
        const Name = req.body.name;
        const Phone = req.body.phone;
        const messageSubject = `New  Contact Us Message from Name : ${Name}, Email : ${Email}, Phone No.: ${Phone}`;
        const messageBody= req.body.message;

        await sendEmail("2021csb1184@iitrpr.ac.in", messageSubject, messageBody);

        console.log("contact us mail sent");
        
        res.status(200).send("Contact Us mail Sent");

        // res.status(200).status(200);
    } catch(error) {
        res.status(400).send(error.message);
    }
};

const sendGivingBackInKindmail = async (req, res) => {
    try {
        console.log("in send giving back in kind api")
        const Email = req.body.email;
        const Name = req.body.name;
        const Phone = req.body.phone;
        const department = req.body.department
        const entryNo = req.body.entryNo
        const passingYear = req.body.passingYear
        const hostel = req.body.hostel
        const degree = req.body.degree
        const country = req.body.country
        const linkedIn = req.body.linkedIn
        const itemName = req.body.itemName
        const duration = req.body.duration
        const messageSubject = `New  Giving Back In Kind Message from Name : ${Name}, Email : ${Email}, Phone No.: ${Phone}`;
        const messageBody= `Name : ${Name}\n 
                            Email : ${Email}\n
                            Phone No.: ${Phone}\n
                            Degree : ${degree}\n
                            Department : ${department}\n
                            Entry No.: ${entryNo}\n
                            Year of Passing: ${passingYear}\n
                            Hostel : ${hostel}\n
                            Country of Residence : ${country}\n
                            LinkedIn Profile Link : ${linkedIn}\n\n
                            
                            Details about the Item to be given back:\n
                            Item's name : ${itemName}\n
                            If a suitable 
                            'Giving Back in Kind' opportunity comes up, time required to donate : ${duration}
                            `;

        await sendEmail("2021csb1184@iitrpr.ac.in", messageSubject, messageBody);

        console.log("giving back in kind mail sent");
        
        res.status(200).send("giving back in kind mail Sent");

        // res.status(200).status(200);
    } catch(error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    sendOTPmail,
    verifyOTPmail,
    sendContactUsmail,
    sendGivingBackInKindmail,
    sendSignUpAsAdminEmail
};
