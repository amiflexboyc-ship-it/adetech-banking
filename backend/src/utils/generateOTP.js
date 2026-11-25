import crypto from 'crypto';

export const generateOTP = (length = 6) => {
  if (length <= 0) {
    throw new Error('OTP length must be greater than zero.');
  }

  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  const otpNumber = crypto.randomInt(min, max + 1);
  return otpNumber.toString();
};

export const generateOTPWithExpiry = (length = 6, validityMinutes = 10) => {
  const otp = generateOTP(length);
  const createdAt = new Date();
  const expiresAt = new Date(createdAt.getTime() + validityMinutes * 60 * 1000);

  return {
    otp,
    expiresAt,
    createdAt
  };
};

export const verifyOTP = (enteredOTP, storedOTP, expiresAt) => {
  if (!enteredOTP || !storedOTP) {
    return { valid: false, reason: 'OTP code is required.' };
  }

  if (String(enteredOTP).trim() !== String(storedOTP).trim()) {
    return { valid: false, reason: 'Invalid OTP code.' };
  }

  if (expiresAt && new Date() > new Date(expiresAt)) {
    return { valid: false, reason: 'OTP has expired. Please request a new code.' };
  }

  return { valid: true };
};

export default generateOTP;
