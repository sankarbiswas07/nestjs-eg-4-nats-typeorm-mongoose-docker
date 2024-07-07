import { IsArray, IsBoolean, IsEnum, IsInt, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';

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
export class CreateOrderViaCartDto extends Product {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  shipping_name: string; // c/o address name

  @IsString()
  @IsNotEmpty()
  shipping_phone: string;

  @IsString()
  @IsNotEmpty()
  shipping_line_1: string;

  @IsString()
  @IsOptional()
  shipping_landmark?: string;

  @IsString()
  @IsNotEmpty()
  shipping_state: string;

  @IsString()
  @IsNotEmpty()
  shipping_zip: string;

  @IsBoolean()
  @IsOptional()
  skippedCart?: boolean = false;
}
