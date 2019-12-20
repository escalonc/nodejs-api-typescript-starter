import { EntityRepository, Repository } from 'typeorm';
import TodoEntity from './todoEntity';

import { Service } from 'typedi';

@Service()
@EntityRepository(TodoEntity)
export default class TodoRepository extends Repository<TodoEntity> {}
