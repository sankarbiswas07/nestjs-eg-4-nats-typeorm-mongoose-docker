import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength
} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(32)
    user_name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @MaxLength(16)
    display_name?: string;

    @IsOptional()
    @IsString()
    avatar_url?: string;
}
