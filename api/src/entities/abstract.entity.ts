import { IsBoolean } from 'class-validator';
import { BaseEntity, Column, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';


export abstract class AbstractEntity extends BaseEntity {

    @CreateDateColumn({ name: 'created_date', type: 'timestamptz' })
    createdDate: Date;

    @UpdateDateColumn({ name: 'updated_date', type: 'timestamptz' })
    updatedDate: Date;

    @VersionColumn()
    version: number;

    @IsBoolean()
    @Column({ default: true, name: 'is_active' })
    isActive: boolean;

}