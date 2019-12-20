import { Connection } from 'typeorm';
export default interface DatabaseConnectionFactory {
  create(): Promise<Connection>;
}
