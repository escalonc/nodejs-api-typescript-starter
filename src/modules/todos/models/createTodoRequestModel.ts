import {Length} from 'class-validator';

export default class CreateTodoRequestModel {
  @Length(5, 20)
  public name: string;
}
