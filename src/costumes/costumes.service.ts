import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { uniq } from 'lodash';

import { CreateCostumeDto } from './dto/create-costume.dto';
import { GenerateParamsDto } from './dto/generate-params.dto';
import { Costumes, CostumesDocument } from './schemas/costumes.schema';

@Injectable()
export class CostumesService {
  constructor(@InjectModel(Costumes.name) private costumesModel: Model<CostumesDocument>) {}

  async createCostume(data: CreateCostumeDto): Promise<Costumes> {
    const costume = new this.costumesModel({...data, createdAt: new Date(), updatedAt: new Date()});
    await costume.save();
    return costume;
  }

  async generateCostume(params: GenerateParamsDto): Promise<Costumes[]> {
    const { sex, mood, color, event } = params;
    const costumes = await this.costumesModel.find({ sex, color, mood });
    const resultData: Array<Costumes> = [];
  
    const transformedCostumes: any = costumes.map((item) => [item._id.toString(), item]);
    const mapData = new Map<string, Costumes>([...transformedCostumes]);

    const transformEvents = (eventString: string) => eventString.split(',');
    const receivedEventArr: Array<string> = transformEvents(event);

    for (let [_, item] of mapData) {
      const itemEventData = transformEvents(item.event);
      const foundItem = receivedEventArr.some(element => itemEventData.includes(element));

      if (foundItem) {resultData.push(item)};
    }

    if (resultData.length === 0) {
      for (let [_, item] of mapData) {resultData.push(item)};
    };
    return [...resultData];
  }

  async showAllCostumes(): Promise<Costumes[]> {
    return this.costumesModel.find();
  }

  async getNextStep(params: GenerateParamsDto) {
    const { sex, mood, color } = params;

    const eventualData: {color: string[], mood: string[], event: string[]} = {
      color: [], mood: [], event: []
    };

    const fetchSomeData = async (params: {sex: string, color?: string, mood?: string}, name: string) => {
      const data = await this.costumesModel.find({ ...params });

      for (let element of data) {
        if (name === 'event') {eventualData[name].push(...element[name].split(','))};
        eventualData[name].push(element[name]);
      };

      eventualData[name] = [...uniq(eventualData[name])];
    }

    if (sex && sex.length !== 0) {await fetchSomeData({sex}, 'color')};  
    if (color && color.length !== 0) {await fetchSomeData({sex, color}, 'mood')};
    if (mood && mood.length !== 0) {await fetchSomeData({sex, color, mood}, 'event')};

    return eventualData;
  }
} 