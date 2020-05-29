import { UserEntity } from '@entities/user.entity';
import { TaskStatus } from '@models/task.enum';
import { IsAlphanumeric, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractEntity } from './abstract.entity';

@Entity('task')
export class TaskEntity extends AbstractEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsString()
    @IsNotEmpty()
    @Column()
    title: string;

    @IsString()
    @IsNotEmpty()
    @Column({ default: '' })
    description: string;

    // @ApiQuery({ name: 'role', enum: TaskStatus })
    @IsEnum(TaskStatus)
    @IsAlphanumeric()
    @IsNotEmpty()
    @Column({ name: 'status', type: 'enum', enum: TaskStatus, enumName: 'status', default: TaskStatus.OPEN })
    status: TaskStatus;

    @ManyToOne(type => UserEntity, user => user.tasks, { eager: false })
    user: UserEntity;

    @Column()
    userId: string;

}