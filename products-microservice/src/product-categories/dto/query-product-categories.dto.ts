import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { UpdateProductCategoryDto } from './update-product-category.dto';
import { SafeMongoIdTransform } from 'src/utils/helper';

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



export class CategoryIdDto {
  @IsNotEmpty()
  @Transform((value) => SafeMongoIdTransform(value))
  _id: string
}