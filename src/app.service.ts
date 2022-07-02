import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(private readonly userService: UsersService) {}

  async googleLogin(req: any) {
    if (!req.user) {
      return 'No user from google'
    }

    const { email, firstName } = req.user;
    const existingUser = await this.userService.findOne(req.user.email);
    
    if (!existingUser) {
      const createdUser = await this.userService.createOne(email, firstName);
    }

    return {
      message: 'User information from google',
      user: req.user
    }
  }
}
