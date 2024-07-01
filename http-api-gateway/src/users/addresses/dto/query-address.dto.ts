// src/address/dto/create-address.dto.ts

import { IsString, IsOptional, IsPositive } from 'class-validator';
import { UpdateAddressDto } from './update-address.dto';
import { Type } from 'class-transformer';

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
    filter?: Partial<UpdateAddressDto>;
}
