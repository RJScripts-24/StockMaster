import nodemailer from 'nodemailer';

const {
  SMTP_HOST = 'smtp.gmail.com',
  SMTP_PORT = 587,
  SMTP_USER,
  SMTP_PASS,
  EMAIL_FROM = 'StockMaster <noreply@example.com>',
  OTP_EXP_MINUTES = 10,
} = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: false, // STARTTLS
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Dev safe
  },
});

/**
 * Send OTP email (HTML + text)
 * @param {string} to - recipient email
 * @param {string} otp - OTP code
 */
export async function sendOtpEmail(to, otp) {
  const subject = 'Your StockMaster Password Reset OTP';
  const text = `Your OTP is: ${otp}\nThis code will expire in ${OTP_EXP_MINUTES} minutes.`;
  const html = `<p>Your OTP is: <b>${otp}</b></p><p>This code will expire in ${OTP_EXP_MINUTES} minutes.</p>`;
  await transporter.sendMail({
    from: EMAIL_FROM,
    to,
    subject,
    text,
    html,
  });
}
