// src/address/dto/create-address.dto.ts

import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateAddressDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  line_1?: string;

  @IsString()
  @IsOptional()
  landmark?: string;

  @IsString()
  
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  zip?: string;

  @IsBoolean()
  @IsOptional()
  is_default?: boolean = false;
}
