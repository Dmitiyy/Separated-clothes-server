import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Costumes, CostumesSchema } from './schemas/costumes.schema';
import { CostumesController } from './costumes.controller';
import { CostumesService } from './costumes.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Costumes.name, schema: CostumesSchema}])
  ],
  controllers: [CostumesController],
  providers: [CostumesService],
  exports: [CostumesService]
})
export class CostumesModule {}
