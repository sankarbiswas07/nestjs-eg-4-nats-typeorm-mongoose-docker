import { IsOptional, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateProductCategoryDto } from './update-product-category.dto';

export class QueryProductCategoriesDto {
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
  filter?: Partial<UpdateProductCategoryDto>;
}
