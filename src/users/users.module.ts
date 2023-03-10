import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { EmailModule } from "../email/email.module";

@Module({
  imports:[EmailModule],
  providers: [UsersService]
})
export class UsersModule {
}
