import { Body, Controller, Delete, Param, Post, Query } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserLoginDto } from "./dto/user-login.dto";
import { VerifyEmailDto } from "./dto/verify-email.dto";
import { UsersService } from "./users.service";
import { UserInfo } from "./interface/user-info";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    const { name, email, password } = dto;
    await this.usersService.createUser(name, email, password);
  }

  @Post("/email-verify")
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    const { signUpVerifyToken } = dto;
    return await this.usersService.verifyEmail(signUpVerifyToken);
  }

  @Post("/login")
  async login(@Body() dto: UserLoginDto): Promise<string> {
    const { email, password } = dto;
    return await this.usersService.login(email, password);
  }

  @Post("/:id")
  async getUserInfo(@Param("id") userId: string): Promise<UserInfo> {
    return await this.usersService.getUserInfo(userId);
  }

  @Delete(":id")
  remove(@Param("id)") id: string) {
    return this.usersService.remove(+id);
  }
}
