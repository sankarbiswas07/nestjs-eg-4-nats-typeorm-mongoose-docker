import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ collection: 'products' })

export class Product {

    @Prop({ required: true, unique:true, maxlength: 8 })
    product_sku: string;

    @Prop({ required: true })
    product_name: string;

    @Prop()
    description?: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'ProductCategory' }] }) // Reference to ProductCategory
    _categories?: Types.ObjectId[]; // Array of Mongoose ObjectId references

    @Prop({ required: true })
    mrp: number;

    @Prop({ required: true, default: 0 })
    stockQty: number;

    @Prop({ required: true, default: 'pieces' })
    stockType?: string;

    @Prop()
    image_urls?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
