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
    username: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @MaxLength(16)
    displayName?: string;
}
