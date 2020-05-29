import { TaskEntity } from '@entities/task.entity';
import { UserResponse } from '@models/auth.model';
import { compare, hash } from 'bcrypt';
import { classToPlain, Exclude } from 'class-transformer';
import { IsAlpha, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { type } from 'os';
import { BeforeInsert, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractEntity } from './abstract.entity';

@Entity({ name: 'user' })
export class UserEntity extends AbstractEntity {

    @PrimaryGeneratedColumn('uuid', { comment: 'primary unique columns' })
    id: string;

    @IsEmail()
    @IsNotEmpty()
    @Index('username', { unique: true })
    @Column({ unique: true })
    username: string;

    @IsString()
    @Column()
    @Exclude()
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsAlpha()
    @Column({ name: 'firstname' })
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @IsAlpha()
    @Column({ name: 'lastname' })
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @IsAlpha()
    @Column({ name: 'fullname', default: '' })
    fullName: string;

    @Column({ select: false })
    @IsString()
    @Exclude()
    salt: string;

    @IsString()
    @IsAlpha()
    @Column({ default: '' })
    bio: string;

    @Column({ name: 'user_image', default: null, nullable: true })
    userImage: string;


    @OneToMany(type => TaskEntity, task => task.user, { eager: false })
    tasks: TaskEntity[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, this.salt);
    }

    @BeforeInsert()
    generatefullName() {
        this.fullName = `${this.firstName} ${this.lastName}`
    }

    async comparePassword(currentPassword: string) {
        return await compare(currentPassword, this.password);
    }


    toJSON(): UserResponse {
        return classToPlain(this) as UserResponse;
    }
}