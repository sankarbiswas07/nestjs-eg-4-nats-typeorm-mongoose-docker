import { IsOptional, IsString, IsInt, IsUUID, IsArray, IsEnum } from 'class-validator';
import { OrderPaymentStatus } from 'src/utils/type-helper';

export class UpdateOrderDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  product_sku?: string;

  @IsOptional()
  @IsString()
  product_name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories_uuids?: string[];

  @IsOptional()
  @IsInt()
  mrp?: number;

  @IsOptional()
  @IsInt()
  stockQty?: number;

  @IsOptional()
  @IsString()
  stockType?: string;

  @IsOptional()
  @IsString()
  image_urls?: string;

  @IsOptional()
  @IsString()
  user_id?: string;

  @IsOptional()
  @IsString()
  user_name?: string;

  @IsOptional()
  @IsString()
  display_name?: string;

  @IsOptional()
  @IsString()
  avatar_url?: string;

  @IsOptional()
  @IsString()
  shipping_id?: string;

  @IsOptional()
  @IsString()
  shipping_name?: string;

  @IsOptional()
  @IsString()
  shipping_phone?: string;

  @IsOptional()
  @IsString()
  shipping_line_1?: string;

  @IsOptional()
  @IsString()
  shipping_landmark?: string;

  @IsOptional()
  @IsString()
  shipping_state?: string;

  @IsOptional()
  @IsEnum(OrderPaymentStatus) // Validate against OrderPaymentStatus enum
  status?: OrderPaymentStatus;
}
