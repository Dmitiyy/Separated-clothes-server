import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.usersModel.findOne({ email });
    return user;
  }

  async createOne(name: string, email: string) {
    if (!name && !email) return {message: 'Fill the inputs', status: 'failure'};
    
    const existingUser = await this.usersModel.find({ email });
    if (existingUser.length !== 0) return {message: 'User is already exist', status: 'failure'}
    
    const user = await this.usersModel.create({ 
      name, email, createdAt: Date.now(), updatedAt: Date.now() 
    });

    const token = this.jwtService.sign({ email });
    return { user, token, status: 'success' };
  }
}
