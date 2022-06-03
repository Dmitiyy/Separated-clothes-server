import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Costumes, CostumesSchema } from './schemas/costumes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Costumes.name, schema: CostumesSchema}])
  ]
})
export class CostumesModule {}
