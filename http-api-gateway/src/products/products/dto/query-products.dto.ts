import { IsOptional, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateProductDto } from './update-product.dto';

export class QueryProductsDto {
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  limit?: number = 10;

  @IsOptional()
  @IsString()
  filter?: Partial<UpdateProductDto>;
}
