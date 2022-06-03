import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Costumes } from "src/costumes/schemas/costumes.schema";

@Schema()
export class User {
  @Prop({ required: true })
  name: string

  @Prop({ required: true, min: 8, select: true })
  password: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ default: Date.now() })
  createdAt: Date

  @Prop({ default: Date.now() })
  updatedAt: Date

  @Prop({default: [], type: mongoose.Schema.Types.ObjectId, ref: 'Costumes'})
  liked: Array<Costumes>

  @Prop({default: [], type: mongoose.Schema.Types.ObjectId, ref: 'Costumes'})
  saved: Array<Costumes>
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);