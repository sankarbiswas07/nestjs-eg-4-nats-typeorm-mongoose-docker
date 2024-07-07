import { IsString, IsOptional } from 'class-validator';

export class UpdateProductCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}