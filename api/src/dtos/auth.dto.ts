import { IsAlpha, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {

    @ApiProperty({ name: 'username', description: 'username must be a email', example: 'abc@xyz.com', maxLength: 25, minLength: 8, required: true, type: String, title: 'username' })
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @MaxLength(25)
    @MinLength(8)
    username: string;

    @ApiProperty({ name: 'password', description: 'password must be a string', example: 'xyz1234@sd', maxLength: 25, minLength: 6, required: true, type: String, title: 'password' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(25)
    @MinLength(6)
    password: string;
}

export class RegisterDto extends LoginDto {

    @ApiProperty({ name: 'firstName', description: 'firstName must be a alphapets', example: 'abcdexgh', required: true, type: String, title: 'firstname' })
    @IsString()
    @IsAlpha()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({ name: 'lastName', description: 'lastName must be a alphapets', example: 'abcdexgh', required: true, type: String, title: 'lastname' })
    @IsString()
    @IsAlpha()
    @IsNotEmpty()
    lastName: string;

}

export class UpdateUserDto {

    @ApiPropertyOptional({ name: 'userImage', description: 'userImage is a optional field', example: 'coming soon', type: String, title: 'userImage' })
    @IsString()
    @IsOptional()
    userImage: string;

    @ApiPropertyOptional({ name: 'firstName', description: 'firstName is a optional field', example: 'abcd', type: String, title: 'firstName' })
    @IsString()
    @IsAlpha()
    @IsOptional()
    firstName: string;

    @ApiPropertyOptional({ name: 'lastName', description: 'lastName is a optional field', example: 'xyz', type: String, title: 'lastName' })
    @IsString()
    @IsAlpha()
    @IsOptional()
    lastName: string;

    @ApiPropertyOptional({ name: 'fullName', description: 'fullName is a optional field', default: '', example: 'xyz', type: String, title: 'fullName' })
    @IsString()
    @IsAlpha()
    @IsOptional()
    fullName: string;

    @ApiPropertyOptional({ name: 'bio', description: 'bio is a optional field', example: 'xyz', type: String, title: 'bio' })
    @IsString()
    @IsAlpha()
    @IsOptional()
    bio: string
}
