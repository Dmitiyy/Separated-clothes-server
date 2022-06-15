import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { CostumesService } from './costumes.service';
import { CreateCostumeDto } from './dto/create-costume.dto';
import { GenerateParamsDto } from './dto/generate-params.dto';

@Controller('costumes')
export class CostumesController {
  constructor(private readonly costumesService: CostumesService) {}

  @Post('create')
  createCostume(@Body() data: CreateCostumeDto) {
    return this.costumesService.createCostume(data);
  }

  @Get('generate')
  generateCostume(@Query() params: GenerateParamsDto) {
    return this.costumesService.generateCostume(params);
  }

  @Get('all')
  getAllCostumes() {
    return this.costumesService.showAllCostumes();
  }
}
