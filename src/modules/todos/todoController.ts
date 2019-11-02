import {Body, Get, HttpCode, JsonController, Post} from 'routing-controllers';
import CreateTodoModel from './models/createTodoModel';
import TodoEntity from './todoEntity';
import TodoService from './todoService';

@JsonController('/todos')
export default class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  public async getAll() {
    const data = await this.todoService.getAllTodos();
    return data;
  }

  @Post()
  @HttpCode(201)
  public async post(@Body() todo: CreateTodoModel) {
    const entity: TodoEntity = {id: 0, name: todo.name};
    const createdTodo = await this.todoService.create(entity);

    return createdTodo;
  }
}
