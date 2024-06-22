import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RemoveFromCartDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(8)
  product_sku: string;
}

