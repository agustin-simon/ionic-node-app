const nodemailer = require('nodemailer');

const createTransport = () => {
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "aacc1642295e34",
          pass: "022dc06a09748e"
        }
    });
    return transport;
}

const sendEmail = async ({ toUser, hash }) => {
    const transporter = createTransport();
    const message = {
        from: `"App Football" app@example.com`,
        to: toUser.email,
        subject: "Your App- Activate account",
        html: `<h3>Hello ${toUser.username}</h3>
            <p>To activate your account please follow this link: 
            <a target='_' href='http://localhost:4000/api/users/activate/${hash}'>Active Link</a></p>
        `
    };
    await transporter.sendMail(message, (err, info) => {
        if(err) {
            res.status(500).send(error.message);
        } else {
            console.log('Email enviado')
            res.status(200).json(req.body);
        }
    });
}

const sendEmailPassword = async ({ toUser, hash }) => {
    const transporter = createTransport();
    const message = {
        from: `"App Football" app@example.com`,
        to: toUser.email,
        subject: "Your App- Recovery Password",
        html: `<h3>Hello ${toUser.username}</h3>
            <p>To recovery your password please follow this link: 
            <a target='_' href='http://localhost:4000/api/users/reset-password/${hash}'>Reset Password Link</a></p>
        `
    };
    await transporter.sendMail(message, (err, info) => {
        if(err) {
            res.status(500).send(error.message);
        } else {
            console.log('Email enviado')
            res.status(200).json(req.body);
        }
    });
}

module.exports = { sendEmail, sendEmailPassword };