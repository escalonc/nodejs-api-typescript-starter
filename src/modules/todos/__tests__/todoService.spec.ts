import TodoRepository from "../todoRepository";

jest.mock("../todoRepository");

const mockRepository: jest.Mocked<TodoRepository> = new TodoRepository() as any;
mockRepository.find.mockImplementation(
  () =>
    new Promise(resolve =>
      resolve([{id: 1, name: "Go to meet"}, {id: 2, name: "Example"}])
    )
);

test("getAll returns a collection of todos", async () => {
  const data = await mockRepository.find();
  expect(data).toStrictEqual([
    {id: 1, name: "Go to meet"},
    {id: 2, name: "Example"},
  ]);
});
