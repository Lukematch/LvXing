import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column(
      { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }
      )
    createTime: Date

    @Column(
      { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }
      )
    updateTime: Date

}
