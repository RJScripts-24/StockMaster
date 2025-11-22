import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { genOtp, makeSalt, hashOtp, nowPlusMinutes } from '../utils/otp.js';
import { sendOtpEmail } from '../lib/mailer.js';

const router = express.Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;
const OTP_EXP_MINUTES = parseInt(process.env.OTP_EXP_MINUTES || '10', 10);
const SALT_ROUNDS = 10;

// Helper: sign JWT
function signJwt(payload, expiresIn = '7d') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

// POST /auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required.' });
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ error: 'Email already registered.' });
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({ data: { email, password: hash, name } });
    const token = signJwt({ id: user.id, email: user.email });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Registration failed.' });
  }
});

// POST /auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required.' });
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Invalid credentials.' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Invalid credentials.' });
    const token = signJwt({ id: user.id, email: user.email });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed.' });
  }
});

// POST /auth/send-reset-otp
router.post('/send-reset-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required.' });
  try {
    // Throttle: block if last OTP < 60s ago
    const lastOtp = await prisma.emailOtp.findFirst({
      where: { email },
      orderBy: { createdAt: 'desc' },
    });
    if (lastOtp && new Date() - lastOtp.createdAt < 60 * 1000) {
      return res.status(429).json({ error: 'Please wait before requesting another OTP.' });
    }
    const otp = genOtp(6);
    const salt = makeSalt();
    const otpHash = hashOtp(otp, salt);
    const expiresAt = nowPlusMinutes(OTP_EXP_MINUTES);
    await prisma.emailOtp.create({
      data: { email, otpHash, salt, expiresAt },
    });
    // Send email, but don't fail if mail fails
    sendOtpEmail(email, otp).catch(e => console.error('OTP email error:', e));
    res.json({ ok: true, message: 'If the email exists, an OTP was sent.' });
  } catch (err) {
    console.error('Send OTP error:', err);
    res.json({ ok: true, message: 'If the email exists, an OTP was sent.' });
  }
});

// POST /auth/verify-reset-otp
router.post('/verify-reset-otp', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: 'Email and OTP required.' });
  try {
    const record = await prisma.emailOtp.findFirst({
      where: { email, used: false },
      orderBy: { createdAt: 'desc' },
    });
    if (!record || new Date() > record.expiresAt) {
      return res.status(400).json({ error: 'Invalid or expired OTP.' });
    }
    const hash = hashOtp(otp, record.salt);
    if (hash !== record.otpHash) {
      await prisma.emailOtp.update({ where: { id: record.id }, data: { attempts: { increment: 1 } } });
      return res.status(400).json({ error: 'Invalid or expired OTP.' });
    }
    await prisma.emailOtp.update({ where: { id: record.id }, data: { used: true } });
    // Issue short-lived resetToken (JWT)
    const resetToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '15m' });
    res.json({ ok: true, resetToken });
  } catch (err) {
    console.error('Verify OTP error:', err);
    res.status(500).json({ error: 'OTP verification failed.' });
  }
});

// POST /auth/reset-password
router.post('/reset-password', async (req, res) => {
  const { resetToken, newPassword } = req.body;
  if (!resetToken || !newPassword) return res.status(400).json({ error: 'resetToken and newPassword required.' });
  try {
    const payload = jwt.verify(resetToken, JWT_SECRET);
    const { email } = payload;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Invalid token.' });
    const hash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await prisma.user.update({ where: { email }, data: { password: hash } });
    res.json({ ok: true, message: 'Password reset successful.' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(400).json({ error: 'Invalid or expired token.' });
  }
});

export default router;
