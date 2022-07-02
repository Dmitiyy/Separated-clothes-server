import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Costumes } from "src/costumes/schemas/costumes.schema";

@Schema()
export class User {
  @Prop({ required: true })
  name: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ default: Date.now() })
  createdAt: Date

  @Prop({ default: Date.now() })
  updatedAt: Date

  @Prop({default: [], type: Array<mongoose.Schema.Types.ObjectId>, ref: 'Costumes'})
  liked: Array<mongoose.Schema.Types.ObjectId>

  @Prop({default: [], type: Array<mongoose.Schema.Types.ObjectId>, ref: 'Costumes'})
  saved: Array<mongoose.Schema.Types.ObjectId>
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);