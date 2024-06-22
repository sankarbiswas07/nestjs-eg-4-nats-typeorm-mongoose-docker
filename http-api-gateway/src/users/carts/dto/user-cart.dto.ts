import { IsNotEmpty, IsString } from 'class-validator';

export class UserCartDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
}
