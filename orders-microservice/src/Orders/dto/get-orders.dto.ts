import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class GetOrdersDto {
  @IsOptional()
  @IsString()
  user_id?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;
}
