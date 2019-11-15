import { Length } from "class-validator";

export default class CreateTodoModel {
  @Length(5, 20)
  public name: string;
}
