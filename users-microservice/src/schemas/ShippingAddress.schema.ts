import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class ShippingAddress {

    @Prop({ unique: true, required: true })
    name: string

    @Prop({ required: true })
    phone: string

    @Prop({ required: true })
    line_1: string

    @Prop({ required: false })
    landmark?: string

    @Prop({ required: true })
    state: string

    @Prop({ required: true })
    zip: string

    @Prop({ required: false, default: false })
    isDefault?: boolean

};
export const ShippingAddressSchema = SchemaFactory.createForClass(ShippingAddress);
