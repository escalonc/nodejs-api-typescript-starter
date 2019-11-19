import {createConnection} from "typeorm";
import DatabaseConnectionFactory from "./databaseConnectionFactory";
import {Service} from "typedi";
import config from "../../config";

@Service()
export default class DefaultConnectionFactory
  implements DatabaseConnectionFactory {
  async create() {
    return await createConnection({
      type: "postgres",
      host: "localhost",
      port: 3306,
      username: "test",
      password: "test",
      database: "test",
    });
  }
}
