import { User } from '@controllers/auth/user.decorator';
import { CreateTaskDto, FilterTaskDto, UpdateTaskDto } from '@dtos/task.dto';
import { TaskEntity } from '@entities/task.entity';
import { UserEntity } from '@entities/user.entity';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { TaskStatus } from '@models/task.enum';
import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Query,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiCreatedResponse,
    ApiHeader,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOperation,
    ApiParam,
    ApiProduces,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';

import { TaskService } from './task.service';

@ApiTags('TaskController')
@ApiBearerAuth()
@ApiHeader({
    name: 'Content-Type',
    description: 'application/json',
})
@Controller('task')
@UseGuards(JwtAuthGuard)
export class TaskController {

    private logger = new Logger('TasksController');

    constructor(
        private readonly taskService: TaskService
    ) { }

    @ApiBody({ type: CreateTaskDto })
    @ApiConsumes('application/json')
    @ApiProduces('application/json')
    @ApiOperation({ summary: 'createTask', description: 'To create a new task' })
    @ApiCreatedResponse({ type: TaskEntity, description: 'The task has been successfully created.' })
    @ApiInternalServerErrorResponse({ description: 'Contact your  system admin' })
    @Post()
    createTask(
        @User() user: UserEntity,
        @Body(ValidationPipe) createTaskDto: CreateTaskDto
    ): Promise<TaskEntity> {
        this.logger.verbose(`User "${user.id}" creating a new task. Data: ${JSON.stringify(createTaskDto)}`);
        return this.taskService.createTask(user, createTaskDto);
    }

    @ApiQuery({ name: 'search', type: String, allowEmptyValue: true, required: false, example: 'abc', description: 'It allows to search title', style: 'form', explode: true })
    @ApiQuery({ name: 'status', type: String, allowEmptyValue: true, required: false, example: TaskStatus.OPEN, description: 'It allows to filter status', style: 'form', explode: true })
    @ApiOperation({ summary: 'getTask', description: 'To get all the task and based on the search criteria' })
    @ApiCreatedResponse({ type: TaskEntity, description: 'The task has been loaded successfully.' })
    @ApiInternalServerErrorResponse({ description: 'Contact your  system admin' })
    @Get()
    getTask(
        @User('id', ParseUUIDPipe) id: string,
        @Query(ValidationPipe) filterTaskDto: FilterTaskDto
    ): Promise<TaskEntity[]> {
        this.logger.verbose(`User "${id}" retrieving all tasks. Filters: ${JSON.stringify(filterTaskDto)}`);
        return this.taskService.getTask(id, filterTaskDto);
    }

    @ApiParam({ name: 'id', type: String, allowEmptyValue: false, required: true, example: 'b4db499a-d1d9-49f5-99a7-23c04f083b05', description: 'It allows to search title', style: 'simple', explode: false })
    @ApiOperation({ summary: 'getTaskById', description: 'To get task and based on the task id' })
    @ApiCreatedResponse({ type: TaskEntity, description: 'The task has been loaded successfully.' })
    @ApiNotFoundResponse({ description: 'Task id was not found' })
    @ApiInternalServerErrorResponse({ description: 'Contact your  system admin' })
    @Get('/:id')
    getTaskById(
        @User('id', ParseUUIDPipe) userId: string,
        @Param('id', ParseUUIDPipe) id: string
    ): Promise<TaskEntity> {
        return this.taskService.getTaskById(id, userId);
    }

    @ApiParam({ name: 'id', type: String, allowEmptyValue: false, required: true, example: 'b4db499a-d1d9-49f5-99a7-23c04f083b05', description: 'It allows to search title', style: 'simple', explode: false })
    @ApiBody({ type: UpdateTaskDto })
    @ApiOperation({ summary: 'updateTaskById', description: 'To update the task based on the task id' })
    @ApiCreatedResponse({ type: TaskEntity, description: 'The task has been updated successfully.' })
    @ApiNotFoundResponse({ description: 'Task id was not found' })
    @ApiInternalServerErrorResponse({ description: 'Contact your  system admin' })
    @Patch('/:id')
    updateTaskById(
        @User('id', ParseUUIDPipe) userId: string,
        @Param('id', ParseUUIDPipe) id: string,
        @Body(ValidationPipe) updateTaskDto: UpdateTaskDto
    ): Promise<TaskEntity | undefined> {
        return this.taskService.updateTaskById(id, userId, updateTaskDto);
    }

    @ApiParam({ name: 'id', type: String, allowEmptyValue: false, required: true, example: 'b4db499a-d1d9-49f5-99a7-23c04f083b05', description: 'It allows to search title', style: 'simple', explode: false })
    @ApiOperation({ summary: 'deleteTaskById', description: 'To delate the task based on the task id' })
    @ApiCreatedResponse({ description: 'The task has been updated successfully.' })
    @ApiNotFoundResponse({ description: 'Task id was not found' })
    @ApiInternalServerErrorResponse({ description: 'Contact your  system admin' })
    @Delete('/:id')
    deleteTaskById(
        @User('id', ParseUUIDPipe) userId: string,
        @Param('id', ParseUUIDPipe) id: string
    ): Promise<void> {
        return this.taskService.deleteTaskById(id, userId);
    }

}
