import { defineEventHandler, readBody } from 'h3';
import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
  // Read the request body
  const body = await readBody(event);

  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    //aservice: "Gmail",
    host: "smtp.gmail.com", // Replace with your SMTP server
    port: 465,
    //host: 'smtp.ethereal.email',
    //port: 587,
    auth: {
     user: 'zhixuanchu3131@gmail.com', // Replace with your email
     pass: 'nprpaebmumaudoow', // Replace with your email password
     //user:"merle.adams@ethereal.email",
     //pass:"VjjJqf74pDQmMD5tWn"
    },
  });

  // Set up email data
  const mailOptions = {
    from: 'VConnect', // Sender address
    replyTo: body.replyTo, // Reply to address
    to: body.to, // List of receivers
    subject: body.subject, // Subject line
    text: body.message, // Plain text body
    html: body.html, // HTML body
  };

  try {
    // Send mail
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
});
