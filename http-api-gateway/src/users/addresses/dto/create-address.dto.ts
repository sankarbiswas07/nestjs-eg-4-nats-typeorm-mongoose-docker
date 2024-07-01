// src/address/dto/create-address.dto.ts

import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  line_1: string;

  @IsString()
  @IsOptional()
  landmark?: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  zip: string;

  @IsBoolean()
  @IsOptional()
  is_default?: boolean = false;
}
