import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Clothes, ClothesSchema } from './schemas/clothes.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Clothes.name, schema: ClothesSchema}])
  ]
})
export class ClothesModule {}
