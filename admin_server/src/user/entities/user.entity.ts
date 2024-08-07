import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import encry from '../../utils/crypto';
import * as crypto from 'crypto';

@Entity()
export class User {
  @PrimaryColumn()
  id: string

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
  roles: string

  @Column({nullable: true})
  salt: string

  @CreateDateColumn(
    // { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }
    )
  createTime: Date

  @UpdateDateColumn(
    // { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }
    )
  updateTime: Date

  @BeforeInsert()
  beforeInsert() {
    this.salt = crypto.randomBytes(4).toString('base64')
    this.password = encry(this.password, this.salt)
  }

}
