import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Clothes {
  @Prop({required: true})
  title: string

  @Prop({required: true})
  image: string 
}

export type ClothesDocument = Clothes & Document;
export const ClothesSchema = SchemaFactory.createForClass(Clothes);