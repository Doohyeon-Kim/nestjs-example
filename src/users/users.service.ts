import * as uuid from "uuid";
import { Injectable } from "@nestjs/common";
import { EmailService } from "../email/email.service";

@Injectable()
export class UsersService {
  constructor(private emailService: EmailService) {
  }

  async createUser(name: string, email: string, password: string) {
    await this.checkUserExists(email);
    const signUpVerifyToken = uuid.v1();
    await this.saveUser(name, email, password, signUpVerifyToken);
    await this.sendMemberJoinEmail(email, signUpVerifyToken);
  }

  private checkUserExists(email: string) {
    return false;
  }

  private saveUser(name: string, email: string, password: string, signUpVerifyToken: string) {
    return;
  }

  private async sendMemberJoinEmail(email: string, signUpVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(email, signUpVerifyToken);
  }

  remove(id: number) {
    return `this action removes a #${id} user`;
  }
}
