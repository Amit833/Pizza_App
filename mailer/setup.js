const nodemailer = require("nodemailer");
const env = require("../config/config");

//Creat a connection with my gmail account
//because from my email address I will send theverification email to user

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.email, // generated ethereal user
    pass: env.email_pass, // generated ethereal password
  },
});

// now i send the email from here .
//(user) came from controller. actually we call this(sendVerificationEmail) function
//inside the userController and send (user) as an argument
exports.sendVerificationEmail = async (user) => {
  const mailOptions = {
    from: env.email,
    to: user.email,
    subject: "ACCOUNT VERIFICATION",
    text: `HEy ${user.firstname}`,
  };

  try {
    //shoot the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

//note:from which google account(email) i am sending email I should turn no the less secure app
//If I search in google Less-secure-apps I will find it

// Alternative option of nodemailer is gmail-send
// it is a npm package. to install: npm i gmail-send
