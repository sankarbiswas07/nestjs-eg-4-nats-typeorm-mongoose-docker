import { IsNotEmpty, IsString, MaxLength, IsNumber, IsInt,
     IsOptional, IsArray, IsMongoId, 
     IsBoolean} from 'class-validator';

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
  stock_qty: number;

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

