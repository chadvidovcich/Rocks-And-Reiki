/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createTransport, getTestMessageUrl } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeEmail(text: string): string {
  return `
  <div style="
  border: 1px solid black;
  padding: 20px;
  font-family: sans-serif
  line-height: 2
  font-size: 20px
  ">
  <h2>Hello There!</h2>
  <p>${text}</p>
  <p>🎉, Chad</p>
  </div>
  `;
}

// eslint-disable-next-line import/prefer-default-export
export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  // email the user a password reset token
  const info = await transport.sendMail({
    to,
    from: 'test@example.com',
    subject: 'Your password reset token!',
    html: makeEmail(`Your password reset token is here!
    <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click Here to Reset</a>
    `),
  });

  if (process.env.MAIL_USER?.includes('ethereal.email')) {
    console.log(`✉️ Message Sent! Preview it at ${getTestMessageUrl(info)}`);
  }
}
