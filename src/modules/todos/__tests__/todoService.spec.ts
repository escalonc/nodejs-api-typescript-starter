import TodoRepository from '../todoRepository';
import TodoService from '../todoService';
import ConnectionFactory from '../../../data/factories/defaultConnectionFactory';
import { Connection } from 'typeorm';

let connectionFactory = new ConnectionFactory();
let connection: Connection;

beforeEach(async () => {
  connection = await connectionFactory.create();
});

afterEach(async () => {
  if (connection) connection.close();
});

test('getAll returns a collection of todos', async () => {
  const todoRepository = connection.getCustomRepository(TodoRepository);
  todoRepository.insert({ id: 1, name: 'Go to meet' });
  const todoService = new TodoService(todoRepository);
  const data = await todoService.getAllTodos();

  expect(data).toEqual([{ id: 1, name: 'Go to meet' }]);
});
