import {
  IsNotEmpty, IsString, MaxLength, IsNumber,
  IsInt, IsOptional, IsArray, IsMongoId,
  IsEnum,
  IsPositive,
  IsBoolean
} from 'class-validator';


export class Product {
  @IsNotEmpty()
  @IsString()
  product_id: string;

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
  @IsPositive()
  @IsNumber()
  mrp: number;

  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  order_qty: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  stock_type?: string;

  @IsOptional()
  @IsString()
  image_urls?: string;
}

// Extended DTO User and Shipping Address
export class AddToCartWithUserDto extends Product {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  display_name: string; // user's or buyer display name

  @IsString()
  @IsNotEmpty()
  name: string; // c/o address name

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  line_1: string;

  @IsString()
  @IsOptional()
  landmark?: string;

  @IsBoolean()
  @IsOptional()
  skippedCart?: boolean = false;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  zip: string;
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
  user_id: string;
}
