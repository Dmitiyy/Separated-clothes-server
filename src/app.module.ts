import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CostumesModule } from './costumes/costumes.module';

dotenv.config({ path: '.env' });
const dbConnection = `mongodb+srv://clothes:${process.env.MONGO_PASS}@clothes.375s7.mongodb.net/Clothes?retryWrites=true&w=majority`;

@Module({
  imports: [
    MongooseModule.forRoot(dbConnection),
    UsersModule,
    CostumesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
