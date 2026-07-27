const nodemailer = require("nodemailer");

let transporter = null;

function getTransporter() {
  if (!process.env.SMTP_HOST) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
}

// Best-effort only: a form submission must never fail because notification email failed.
async function notify(subject, text) {
  const t = getTransporter();
  if (!t || !process.env.NOTIFY_EMAIL) return;
  try {
    await t.sendMail({ from: process.env.SMTP_USER, to: process.env.NOTIFY_EMAIL, subject, text });
  } catch (err) {
    console.error("notify() failed:", err.message);
  }
}

module.exports = { notify };
