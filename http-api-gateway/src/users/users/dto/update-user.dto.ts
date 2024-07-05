import {
    IsEmail,
    IsOptional,
    IsString,
    MaxLength
} from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MaxLength(32)
    user_name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @MaxLength(16)
    display_name?: string;

    @IsOptional()
    @IsString()
    avatar_url?: string;

    @IsOptional()
    @IsString()
    status?: string = 'inactive'; // default inactive
}
