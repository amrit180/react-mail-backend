const express = require('express');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors')
const app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cors());

app.post('/api/form', (req, res) => {
    let data = req.body;
    let smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        port: 465,
        auth: {
            user: 'testingalphabili@gmail.com',
            pass: 'Alpha@123#'
        }
    });

    let mailoption = {
        from: data.email,
        to: 'testingalphabili@gmail.com',
        subject: `Message from ${data.name}`,
        html: `
    <h3>Informations</h3>
    <ul>
    <li>Name:${data.name}>/li>
    <li>Email:${data.email}</li>
    </ul>
    <h3>Message</h3>
<p>${data.message}</p>
    `
    };

    smtpTransport.sendMail(mailoption, (error, response) => {
        if (error) {
            res.send(error)
        }
        else {
            res.send('Success')
        }
        smtpTransport.close();
    })

})


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})


