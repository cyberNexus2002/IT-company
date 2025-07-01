const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cybernexus2002@gmail.com', // Replace with your email
        pass: 'Sithum@0213' // Replace with your app-specific password
    }
});

// POST route to handle form submission
app.post('/send-message', async (req, res) => {
    const { firstName, lastName, email, phone, subject, message } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !subject || !message) {
        return res.status(400).json({ error: 'All required fields must be filled.' });
    }

    // Sanitize inputs (basic example, consider using a library like sanitize-html)
    const sanitizeInput = (input) => input.replace(/<[^>]*>?/gm, '');

    const mailOptions = {
        from: sanitizeInput(email),
        to: 'your-email@gmail.com', // Replace with your email
        subject: `New Contact Form Submission: ${sanitizeInput(subject)}`,
        text: `
            Name: ${sanitizeInput(firstName)} ${sanitizeInput(lastName)}
            Email: ${sanitizeInput(email)}
            Phone: ${sanitizeInput(phone) || 'Not provided'}
            Subject: ${sanitizeInput(subject)}
            Message: ${sanitizeInput(message)}
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});