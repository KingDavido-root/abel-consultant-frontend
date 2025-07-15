const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,     // e.g., smtp.gmail.com
  port: process.env.SMTP_PORT,     // e.g., 587
  secure: false,                   // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,   // your SMTP email
    pass: process.env.SMTP_PASS,   // your SMTP password or app password
  },
});

async function sendOrderConfirmation(toEmail, orderDetails) {
  const { orderId, productType, productId, productTitle, price, userName } = orderDetails;

  const mailOptions = {
    from: `"Abel Consultant LLC" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: 'Order Confirmation - Abel Consultant LLC',
    html: `
      <h2>Hello ${userName},</h2>
      <p>Thank you for your order!</p>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Product:</strong> ${productTitle} (${productType})</p>
      <p><strong>Price:</strong> $${price}</p>
      <p>We will notify you when your order is shipped.</p>
      <br/>
      <p>Best regards,<br/>Abel Consultant LLC Team</p>
    `,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = {
  sendOrderConfirmation,
};
