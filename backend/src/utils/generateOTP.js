import crypto from 'crypto';

/**
 * Generate a cryptographically secure numeric One-Time Password (OTP).
 *
 * @param {number} length - Number of digits (default: 6)
 * @returns {string} The generated OTP string
 */
export const generateOTP = (length = 6) => {
  if (length <= 0) {
    throw new Error('OTP length must be greater than zero.');
  }

  // Calculate minimum and maximum bounds for the given number of digits
  // E.g., for 6 digits: min = 100000, max = 999999
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  // Use crypto.randomInt for cryptographically secure pseudo-random number generation
  const otpNumber = crypto.randomInt(min, max + 1);
  return otpNumber.toString();
};

/**
 * Generate an OTP object complete with code, generation timestamp, and expiration timestamp.
 *
 * @param {number} length - Number of digits (default: 6)
 * @param {number} validityMinutes - Minutes before OTP expires (default: 10 minutes)
 * @returns {Object} { otp, expiresAt, createdAt }
 */
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

/**
 * Validate an entered OTP against the recorded OTP and expiration timestamp.
 *
 * @param {string} enteredOTP - OTP provided by the user
 * @param {string} storedOTP - Expected OTP stored in database/cache
 * @param {Date|string|number} expiresAt - Expiration timestamp
 * @returns {Object} { valid: boolean, reason?: string }
 */
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
