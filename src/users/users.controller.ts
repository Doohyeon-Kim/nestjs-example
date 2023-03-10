import { Body, Controller, Delete, Param, Post, Query } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserLoginDto } from "./dto/user-login.dto";
import { VerifyEmailDto } from "./dto/verify-email.dto";
import { UsersService } from "./users.service";

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
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<void> {
    console.log(dto);
  }

  @Post("/login")
  async login(@Body() dto: UserLoginDto): Promise<void> {
    console.log(dto);
  }

  @Post("/:id")
  async getUserInfo(@Param("id") userId: string): Promise<void> {
    console.log(userId);
  }

  @Delete(":id")
  remove(@Param("id)") id: string) {
    return this.usersService.remove(+id);
  }
}
