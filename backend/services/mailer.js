import nodemailer from 'nodemailer';

export const createTransporter = () =>
  nodemailer.createTransport({
    service: 'Gmail', // swap to your SMTP if needed
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });
