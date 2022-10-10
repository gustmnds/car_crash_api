import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import * as bcryptjs from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { User } from '../User/user.model';

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn('increment')
    id: number;

  @Column({ unique: true })
    email: string;

  @Exclude()
  @Column()
    password: string;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

  constructor(client: any) {
    Object.assign(this, client);
  }

  public comparePassword(password: string) {
    return bcryptjs.compare(password, this.password);
  }
}
