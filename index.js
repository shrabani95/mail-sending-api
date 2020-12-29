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

 var mailContent = '<!DOCTYPE HTML><head><meta http-equiv="content-type" content="text/html"></head><body><div id="outer" style="width: 80%;margin: 0 auto;margin-top: 10px;"><div id="inner" style="width: 78%;margin: 0 auto;background-color: #fff;font-family: Open Sans,Arial,sans-serif;font-size: 13px;font-weight: normal;line-height: 1.4em;color: #444;margin-top: 10px;"><p>Name : '+
  data.name+'</p><p>Email: ' + data.email+'</p><p>Phone: ' + data.phone+'</p><p>Subject: ' + data.subject +' </p><p>Message : ' + data.message+'</p></div></div></body>';
      const mailOptions = { 
        from: 'shrabanis8@gmail.com',
        to: data.to, 
       subject: 'Contact Form',
        html : mailContent,

      };   
      const result =  await transporter.sendMail(mailOptions);
      res.status(201).send({status: 'OK', result: result});
     })
     app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })