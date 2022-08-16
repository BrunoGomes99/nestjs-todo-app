import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entity/todo.entity';

@Injectable()
export class TodoService {

    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>
    ) {}

    public async findAll() {
        return await this.todoRepository.find();
    }

    public async findOneById(id: string) {
        try{
            return await this.todoRepository.findOneByOrFail({id: id});
        } catch (error){
            throw new NotFoundException(error.message);
        }
    }

    public async create(body: CreateTodoDto) {
        return await this.todoRepository.save(this.todoRepository.create(body)); // O create cria uma nova instancia da entidade Todo e o save salva essa entidade no banco
    }

    public async update(id: string, body: UpdateTodoDto) {        
        const todo = await this.findOneById(id);
        
        this.todoRepository.merge(todo, body); // Faz o merge entre o item buscado no banco com as novas informações passadas no body
        return await this.todoRepository.save(todo);
    }

    public async deleteById(id: string) {
        await this.findOneById(id);
        await this.todoRepository.softDelete(id);
    }
}
