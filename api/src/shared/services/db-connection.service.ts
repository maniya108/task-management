import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DbConnectionService implements TypeOrmOptionsFactory {

    // constructor() { }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            name: 'default',
            type: 'postgres',
            database: 'nest_task_mgmt',
            username: 'postgres',
            password: 'root',
            port: 5432,
            host: 'localhost',
            dropSchema: false,
            synchronize: true,
            entities: [
                __dirname + '/../**/*.entity.{js,ts}',
                'dist/**/*.entity.js'
            ],
            uuidExtension: 'pgcrypto',
            // cache: {
            //     type: 'redis',
            //     options: {
            //         host: 'localhost',
            //         port: 4000
            //     }
            // },
            // logger: 'file', // write all the query in log file
            // logging: ['error', 'query', 'migration'],
            maxQueryExecutionTime: 1000,
            cache: false,
            logger: 'advanced-console',
            logging: 'all',
            retryAttempts: 10,
            retryDelay: 10000
        }
    }
}
