import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'todos'}) // o parâmetro 'name' informa o nome da tabela
export class Todo {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string;

    @Column()
    @ApiProperty()
    task: string;

    @Column({name: 'is_done', type: 'tinyint', width: 1}) // Width: 1 = 1 dígito no máx
    @ApiProperty()
    isDone: number;

    @CreateDateColumn({name: 'created_at'})
    @ApiProperty()
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    @ApiProperty()
    updatedAt: Date;

    @DeleteDateColumn({name: 'deleted_at'})
    @ApiProperty()
    deletedAt: Date;
}