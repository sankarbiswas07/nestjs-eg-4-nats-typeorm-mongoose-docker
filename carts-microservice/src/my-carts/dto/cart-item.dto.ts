import { IsNotEmpty, IsString, MaxLength, IsNumber, 
  IsInt, IsOptional, IsArray, IsMongoId } from 'class-validator';

export class AddToCartDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(8)
  product_sku: string;

  @IsNotEmpty()
  @IsString()
  product_name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  _categories?: string[];

  @IsNotEmpty()
  @IsNumber()
  mrp: number;

  @IsNotEmpty()
  @IsInt()
  stockQty: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  stockType?: string;

  @IsOptional()
  @IsString()
  image_urls?: string;
}

export class RemoveFromCartDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(8)
  product_sku: string;
}
