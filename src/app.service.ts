import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GoogleAuthDto } from './users/dto/google-auth.dto';
import { User } from './users/schemas/user.schema';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(private readonly userService: UsersService, private jwtService: JwtService) {}

  async googleLogin(req: any) {
    if (!req.user) {
      return 'No user from google'
    } 

    const { email, firstName } = req.user;
    let user: User;

    const token = this.jwtService.sign({email});

    return {
      message: 'User information from google',
      user: user,
      token
    }
  }

  async getProfile(params: GoogleAuthDto) {
    const { email } = this.jwtService.verify(params.token.split(' ')[1]);
    const user = await this.userService.findOne(email);

    return {user};
  }
}
