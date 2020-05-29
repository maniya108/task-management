import { AuthModule } from '@controllers/auth/auth.module';
import { UserModule } from '@controllers/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConnectionService } from '@services/db-connection.service';
import { LoggingInterceptor } from '@interceptors/logging.interceptor';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from '@filters/http-error.filter';
import { TaskModule } from './controllers/task/task.module';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './controllers/terminus/health.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DbConnectionService
    }),
    AuthModule,
    UserModule,
    TaskModule,
    TerminusModule
  ],
  controllers: [
  HealthController],
  providers: [
    DbConnectionService,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    // { provide: APP_INTERCEPTOR, useClass: DataInterceptor },
    { provide: APP_FILTER, useClass: HttpErrorFilter },
  ],
})
export class AppModule { }
