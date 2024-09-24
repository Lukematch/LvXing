import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 20, nullable: true})
  menuName: string;

  @Column({nullable: true})
  //排序
  orderNum: number;

  @Column({ nullable: true })
  //父id
  parentId: number;

  @Column({length: 10, nullable: true})
  menuType: string;

  @Column({length: 50,nullable: true})
  //菜单图标
  icon: string;

  @Column({length: 50, nullable: true})
  //组件路径
  component: string;

  @Column({length: 50, nullable: true})
  //路由
  path: string;

  @Column({length: 50,nullable: true})
  createBy: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
