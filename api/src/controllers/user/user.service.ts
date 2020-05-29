import { UpdateUserDto } from './../../dtos/auth.dto';
import { UserEntity } from '@entities/user.entity';
import { UserResponse } from '@models/auth.model';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ) { }

    async findUserById(id: string): Promise<UserResponse | undefined> {
        try {
            const user = await this.userRepository.findOne(id);
            if (!user) {
                throw new NotFoundException(`${id} not found`);
            }
            return { ...user.toJSON() };
        } catch (error) {
            throw new InternalServerErrorException();
        }

    }

    async updateUserById(id, updateUserDto: UpdateUserDto): Promise<UserResponse | undefined> {
        const found = await this.findUserById(id);

        if (found) {
            updateUserDto.fullName = `${updateUserDto?.firstName || ''} ${updateUserDto?.lastName || ''}`.trim();
            const updated = await this.userRepository.update(id, updateUserDto);

            if (updated.affected === 0) {
                throw new NotFoundException(`user id "${id}" was not found`);
            }

            return await this.findUserById(id);
        }
    }
}
