import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './schemas/user.schema';
import { LikeDto } from './dto/like.dto';
import { Costumes } from 'src/costumes/schemas/costumes.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.usersModel.findOne({ email })
      .populate('liked', null, Costumes.name)
      .populate('saved', null, Costumes.name)
      .exec();
    return user;
  }

  async createOne(name: string, email: string) {
    let result: any;
    if (!name && !email) return {message: 'Fill the inputs', status: 'failure'};
    const existingUser = await this.usersModel.find({ email });

    if (existingUser.length !== 0) {
      result = existingUser;
    } else {
      result = await this.usersModel.create({ 
        name, email, createdAt: Date.now(), updatedAt: Date.now() 
      });
    }

    const token = this.jwtService.sign({ email });
    return { user: result, token, status: 'success' };
  }

  async likeCostume(data: LikeDto) {
    const user = await this.usersModel.findById(data.userId);
    const { liked }: any = user;

    const isExist = liked.some((item: any) => item === data.costumeId);
    let result: string[] = [...liked, data.costumeId];
    
    if (isExist) {
      result = result.filter((item: string) => item !== data.costumeId);
    }

    await user.updateOne({ liked: result });    
    return {result};
  }
}
