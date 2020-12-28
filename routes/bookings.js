const router = require('express').Router();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const urlEncodedParser = bodyParser.urlencoded({ extended: false })


router.route('/book-table').post(urlEncodedParser, ((req, res, next) => {
    //  SEND CONFIRMATION EMAIL

    //SET UP TRANSPORTER
    const transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS
      } 
    }); 
    
    //  CUSTOM MESSAGE
    const mailOptions = {
      from: `Andy's Pizza <${process.env.EMAIL_ADDRESS}>`,
      to: req.body.email,
      subject: 'Booking Confirmation',
      text: `Hi ${req.body.name}. Your table is booked.`
    }
    
    //  SEND EMAIL
    transporter.sendMail(mailOptions, (err, data) => {
      console.log('emailing')
      if(err){
        next(err);
      }
      else {
        res.redirect('/bookings/bookingconfirmation')
      }
    })
}));

router.route('/bookingconfirmation').get((req, res) => {
  res.render('bookingconfirmation');
})

module.exports = router;