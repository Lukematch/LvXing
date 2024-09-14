import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hobby {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  hobbyName: string;

  @Column()
  hobbyDescription: string;

  @Column()
  hobbyIcon: string;
}
