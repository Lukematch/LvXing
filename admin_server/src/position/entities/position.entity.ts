import { createHash } from "crypto";
import { BeforeInsert, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Position {
  @PrimaryColumn()
  // 编号
  id: string;

  @Column()
  // 岗位名称
  name: string;

  @Column({comment: '父级id', nullable: true})
  parent_id: string;

  @Column({nullable: true})
  // 所属组织
  affiliated_org: string;

  @Column({nullable: true})
  // 状态
  status: string;

  @Column({nullable: true})
  // 负责人
  leader: string;

  @Column({nullable: true})
  // 排序
  sort: string;

  @Column({nullable: true})
  // 描述
  description: string;

  @Column({nullable: true})
  create_time: Date;

  @Column({nullable: true})
  update_time: Date;
}
