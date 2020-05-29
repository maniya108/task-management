import { AuthModule } from '@controllers/auth/auth.module';
import { TaskEntity } from '@entities/task.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity]),
    AuthModule
  ],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule { }
