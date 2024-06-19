import { 
    IsString, IsOptional, 
    IsNumber, IsArray, IsUrl, 
    IsUUID, Min, IsPositive 
} from 'class-validator';

import { Types } from 'mongoose';

export class UpdateProductDto {

    @IsString()
    @IsOptional()
    product_name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsArray()
    @IsUUID('4', { each: true })
    @IsOptional()
    _categories?: Types.ObjectId[];

    @IsNumber()
    @IsPositive()
    @IsOptional()
    mrp?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    stockQty?: number;

    @IsString()
    @IsOptional()
    stockType?: string;

    @IsString()
    @IsOptional()
    @IsUrl({}, { each: true })
    image_urls?: string;
}
