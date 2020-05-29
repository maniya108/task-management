import { UserEntity } from '@entities/user.entity';
import { LoginDto, RegisterDto } from '@dtos/auth.dto';
import { LocalAuthGuard } from '@guards/local-auth.guard';
import { AuthResponse } from '@models/auth.model';
import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import {
    ApiBody,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiHeader,
    ApiInternalServerErrorResponse,
    ApiTags,
    ApiUnauthorizedResponse,
    ApiOperation,
    ApiConsumes,
    ApiProduces
} from '@nestjs/swagger';

import { AuthService } from './auth.service';

@ApiTags('AuthController')
@ApiHeader({
    name: 'Content-Type',
    description: 'application/json',
})
@ApiConsumes('application/json')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @ApiBody({ type: RegisterDto })
    @ApiOperation({ summary: 'register', description: 'To create a new user in the DB ' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.' })
    @ApiConflictResponse({ description: 'Username is already exists' })
    @ApiInternalServerErrorResponse({ description: 'Contact your  system admin' })
    @Post('/register')
    async register(
        @Body(ValidationPipe) registerDto: RegisterDto
    ): Promise<void> {
        return await this.authService.register(registerDto);
    }

    @ApiBody({ type: LoginDto })
    @ApiProduces('application/json')
    @ApiOperation({ summary: 'login', description: 'Try to login with username & password ' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    @ApiCreatedResponse({ type: UserEntity, description: 'User logged in successfully' })
    @ApiInternalServerErrorResponse({ description: 'Contact your system admin' })
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(
        @Body(ValidationPipe) loginDto: LoginDto
    ): Promise<AuthResponse | undefined> {
        return await this.authService.login(loginDto);
    }
}
