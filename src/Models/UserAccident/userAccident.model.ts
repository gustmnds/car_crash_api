import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Accident } from '../Accident/accident.model';
import { User } from '../User/user.model';

@Entity('user_accident')
export class UserAccident {
  @PrimaryGeneratedColumn('increment')
    id: number;

  @Column({ name: 'user_id' })
    userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
    user: User;

  @ManyToOne(() => Accident)
  @JoinColumn({ name: 'accident_id' })
    accident: Accident;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  constructor(userAccident: any) {
    Object.assign(this, userAccident);
  }
}
