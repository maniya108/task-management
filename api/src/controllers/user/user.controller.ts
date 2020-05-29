import { User } from '@controllers/auth/user.decorator';
import { UserEntity } from '@entities/user.entity';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { UserResponse } from '@models/auth.model';
import { Body, Controller, Get, ParseUUIDPipe, Patch, UseGuards, ValidationPipe } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiHeader,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';

import { UpdateUserDto } from './../../dtos/auth.dto';
import { UserService } from './user.service';

@ApiTags('UserController')
@ApiBearerAuth()
@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiHeader({
    name: 'Content-Type',
    description: 'application/json',
})
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @ApiOperation({ summary: 'findUserById', description: 'To find user by id. The id will automatically get it from the token' })
    @ApiOkResponse({ type: UserEntity, description: 'User loaded successfully' })
    @ApiNotFoundResponse({ description: 'Username is id is not found' })
    @ApiInternalServerErrorResponse({ description: 'Contact your  system admin' })
    @Get()
    findUserById(
        @User('id', ParseUUIDPipe) id: string
    ): Promise<UserResponse | undefined> {
        return this.userService.findUserById(id);
    }

    @ApiBody({ type: UpdateUserDto })
    @ApiOperation({ summary: 'updateUserById', description: 'To find user by id. The id will automatically get it from the token' })
    @ApiOkResponse({ type: UserEntity, description: 'User updated successfully' })
    @ApiNotFoundResponse({ description: 'Username is id is not found' })
    @ApiInternalServerErrorResponse({ description: 'Contact your  system admin' })
    @Patch()
    updateUserById(
        @User('id', ParseUUIDPipe) id: string,
        @Body(ValidationPipe) updateUserDto: UpdateUserDto
    ) {
        return this.userService.updateUserById(id, updateUserDto);
    }
}
