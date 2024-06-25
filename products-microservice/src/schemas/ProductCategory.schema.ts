import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductCategoryDocument = ProductCategory & Document;

@Schema({ collection: 'product-categories' })

export class ProductCategory {

    @Prop({ required: true })
    name: string;

    @Prop()
    description?: string;
}

export const ProductCategorySchema = SchemaFactory.createForClass(ProductCategory);
