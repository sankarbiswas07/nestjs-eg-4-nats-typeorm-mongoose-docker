import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsInt, Min, ValidateIf } from 'class-validator';

export class GetOrdersDto {
  @IsOptional()
  @IsString()
  user_id?: string;

  @IsOptional()
  @ValidateIf((obj) => typeof obj.page === 'string')
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(0)
  page?: number;

  @IsOptional()
  @ValidateIf((obj) => typeof obj.limit === 'string')
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(1)
  limit?: number;
}
