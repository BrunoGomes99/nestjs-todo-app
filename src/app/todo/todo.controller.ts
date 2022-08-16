import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { ReturnSuccessSwagger } from './swagger/return-success.swagger';
import { BadRequestSwagger } from './swagger/bad-request.swagger';
import { NotFoundSwagger } from './swagger/not-found.swagger';

@Controller('api/todos')
@ApiTags('ToDo')
export class TodoController {

    constructor (private readonly todoService: TodoService) {}

    @Get()
    @ApiOperation({summary: 'Lista todas as tarefas'})
    @ApiResponse({status: 200, description: 'Listagem de tarefas executada com sucesso', type: ReturnSuccessSwagger, isArray: true})
    public async index() {
        return await this.todoService.findAll();
    }

    @Get(':id')
    @ApiOperation({summary: 'Busca uma tarefa pelo seu id'})
    @ApiResponse({status: 200, description: 'Tarefa retornada com sucesso', type: ReturnSuccessSwagger})
    @ApiResponse({status: 404, description: 'Tarefa não encontrada', type: NotFoundSwagger})
    public async getById(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.todoService.findOneById(id);
    }

    @Post()
    @ApiOperation({summary: 'Cria uma tarefa'})
    @ApiResponse({status: 201, description: 'Tarefa criada com sucesso', type: ReturnSuccessSwagger})
    @ApiResponse({status: 400, description: 'Parâmetros inválidos', type: BadRequestSwagger})
    public async create(@Body() body: CreateTodoDto) {
        return await this.todoService.create(body);
    }

    @Put(':id')
    @ApiOperation({summary: 'Altera uma tarefa'})
    @ApiResponse({status: 201, description: 'Tarefa alterada com sucesso', type: ReturnSuccessSwagger})
    @ApiResponse({status: 404, description: 'Tarefa não encontrada', type: NotFoundSwagger})
    public async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateTodoDto) {
        return await this.todoService.update(id, body);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Deleta uma tarefa'})
    @ApiResponse({status: 204, description: 'Tarefa removida com sucesso'})
    @ApiResponse({status: 404, description: 'Tarefa não encontrada', type: NotFoundSwagger})
    @HttpCode(HttpStatus.NO_CONTENT)
    public async delete(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.todoService.deleteById(id);
    }
}
