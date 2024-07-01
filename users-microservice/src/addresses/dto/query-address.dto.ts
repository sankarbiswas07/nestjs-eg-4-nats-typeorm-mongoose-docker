import { IsString, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from './create-address.dto';

export class QueryAddressDto {
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
    filter?: Partial<CreateAddressDto>;
}
