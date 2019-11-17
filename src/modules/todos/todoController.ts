import {Body, Get, HttpCode, JsonController, Post} from 'routing-controllers';
import CreateTodoRequestModel from './models/createTodoRequestModel';
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
  public async post(@Body() todo: CreateTodoRequestModel) {
    const entity: TodoEntity = {name: todo.name};
    const createdTodo = await this.todoService.create(entity);

    return createdTodo;
  }
}
