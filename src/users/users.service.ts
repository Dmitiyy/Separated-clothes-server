import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './schemas/user.schema';
import { LikeDto } from './dto/like.dto';
import { Costumes } from 'src/costumes/schemas/costumes.schema';
import { CostumesService } from 'src/costumes/costumes.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
    private jwtService: JwtService,
    private costumesService: CostumesService
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

  async changeProp(data: LikeDto, property: string) {
    const user = await this.usersModel.findById(data.userId);
    const { [property]: prop }: any = user;
    let increase: boolean = true;

    const isExist = prop.some((item: any) => item === data.costumeId);
    let result: string[] = [...prop, data.costumeId];
    
    if (isExist) {
      result = result.filter((item: string) => item !== data.costumeId);
      increase = false;
    }

    if (property === 'liked') {
      await this.costumesService.addLike(increase, data.costumeId);
    } else {
      await this.costumesService.addToSaved(increase, data.costumeId);
    }

    await user.updateOne({ [property]: result });    
    return {result};
  }

  async likeCostume(data: LikeDto) {return this.changeProp(data, 'liked')};
  async saveCostume(data: LikeDto) {return this.changeProp(data, 'saved')};
}
