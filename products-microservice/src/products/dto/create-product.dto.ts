import {
    IsString, IsNotEmpty, IsOptional,
    IsNumber, IsArray, IsUrl,
     Min, IsPositive
} from 'class-validator';

import { Types } from 'mongoose';

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    product_name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsArray()
    @IsOptional()
    _categories?: Types.ObjectId[];

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    mrp: number;

    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    stock_qty: number;

    @IsString()
    @IsNotEmpty()
    stock_type: string;

    @IsString()
    @IsOptional()
    @IsUrl({}, { each: true })
    image_urls?: string;
}
