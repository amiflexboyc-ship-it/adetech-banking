import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

let transporter = null;

const createTransporter = () => {
  if (transporter) return transporter;

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_SECURE,
    EMAIL_USER,
    EMAIL_PASS
  } = process.env;

  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: SMTP_SECURE === 'true' || Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });
    console.log(`[Email Service] Configured SMTP via ${SMTP_HOST}:${SMTP_PORT || 587}`);
  } else if (EMAIL_USER && EMAIL_PASS) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      }
    });
    console.log(`[Email Service] Configured Gmail SMTP for ${EMAIL_USER}`);
  } else {

    transporter = {
      sendMail: async (mailOptions) => {
        console.log(`\n======================================================`);
        console.log(`[EMAIL DISPATCH - DEV SIMULATOR]`);
        console.log(`To      : ${mailOptions.to}`);
        console.log(`Subject : ${mailOptions.subject}`);
        console.log(`From    : ${mailOptions.from || process.env.EMAIL_FROM || 'AdeTech Banking <noreply@adetechbank.com>'}`);
        if (mailOptions.text) {
          console.log(`Content :\n${mailOptions.text}`);
        }
        console.log(`======================================================\n`);
        return {
          messageId: `sim_${Date.now()}`,
          response: '250 Simulated Message Accepted for Delivery',
          accepted: [mailOptions.to]
        };
      },
      verify: async () => true
    };
    console.log('[Email Service] Running in Development Mode. Outgoing emails logged to console.');
  }

  return transporter;
};

const getSender = () => {
  return process.env.EMAIL_FROM || '"AdeTech Digital Bank" <no-reply@adetechbank.com>';
};

const buildEmailTemplate = ({ title, preheader, bodyHtml }) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #050e1a;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #e2e8f0;
    }
    .wrapper {
      max-width: 600px;
      margin: 24px auto;
      background-color: #071527;
      border: 1px solid rgba(59, 130, 246, 0.25);
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);
    }
    .header {
      background: linear-gradient(135deg, #0a1d36 0%, #071527 100%);
      padding: 32px 36px 24px;
      border-bottom: 1px solid rgba(59, 130, 246, 0.2);
      text-align: center;
    }
    .logo-text {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: 0.08em;
      color: #ffffff;
      text-transform: uppercase;
      margin: 0;
    }
    .logo-sub {
      font-size: 11px;
      color: #38bdf8;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin-top: 4px;
      font-weight: 600;
    }
    .content {
      padding: 36px;
    }
    .headline {
      font-size: 20px;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 16px;
    }
    .paragraph {
      font-size: 15px;
      line-height: 1.6;
      color: #cbd5e1;
      margin: 0 0 20px;
    }
    .otp-card {
      background: linear-gradient(180deg, #0a1d36 0%, #0d2545 100%);
      border: 1px solid rgba(59, 130, 246, 0.35);
      border-radius: 10px;
      padding: 24px;
      text-align: center;
      margin: 28px 0;
    }
    .otp-code {
      font-family: 'Courier New', Courier, monospace;
      font-size: 38px;
      font-weight: 800;
      letter-spacing: 12px;
      color: #38bdf8;
      text-shadow: 0 0 16px rgba(56, 189, 248, 0.4);
      margin: 8px 0;
    }
    .otp-expiry {
      font-size: 12px;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .notice-box {
      background-color: rgba(30, 58, 138, 0.15);
      border-left: 3px solid #3b82f6;
      padding: 14px 18px;
      border-radius: 0 8px 8px 0;
      font-size: 13px;
      line-height: 1.5;
      color: #93c5fd;
      margin: 24px 0 0;
    }
    .footer {
      background-color: #040c17;
      padding: 24px 36px;
      border-top: 1px solid rgba(30, 58, 138, 0.3);
      text-align: center;
      font-size: 12px;
      color: #64748b;
      line-height: 1.6;
    }
    .footer-links a {
      color: #38bdf8;
      text-decoration: none;
      margin: 0 8px;
    }
  </style>
</head>
<body>
  <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">${preheader || title}</div>
  <div class="wrapper">
    <div class="header">
      <div class="logo-text">AdeTech Bank</div>
      <div class="logo-sub">Central Digital Banking Rails</div>
    </div>
    <div class="content">
      ${bodyHtml}
    </div>
    <div class="footer">
      <div>AdeTech Financial Services PLC | CBN Licensed Digital Bank</div>
      <div style="margin: 6px 0;">Official Support: amiflexboyc@gmail.com | 09077108987</div>
      <div class="footer-links">
        <a href="https://wa.me/2349077108987">WhatsApp Support Desk</a> |
        <a href="mailto:amiflexboyc@gmail.com">Help Desk Email</a>
      </div>
      <div style="margin-top: 10px; font-size: 11px; color: #475569;">
        This is an automated security dispatch. Never disclose verification codes to third parties.
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
};

export const emailService = {

  sendTransferOTP: async (email, name, otp, amount, recipientName) => {
    const client = createTransporter();
    const recipient = name || 'Customer';

    const bodyHtml = `
      <h2 class="headline">Transfer Authorization Request</h2>
      <p class="paragraph">Hello ${recipient},</p>
      <p class="paragraph">
        An instant transfer of <strong>₦${Number(amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</strong> to <strong>${recipientName}</strong> was requested from your AdeTech checking account.
      </p>

      <div class="otp-card">
        <div style="font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">Transfer Authorization Code</div>
        <div class="otp-code">${otp}</div>
        <div class="otp-expiry">Valid for 10 minutes</div>
      </div>

      <div class="notice-box">
        <strong>Fraud Prevention:</strong> If you did not initiate this transaction, do not share this OTP. Immediately contact our emergency desk via WhatsApp at <strong>09077108987</strong> or email <strong>amiflexboyc@gmail.com</strong>.
      </div>
    `;

    const html = buildEmailTemplate({
      title: 'AdeTech Bank - Transfer Authorization Code',
      preheader: `Authorization code: ${otp} for ₦${Number(amount).toLocaleString('en-NG')}. Valid for 10 minutes.`,
      bodyHtml
    });

    const text = `AdeTech Bank - Transfer Authorization\n\nHello ${recipient},\nYour transfer authorization code is: ${otp}\nAmount: ₦${amount}\nBeneficiary: ${recipientName}\nValid for 10 minutes.\n\nEmergency Desk: 09077108987`;

    return client.sendMail({
      from: getSender(),
      to: email,
      subject: `AdeTech Security Alert: Transfer Authorization OTP [${otp}]`,
      text,
      html
    });
  },

  sendVerificationOTP: async (email, name, otp) => {
    const client = createTransporter();
    const recipientName = name || 'Valued Customer';

    const bodyHtml = `
      <h2 class="headline">Email Verification Code</h2>
      <p class="paragraph">Hello ${recipientName},</p>
      <p class="paragraph">
        Thank you for choosing AdeTech Digital Bank. To complete your account verification and activate your digital banking profile, please use the 6-digit One-Time Password (OTP) below:
      </p>

      <div class="otp-card">
        <div style="font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">Security Code</div>
        <div class="otp-code">${otp}</div>
        <div class="otp-expiry">Valid for 10 minutes</div>
      </div>

      <div class="notice-box">
        <strong>Security Notice:</strong> AdeTech representatives will never ask for your verification code, password, or transaction PIN. If you did not initiate this request, contact our emergency desk immediately at <strong>09077108987</strong>.
      </div>
    `;

    const html = buildEmailTemplate({
      title: 'AdeTech Bank - Email Verification Code',
      preheader: `Your verification code is ${otp}. Valid for 10 minutes.`,
      bodyHtml
    });

    const text = `AdeTech Bank - Email Verification\n\nHello ${recipientName},\n\nYour 6-digit verification code is: ${otp}\n\nThis code expires in 10 minutes.\nNever share this code with anyone.\n\nSupport: amiflexboyc@gmail.com | 09077108987`;

    return client.sendMail({
      from: getSender(),
      to: email,
      subject: `AdeTech Bank - Verification Code: ${otp}`,
      text,
      html
    });
  },

  sendWelcomeEmail: async (email, name, accountNumber) => {
    const client = createTransporter();
    const recipientName = name || 'Valued Customer';

    const bodyHtml = `
      <h2 class="headline">Welcome to AdeTech Digital Banking</h2>
      <p class="paragraph">Dear ${recipientName},</p>
      <p class="paragraph">
        Your AdeTech checking account has been established and is fully operational on Nigerian Inter-Bank Settlement System (NIBSS) rails.
      </p>

      <div class="otp-card" style="text-align: left; padding: 20px 24px;">
        <div style="font-size: 12px; color: #94a3b8; text-transform: uppercase; margin-bottom: 6px;">NUBAN Account Number</div>
        <div style="font-family: 'Courier New', monospace; font-size: 26px; font-weight: 700; color: #38bdf8; letter-spacing: 3px;">
          ${accountNumber || '0907710898'}
        </div>
        <div style="font-size: 13px; color: #cbd5e1; margin-top: 10px;">
          Account Type: <strong>Personal High-Yield Checking</strong> | Currency: <strong>NGN</strong>
        </div>
      </div>

      <p class="paragraph">
        You can now generate instant virtual USD mastercards, execute zero-fee inter-bank transfers, and settle utility bills through your personal dashboard.
      </p>
    `;

    const html = buildEmailTemplate({
      title: 'Welcome to AdeTech Digital Bank',
      preheader: `Your account ${accountNumber} has been successfully activated.`,
      bodyHtml
    });

    const text = `Welcome to AdeTech Digital Banking\n\nDear ${recipientName},\nYour account has been activated.\nNUBAN Account Number: ${accountNumber}\n\nAccess your portal at http://localhost:5173\nSupport: amiflexboyc@gmail.com | 09077108987`;

    return client.sendMail({
      from: getSender(),
      to: email,
      subject: 'Welcome to AdeTech Digital Banking - Account Activated',
      text,
      html
    });
  },

  sendPasswordResetOTP: async (email, name, otp) => {
    const client = createTransporter();
    const recipientName = name || 'Customer';

    const bodyHtml = `
      <h2 class="headline">Password Reset Authorization</h2>
      <p class="paragraph">Hello ${recipientName},</p>
      <p class="paragraph">
        We received a request to reset the password for your AdeTech Digital Banking account. Enter the authorization code below to configure a new password:
      </p>

      <div class="otp-card">
        <div style="font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">Password Reset Code</div>
        <div class="otp-code">${otp}</div>
        <div class="otp-expiry">Expires in 10 minutes</div>
      </div>

      <div class="notice-box">
        <strong>Security Alert:</strong> If you did not request a password reset, your credentials may be compromised. Please reach our security desk immediately via WhatsApp at <strong>09077108987</strong>.
      </div>
    `;

    const html = buildEmailTemplate({
      title: 'AdeTech Bank - Password Reset Code',
      preheader: `Reset code: ${otp}. Valid for 10 minutes.`,
      bodyHtml
    });

    const text = `AdeTech Bank - Password Reset Authorization\n\nHello ${recipientName},\n\nYour password reset code is: ${otp}\n\nExpires in 10 minutes.\nIf you did not request this, contact 09077108987 immediately.`;

    return client.sendMail({
      from: getSender(),
      to: email,
      subject: `AdeTech Security Alert - Password Reset Code: ${otp}`,
      text,
      html
    });
  },

  sendTransactionAlert: async (email, name, txn) => {
    const client = createTransporter();
    const isCredit = txn.type === 'credit';
    const accentColor = isCredit ? '#10b981' : '#f43f5e';
    const typeLabel = isCredit ? 'CREDIT ALERT' : 'DEBIT ALERT';

    const bodyHtml = `
      <div style="text-align: center; margin-bottom: 20px;">
        <span style="background-color: ${isCredit ? 'rgba(16,185,129,0.15)' : 'rgba(244,63,94,0.15)'}; border: 1px solid ${accentColor}; color: ${accentColor}; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.1em;">
          ${typeLabel}
        </span>
      </div>

      <div class="otp-card" style="text-align: center; padding: 24px;">
        <div style="font-size: 13px; color: #94a3b8; text-transform: uppercase;">Transaction Amount</div>
        <div style="font-size: 32px; font-weight: 800; color: #ffffff; margin: 8px 0;">
          ${isCredit ? '+' : '-'}₦${Number(txn.amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
        </div>
        <div style="font-size: 13px; color: #cbd5e1;">Reference: <strong>${txn.reference}</strong></div>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
        <tr style="border-bottom: 1px solid rgba(59, 130, 246, 0.15);">
          <td style="padding: 10px 0; color: #94a3b8;">Description</td>
          <td style="padding: 10px 0; color: #ffffff; text-align: right; font-weight: 500;">${txn.description || 'Electronic Transfer'}</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(59, 130, 246, 0.15);">
          <td style="padding: 10px 0; color: #94a3b8;">Timestamp</td>
          <td style="padding: 10px 0; color: #ffffff; text-align: right; font-weight: 500;">${new Date().toUTCString()}</td>
        </tr>
      </table>
    `;

    const html = buildEmailTemplate({
      title: `AdeTech Bank - ${typeLabel}`,
      preheader: `${typeLabel}: ₦${Number(txn.amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })} on your account.`,
      bodyHtml
    });

    return client.sendMail({
      from: getSender(),
      to: email,
      subject: `AdeTech Bank: ${typeLabel} [₦${Number(txn.amount).toLocaleString('en-NG')}]`,
      text: `${typeLabel}\nAmount: ₦${txn.amount}\nReference: ${txn.reference}`,
      html
    });
  },

  sendCustomMail: async ({ to, subject, html, text }) => {
    const client = createTransporter();
    return client.sendMail({
      from: getSender(),
      to,
      subject,
      html,
      text
    });
  }
};

export default emailService;
