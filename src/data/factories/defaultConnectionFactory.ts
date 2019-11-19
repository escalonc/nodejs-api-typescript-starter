import {createConnection} from "typeorm";
import DatabaseConnectionFactory from "./databaseConnectionFactory";
import {Service} from "typedi";

@Service()
export default class DefaultConnectionFactory
  implements DatabaseConnectionFactory {
  async create() {
    return await createConnection();
  }
}
