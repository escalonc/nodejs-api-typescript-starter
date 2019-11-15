import { Length } from "class-validator";

export default class CreateTodoModel {
  @Length(10, 50)
  public name: string;
}
