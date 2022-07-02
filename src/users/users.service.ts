import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private usersModel: Model<UserDocument>) {}

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.usersModel.findOne({ email });
    return user;
  }

  async createOne(name: string, email: string): Promise<User> {
    const user = await this.usersModel.create({ 
      name, email, createdAt: Date.now(), updatedAt: Date.now() 
    });
    return user;
  }
}
