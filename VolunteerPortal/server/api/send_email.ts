import { defineEventHandler, readBody } from 'h3';
import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
  
  const body = await readBody(event);

  const transporter = nodemailer.createTransport({
    
    host: "smtp.gmail.com", 
    port: 465,
    //host: 'smtp.ethereal.email',
    //port: 587,
    auth: {
     user: 'zhixuanchu3131@gmail.com', 
     pass: 'nprpaebmumaudoow', 
    
    },
  });


  const mailOptions = {
    from: 'VConnect',
    replyTo: body.replyTo, 
    to: body.to, 
    subject: body.subject, 
    text: body.message, 
  
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
