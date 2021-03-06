import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CostumesModule } from './costumes/costumes.module';
import { GoogleStrategy } from './google.strategy';

dotenv.config({ path: '.env' });
const dbConnection = `mongodb+srv://clothes:${process.env.MONGO_PASS}@clothes.375s7.mongodb.net/Clothes?retryWrites=true&w=majority`;

@Module({
  imports: [
    MongooseModule.forRoot(dbConnection),
    UsersModule,
    CostumesModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}
