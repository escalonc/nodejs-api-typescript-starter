import {createConnection, getConnection, getRepository} from "typeorm";
import TodoEntity from "../todoEntity";

beforeEach(() => {
  return createConnection({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [TodoEntity],
    synchronize: true,
    logging: false,
  });
});

afterEach(() => {
  let conn = getConnection();
  return conn.close();
});

jest.mock("../todoRepository");

test("getAll returns a collection of todos", async () => {
  await getRepository(TodoEntity).insert({
    name: "Rafael Sequeiros",
  });
  const data = await getRepository(TodoEntity).find();
  expect(data).toEqual([{id: 1, name: "Rafael Sequeiros"}]);
});
