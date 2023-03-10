import { Injectable } from "@nestjs/common";
import Mail from "nodemailer/lib/mailer";
import * as nodemailer from "nodemailer";

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport(
      {
        service: "naver",
        host: "smtp.naver.com",
        port: 587,
        auth: {
          user: "YOUR_EMAIL",
          pass: "YOUR_PASSWORD"
        }
      }
    );
  }

  async sendMemberJoinVerification(emailAddress: string, signUpVerifyToke: string) {
    const baseUrl = "http://localhost:3000";

    const url = `${baseUrl}/users/email-verify?signUpVerifyToken=${signUpVerifyToke}`;

    const mailOptions: EmailOptions = {
      from: "YOUR_EMAIL",
      to: emailAddress,
      subject: "가입 인증 메일",
      html: `
         메일서버 테스트 이메일입니다. <br/> 
         아래 가입확인 버튼을 누르시면 가입 인증이 완료됩니다. <br/> <br/>
        <form action="${url}" method="POST">
          <button>가입확인</button>
        </form>
        `
    };
    return await this.transporter.sendMail(mailOptions);
  }
}
