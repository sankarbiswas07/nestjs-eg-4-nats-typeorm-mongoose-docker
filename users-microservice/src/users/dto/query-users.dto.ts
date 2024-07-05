// src/users/dto/query-users.dto.ts
import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { UpdateUserDto } from './update-user.dto';
import { ObjectId } from 'typeorm';
import { SafeMongoIdTransform } from 'src/utils/helper';

export class QueryUsersDto {
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
  filter?: Partial<UpdateUserDto>;
}


export class UserIdDto {
  @IsNotEmpty()
  @Transform((value) => SafeMongoIdTransform(value))
  _id: string
}