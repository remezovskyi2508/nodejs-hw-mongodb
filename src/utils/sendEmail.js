import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM } =
  process.env;

const nodemailerConfig = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   from: SMTP_FROM, //'antonremezovskyi@gmail.com'
//   to: 'bonkadatest@ukr.net',
//   subject: 'Hello from Anton Remezovskyi',
//   html: '<h1>Anton Remezovskyi second CHANCE!</h1>',
// };

export const sendEmail = (data) => {
  const email = { ...data, from: SMTP_FROM };
  return transport.sendMail(email);
};
