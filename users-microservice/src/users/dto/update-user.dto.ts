import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength
} from "class-validator";

export class UpdateUserDto {
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

    @IsOptional()
    @IsString()
    status: string = 'inactive'; // default inactive
}
