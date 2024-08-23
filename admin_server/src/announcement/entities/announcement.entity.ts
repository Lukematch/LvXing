import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Announcement {
  @PrimaryColumn()
  id: number;

  @Column()
  Ids: number;

  @Column({nullable: true})
  title: string;

  @Column({nullable: true})
  content: string;

  @Column({nullable: true})
  topic: string;

  @Column({nullable: true})
  desc: string;

  @Column({nullable: true})
  status: string;

  @Column({nullable: true})
  remark: string;

  @Column(
    {nullable: true}
    // { type: 'int', default: () => 'UNIX_TIMESTAMP' }
  )
  create_time: number;

  @Column(
    {nullable: true}
    // { type: 'int', default: () => 'UNIX_TIMESTAMP' }
  )
  update_time: number;
}
