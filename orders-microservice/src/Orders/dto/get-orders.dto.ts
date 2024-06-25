import { Type } from 'class-transformer';
import { IsOptional, IsString, IsPositive } from 'class-validator';
import { UpdateOrderDto } from './update-order.dto';

export class GetOrdersDto {
  @IsOptional()
  @IsString()
  user_id?: string;

  // @ValidateIf((obj) => typeof obj.page === 'string')
  // @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  page?: number = 1;

  // @ValidateIf((obj) => typeof obj.limit === 'string')
  // @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  limit?: number = 10;

  @IsOptional()
  @IsString()
  filter?: Partial<UpdateOrderDto>;
}
