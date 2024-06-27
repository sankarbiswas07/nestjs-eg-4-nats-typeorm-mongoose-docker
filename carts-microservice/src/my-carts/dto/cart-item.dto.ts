import { IsNotEmpty, IsString, MaxLength, IsNumber, 
  IsInt, IsOptional, IsArray, IsMongoId } from 'class-validator';

export class Product {

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
  orderQty: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  stockType?: string;

  @IsOptional()
  @IsString()
  image_urls?: string;
}

// Extended DTO
export class AddToCartWithUserDto extends Product {
  @IsNotEmpty()
  @IsString()
  userId: string;
}

export class ProductSkuInObj {
  @IsNotEmpty()
  @IsString()
  @MaxLength(8)
  product_sku: string;
}

// Extended DTO
export class RemoveItemFromCartDto extends ProductSkuInObj {
  @IsNotEmpty()
  @IsString()
  userId: string;
}
