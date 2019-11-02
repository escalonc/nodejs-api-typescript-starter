import signale from 'signale';
import {Service} from 'typedi';
import {InjectRepository} from 'typeorm-typedi-extensions';
import TodoEntity from './todoEntity';
import TodoRepository from './todoRepository';

@Service()
export default class TodoService {
  constructor(@InjectRepository() private todoRepository: TodoRepository) {}

  public async getAllTodos() {
    const todos = await this.todoRepository.find();
    return todos;
  }

  public async create(todo: TodoEntity) {
    try {
      const createdTodo = await this.todoRepository.save(todo);
      return createdTodo;
    } catch (error) {
      signale.error(error);
    }
  }
}
