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

  @Prop({required: true, enum: [
    'conference', 'business meeting', 'party', 'stroll', 'dating', 'another'
  ]})
  event: string

  @Prop({required: true, enum: ['angry', 'sad', 'good', 'happy', 'excited']})
  mood: string
}

export type CostumesDocument = Costumes & Document;
export const CostumesSchema = SchemaFactory.createForClass(Costumes);