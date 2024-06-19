import {
    IsString, IsNotEmpty, IsOptional,
    IsNumber, IsArray, IsUrl,
     Min, IsPositive
} from 'class-validator';

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    product_name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsArray()
    @IsOptional()
    _categories?: string[];

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    mrp: number;

    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    stockQty: number;

    @IsString()
    @IsNotEmpty()
    stockType: string;

    @IsString()
    @IsOptional()
    @IsUrl({}, { each: true })
    image_urls?: string;
}
