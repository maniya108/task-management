import { CreateTaskDto, FilterTaskDto, UpdateTaskDto } from '@dtos/task.dto';
import { TaskEntity } from '@entities/task.entity';
import { UserEntity } from '@entities/user.entity';
import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, FindConditions, Like, Repository } from 'typeorm';

@Injectable()
export class TaskService {

    private logger = new Logger('TaskService');

    constructor(
        @InjectRepository(TaskEntity) private readonly taskRepository: Repository<TaskEntity>
    ) { }

    async createTask(user: UserEntity, createTaskDto: CreateTaskDto): Promise<TaskEntity> {
        try {

            const task = this.taskRepository.create(createTaskDto);
            task.user = user;

            await task.save();
            delete task.user;

            return task;

        } catch (error) {
            this.logger.error(`Failed to create a task for user "${user.id}". Data: ${JSON.stringify(createTaskDto)}`, error.stack);
            throw new InternalServerErrorException();
        }
    }

    async getTask(id: string, filterTaskDto: FilterTaskDto): Promise<TaskEntity[]> {

        const { search, status } = filterTaskDto;
        const makeFindOptions: FindConditions<TaskEntity> = {};

        makeFindOptions.userId = id;

        if (search) {
            makeFindOptions.title = Like(`%${search}%`)
        }

        if (status) {
            makeFindOptions.status = Equal(status)
        }

        try {
            const task = await this.taskRepository.find(makeFindOptions);
            return await task;

        } catch (error) {
            this.logger.error(`Failed to get tasks for user "${id}". Filters: ${JSON.stringify(filterTaskDto)}`, error.stack);
            throw new InternalServerErrorException();
        }
    }

    async getTaskById(id: string, userId: string): Promise<TaskEntity> {

        const found = await this.taskRepository.findOne({ where: { id, userId } });

        if (!found) {
            throw new NotFoundException(`"${id}" was not found`);
        }

        return found;
    }

    async updateTaskById(id: string, userId, updateTaskDto: UpdateTaskDto): Promise<TaskEntity | undefined> {

        const task = this.getTaskById(id, userId);

        if (task) {
            const updated = await this.taskRepository.update(id, updateTaskDto);
            if (updated.affected === 0) {
                throw new NotFoundException(`"${id}" was not found`);
            }
            console.log(updated, 'updated')
            return await this.getTaskById(id, userId);
        }
    }

    async deleteTaskById(id: string, userId: string): Promise<void> {

        const result = await this.taskRepository.delete({ id, userId })

        if (result.affected === 0) {
            throw new NotFoundException(`"${id} was not found`);
        }
    }
}
