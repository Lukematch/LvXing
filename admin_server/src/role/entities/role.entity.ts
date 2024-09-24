import { Permission } from "src/permission/entities/permission.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column({nullable: true})
  name: string;

  @Column({nullable: true})
  code: string;

  @CreateDateColumn({nullable: true})
  createTime: Date;

  @UpdateDateColumn({nullable: true})
  updateTime: Date;

  @ManyToMany(() => Permission)
  @JoinTable({
    // 自定义关联表名
    name: 'role_permission_relation'
  })
  permissions: Permission[];
}
