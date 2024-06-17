import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ShippingAddress } from './ShippingAddress.schema';

@Schema()
export class User {

  @Prop({ unique: true, required: true })
  user_name: string;

  @Prop({ required: false })
  display_name?: string;

  @Prop({ required: false })
  avatar_url?: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ShippingAddress' }] })
  shipping_addresses: ShippingAddress[];

  @Prop({ required: false, default: 'inactive' })
  isDefault?: string

};

export const UserSchema = SchemaFactory.createForClass(User);
