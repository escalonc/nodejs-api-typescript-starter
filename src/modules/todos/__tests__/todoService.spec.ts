import TodoRepository from "../todoRepository";
import TodoService from "../todoService";

jest.mock("../todoRepository");

const mockRepository: jest.Mocked<TodoRepository> = new TodoRepository() as any;
mockRepository.find.mockImplementation(
  () =>
    new Promise(resolve =>
      resolve([
        {id: 1, name: "Go to meet"},
        {id: 2, name: "Example"},
      ]),
    ),
);

test("getAll returns a collection of todos", async () => {
  const todoService = new TodoService(mockRepository);
  const data = await todoService.getAllTodos();
  expect(data).toStrictEqual([
    {id: 1, name: "Go to meet"},
    {id: 2, name: "Example"},
  ]);
});
