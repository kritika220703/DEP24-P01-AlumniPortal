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

// Define a dictionary mapping organizations to email addresses
const organizationEmails = {
    "alumni cell": "2021csb1184@iitrpr.ac.in",
    "e-cell": "2021csb1220@iitrpr.ac.in",
    "cdpc": "2021csb1165@iitrpr.ac.in",
    "tbif": "2021csb113@iitrpr.ac.in"
};

const sendContactUsmail = async (req, res) => {
    try {
        console.log("in send contact us api")
        const Email = req.body.email;
        const Name = req.body.name;
        const Phone = req.body.phone;
        const messageSubject = `New  Contact Us Message from Name : ${Name}, Email : ${Email}, Phone No.: ${Phone}`;
        const messageBody= req.body.message;
        const organization = req.body.organization

        const recipientEmail = organizationEmails[organization.toLowerCase()];

        if (!recipientEmail) {
            throw new Error("Invalid organization provided.");
        }
        await sendEmail(recipientEmail, messageSubject, messageBody);

        console.log("contact us mail sent");
        
        res.status(200).send("Contact Us mail Sent");

        // res.status(200).status(200);
    } catch(error) {
        console.error("Error sending contact us mail:", error);
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

const sendReunionAlertmail = async (req, res) => {
    try {
        console.log("in send contact us api");
        const Emails = req.body.emails;
        const Names = req.body.names;
        const Batch = req.body.Batch;
        const messageSubject = `Invitation For a Reunion Of batch ${Batch}\n`;

        for (let i = 0; i < Emails.length; i++) {
            const messageBody = `Dear ${Names[i]}\n
                            You Are Invited to the Reunion of batch ${Batch}.\n
                            Thank You.\n
                            Regards,\n
                            Alumni Cell, IIT Ropar \n`;

            await sendEmail(Emails[i], messageSubject, messageBody);

            console.log(`Invite mail sent to ${Emails[i]}`);
        }
        
        res.status(200).send("Invite mails Sent");

    } catch(error) {
        res.status(400).send(error.message);
    }
};

const sendEventsTalkmail = async (req, res) => {
    try {
        console.log("in send events talk api")
        const Email = req.body.email;
        const Name = req.body.name;
        const Phone = req.body.phone;
        const topic = req.body.topic
        const type = req.body.type
        const date = req.body.date
        const content = req.body.content
        const additionalInfo = req.body.additionalInfo
        const messageSubject = `New  Talks Message`;
        const messageBody= `From Name : ${Name} \nEmail : ${Email} \nPhone No.: ${Phone} \n\nInformation about Talk:\nTopic:  ${topic}\nType of Talk: ${type}\nTentative Date of Talk: ${date}\nContent of Talk: ${content}\n\nAdditional Info: ${additionalInfo}`;

        const recipientEmail = "2021csb1184@iitrpr.ac.in";

        await sendEmail(recipientEmail, messageSubject, messageBody);

        console.log("talk mail sent");
        
        res.status(200).send("talk mail Sent");

    } catch(error) {
        console.error("Error sending talk mail:", error);
        res.status(400).send(error.message);
    }
};

const sendEventsWorkshopsmail = async (req, res) => {
    try {
        console.log("in send events workshop api")
        const Email = req.body.email;
        const Name = req.body.name;
        const Phone = req.body.phone;
        const topic = req.body.topic
        const type = req.body.type
        const date = req.body.date
        const duration = req.body.duration
        const content = req.body.content
        const additionalInfo = req.body.additionalInfo
        const messageSubject = `New  Workshop Message\n\n`;
        const messageBody= `From Name : ${Name} \nEmail : ${Email} \nPhone No.: ${Phone} \n\nInformation about Workshop:\nTopic:  ${topic}\nType of Workshop: ${type}\nTentative Date of Workshop: ${date}\nDuration: ${duration}\nContent of Workshop: ${content}\n\nAdditional Info: ${additionalInfo}`;

        const recipientEmail = "2021csb1184@iitrpr.ac.in";

        await sendEmail(recipientEmail, messageSubject, messageBody);

        console.log("workshop mail sent");
        
        res.status(200).send("workshop mail Sent");

    } catch(error) {
        console.error("Error sending workshop mail:", error);
        res.status(400).send(error.message);
    }
};

const sendEventsStartupPresentationsmail = async (req, res) => {
    try {
        console.log("in send events workshop api")
        const Email = req.body.email;
        const Name = req.body.name;
        const Phone = req.body.phone;
        const startup = req.body.startup
        const problem = req.body.problem
        const date = req.body.date
        const presenter = req.body.presenter
        const content = req.body.content
        const idea = req.body.idea
        const additionalInfo = req.body.additionalInfo
        const messageSubject = `New  Startup Presentation Message\n\n`;
        const messageBody= `From Name : ${Name} \nEmail : ${Email} \nPhone No.: ${Phone} \n\nInformation about Startup Presentation:\nStartup:  ${startup}\nIdea: ${idea}\nProblem being solved: ${problem}\nContent of Presentation: ${content}\nPresenter: ${presenter}\nDate: ${date}\n\nAdditional Info: ${additionalInfo}`;

        const recipientEmail = "2021csb1184@iitrpr.ac.in";

        await sendEmail(recipientEmail, messageSubject, messageBody);

        console.log("Startup Presentation mail sent");
        
        res.status(200).send("Startup Presentation mail Sent");

    } catch(error) {
        console.error("Error sending Startup Presentation mail:", error);
        res.status(400).send(error.message);
    }
};


module.exports = {
    sendOTPmail,
    verifyOTPmail,
    sendContactUsmail,
    sendGivingBackInKindmail,
    sendSignUpAsAdminEmail,
    sendReunionAlertmail,
    sendEventsTalkmail,
    sendEventsWorkshopsmail,
    sendEventsStartupPresentationsmail
};

