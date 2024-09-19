import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hobby {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  username: string;

  @Column({nullable: true})
  hobbyName: string;

  @Column({nullable: true})
  hobbyDescription: string;

  @Column({nullable: true})
  hobbyIcon: string;
}
