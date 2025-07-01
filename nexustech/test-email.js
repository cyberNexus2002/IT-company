const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cybernexus2002@gmail.com',
        pass: 'Sithum@0213'
    }
});

const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'cybernexus2002@gmail.com',
    subject: 'Test Email',
    text: 'This is a test email.'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});