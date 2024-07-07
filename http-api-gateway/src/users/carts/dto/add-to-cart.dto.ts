import {
  IsNotEmpty, IsString, MaxLength, IsNumber, IsInt,
  IsOptional, IsArray, IsMongoId,
  IsBoolean
} from 'class-validator';

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
  order_qty: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  stock_type?: string;

  @IsOptional()
  @IsString()
  image_urls?: string;

  @IsNotEmpty()
  @IsString()
  user_id: string;
}

// Extended DTO User and Shipping Address
export class CreateOrderViaCartDto extends AddToCartDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  display_name: string; // user's or buyer display name

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

