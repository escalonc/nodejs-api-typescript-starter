import TodoRepository from '../todoRepository';
import TodoService from '../todoService';
import ConnectionFactory from '../../../data/factories/defaultConnectionFactory';
import { getCustomRepository, Connection } from 'typeorm';

// jest.mock('../todoRepository');
let connectionFactory = new ConnectionFactory();

// const mockRepository: jest.Mocked<TodoRepository> = new TodoRepository() as any;
// mockRepository.find.mockImplementation(
//   () =>
//     new Promise(resolve =>
//       resolve([
//         { id: 1, name: 'Go to meet' },
//         { id: 2, name: 'Example' }
//       ])
//     )
// );

let connection: Connection;

beforeEach(async () => {
  connection = await connectionFactory.create();
});

afterEach(async () => {
  if (connection) connection.close();
});

test('getAll returns a collection of todos', async () => {
  const todoRepository = getCustomRepository(TodoRepository);
  todoRepository.create({ id: 1, name: 'Go to meet' });
  const todoService = new TodoService(todoRepository);
  const data = await todoService.getAllTodos();

  expect(data).toStrictEqual({ id: 1, name: 'Go to meet' });
});
