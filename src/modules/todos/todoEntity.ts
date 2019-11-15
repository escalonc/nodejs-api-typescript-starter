// import BaseEntity from "common/BaseEntity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("todo")
export default class TodoEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public name: string;
}
