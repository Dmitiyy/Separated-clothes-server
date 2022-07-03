import { Controller, Get, Headers, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { GoogleAuthDto } from './users/dto/google-auth.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('/auth/google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.appService.googleLogin(req);
  }

  @Get('google/profile')
  getGoogleProfile(@Headers() params: GoogleAuthDto) {
    return this.appService.getProfile(params);
  }
}
