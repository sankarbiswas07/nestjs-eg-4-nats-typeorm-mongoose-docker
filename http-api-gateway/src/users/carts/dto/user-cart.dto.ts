import { IsNotEmpty, IsString } from 'class-validator';

export class UserCartDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;
}
