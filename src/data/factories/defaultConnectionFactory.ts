import { createConnection } from 'typeorm';
import DatabaseConnectionFactory from './databaseConnectionFactory';
import { Service } from 'typedi';
import config from '../../config';

@Service()
export default class DefaultConnectionFactory
  implements DatabaseConnectionFactory {
  async create() {
    return await createConnection({
      type: config.DATABASE_TYPE,
      host: config.DATABASE_HOST,
      port: config.DATABASE_PORT,
      username: config.DATABASE_USERNAME,
      password: config.DATABASE_PASSWORD,
      database: config.DATABASE_NAME,
      entities: config.ENTITIES_PATH,
      migrations: config.MIGRATIONS,
      synchronize: config.DATABASE_SYNCHRONIZE ?? false,
      dropSchema: config.DATABASE_DROP_SCHEMA ?? false
    });
  }
}
