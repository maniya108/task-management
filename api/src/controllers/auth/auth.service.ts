import { LoginDto, RegisterDto } from '@dtos/auth.dto';
import { UserEntity } from '@entities/user.entity';
import { AuthResponse, UserResponse } from '@models/auth.model';
import { ConflictException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt } from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    private logger = new Logger('AuthService');

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService
    ) { }

    async register(registerDto: RegisterDto): Promise<void> {
        const user = this.userRepository.create(registerDto);
        user.salt = await genSalt();
        try {
            await user.save();
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }

    }

    async login({ username }: LoginDto): Promise<AuthResponse | undefined> {

        const user = await this.userRepository.findOne({ where: { username } });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        this.logger.debug(`Generated JWT Token with payload ${JSON.stringify({ username })}`);

        const token = await this.jwtService.sign({ username });
        return { ...user.toJSON(), token };
    }

    async validateUser(username: string, password: string): Promise<UserResponse | null> {

        const user = await this.userRepository.findOne({ where: { username } });
        const isValid = await user?.comparePassword(password);

        if (user && isValid) {
            return { ...user.toJSON() };
        }

        return null;
    }

}
