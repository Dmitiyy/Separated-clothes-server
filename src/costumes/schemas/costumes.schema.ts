import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Costumes {
  @Prop({required: true})
  title: string

  @Prop({required: true})
  image: string 

  @Prop({required: true, enum: ['man', 'woman']})
  sex: string

  @Prop({required: true})
  color: string

  //* 'conference', 'business meeting', 'party', 'stroll', 'dating', 'another'
  @Prop({required: true})
  event: string

  @Prop({default: 0})
  likes: number

  @Prop({required: true, enum: ['angry', 'sad', 'good', 'happy', 'excited']})
  mood: string

  @Prop({default: Date.now()})
  createdAt: Date

  @Prop({default: Date.now()})
  updatedAt: Date
}

export type CostumesDocument = Costumes & Document;
export const CostumesSchema = SchemaFactory.createForClass(Costumes);