import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { UpdateProductDto } from './update-product.dto';
import { SafeMongoIdTransform } from 'src/utils/helper';

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


export class ProductIdDto {
  @IsNotEmpty()
  @Transform((value) => SafeMongoIdTransform(value))
  _id: string
}