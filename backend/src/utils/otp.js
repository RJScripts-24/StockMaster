import crypto from 'crypto';

// Generate a numeric OTP of given length (default 6)
export function genOtp(length = 6) {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
}

// Generate a random salt (hex string)
export function makeSalt() {
  return crypto.randomBytes(16).toString('hex');
}

// Hash OTP using HMAC-SHA256 with salt
export function hashOtp(otp, salt) {
  return crypto.createHmac('sha256', salt).update(otp).digest('hex');
}

// Return a Date object for now + N minutes
export function nowPlusMinutes(minutes) {
  return new Date(Date.now() + minutes * 60 * 1000);
}
