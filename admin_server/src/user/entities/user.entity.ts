import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import encry from '../../utils/crypto';
import * as crypto from 'crypto';
import { Role } from "src/role/entities/role.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({nullable: true})
  username: string

  @Column({nullable: true})
  password: string

  @Column({nullable: true})
  nickName: string

  @Column({nullable: true})
  avatar: string

  @Column({nullable: true})
  email: string

  @Column({nullable: true})
  role: string

  @Column({nullable: true})
  salt: string

  @Column(
    { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }
    )
  createTime: Date

  @Column(
    { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }
    )
  updateTime: Date

  @BeforeInsert()
  beforeInsert() {
    this.salt = crypto.randomBytes(4).toString('base64')
    this.password = encry(this.password, this.salt)
  }

  // 关联Role表 多对多
  // @ManyToMany(() => Role)
  // @JoinTable({
  //   name: 'user_role_relation'
  // })
  // role: Role[]

}
