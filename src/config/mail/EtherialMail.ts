import nodemailer from 'nodemailer';

interface ISendMail {
  to: string;
  body: string;
  subject: string;
}

export default class EtherialMail {
  static async sendMail({ to, body, subject }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: "equipe@vendas.com.br",
      to,
      subject,
      text: body
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
