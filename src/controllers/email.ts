import * as nodemailer from "nodemailer";

class EmailController {
  transporter!: nodemailer.Transporter;
  constructor(
    public host: string,
    public port: number,
    public secure: boolean,
    public user: string,
    public pass: string
  ) {
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass
      }
    });
  }

  async sendEmail(mailOptions: nodemailer.SendMailOptions) {
    const info = await this.transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  }
}

const emailController = new EmailController(
  "smtp.ethereal.email",
  587,
  false,
  "FAKE_USERNAME",
  "FAKE_PASSWORD"
);

export { emailController };
