import * as uuid from "uuid";
import { Injectable } from "@nestjs/common";
import { EmailService } from "../email/email.service";
import { UserInfo } from "./interface/user-info";

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

  async verifyEmail(signUpVerifyToken: string): Promise<string> {
    throw new Error("Method not implemented");
  }

  async login(email: string, password: string): Promise<string> {
    throw new Error("Method not implemented");
  }

  async getUserInfo(userId: string): Promise<UserInfo> {
    throw new Error("Method not implemented");
  }

  remove(id: number) {
    return `this action removes a #${id} user`;
  }
}
