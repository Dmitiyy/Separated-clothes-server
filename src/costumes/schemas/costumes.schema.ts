import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Clothes } from "src/clothes/schemas/clothes.schema";

@Schema()
export class Costumes {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Clothes'})
  data: Array<Clothes>[]
}

export type CostumesDocument = Costumes & Document;
export const CostumesSchema = SchemaFactory.createForClass(Costumes);