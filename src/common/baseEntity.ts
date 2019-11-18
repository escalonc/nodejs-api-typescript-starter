import {Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export default class BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;
}
