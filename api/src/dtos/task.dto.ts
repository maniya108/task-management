import { TaskStatus } from '@models/task.enum';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {

    @ApiProperty({ name: 'title', description: 'title must be an string', example: 'abc', required: true, type: String, title: 'title of the task' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ name: 'description', description: 'description must be an string', example: 'abc', required: true, type: String, title: 'description of the task' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiPropertyOptional({ name: 'status', description: 'status is an optional field', enum: TaskStatus, enumName: 'TaskStatus', example: TaskStatus.OPEN, type: TaskStatus, title: 'status of the task' })
    @IsEnum(TaskStatus, { message: `status must be a ${Object.keys(TaskStatus)}` })
    @IsOptional()
    status: TaskStatus;
}

export class UpdateTaskDto {

    @ApiPropertyOptional({ name: 'description', default: '', description: 'description is an optional field', example: 'Abcd', type: String, title: 'description of the task' })
    @IsString()
    @IsOptional()
    description: string;

    @ApiPropertyOptional({ name: 'status', description: 'status is an optional field', enum: TaskStatus, enumName: 'TaskStatus', example: TaskStatus.OPEN, type: TaskStatus, title: 'status of the task' })
    @IsEnum(TaskStatus, { message: `status must be a ${Object.keys(TaskStatus)}` })
    @IsOptional()
    status: TaskStatus;
}

export class FilterTaskDto {

    @ApiPropertyOptional({ name: 'search', default: '', description: 'search is an optional field', example: 'Abcd', type: String, title: 'search of the task' })
    @IsString()
    @IsOptional()
    search: string;

    @ApiPropertyOptional({ name: 'status', description: 'status is an optional field', enum: TaskStatus, enumName: 'TaskStatus', example: TaskStatus.OPEN, type: TaskStatus, title: 'status of the task' })
    @IsEnum(TaskStatus, { message: `status must be a ${Object.keys(TaskStatus)}` })
    @IsOptional()
    status: TaskStatus;
}