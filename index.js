const nodemailer = require('nodemailer');
var bodyParser = require('body-parser')
var express = require('express')
var app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use( bodyParser.json())


const port = 3000

app.post('/sendmail' , async function (req,res,next) {
    

const data = req.body; // get the json object sent by the client
//using nodemailer library to send emails  
const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'shrabanis8@gmail.com',
          pass: 'oagurmmdihqobqsq' // naturally, replace both with your real credentials or an application-specific password
        }
      });   
      const mailOptions = { 
        from: 'shrabanis8@gmail.com',
        to: data.to, 
       subject: data.subject,
        html : data.message,

      };   
      const result =  await transporter.sendMail(mailOptions);
      res.status(201).send({status: 'OK', result: result});
     })
     app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })