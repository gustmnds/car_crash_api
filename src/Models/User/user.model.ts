import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Transform } from 'class-transformer';
import { Address } from '../Address/address.model';
import { Client } from '../Client/client.model';
import { Accident } from '../Accident/accident.model';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
    id: number;

  @Column()
    name: string;

  @Column({ unique: true })
    cpf: string;

  @Column()
    birthdate: Date;

  @Column({ name: 'phone_number' })
    phone: string;

  @ManyToMany(() => Accident, (accident) => accident.thirds)
    thirdAccidents: Accident[];

  @OneToOne(() => Client, { cascade: true })
  @JoinColumn({ name: 'client_id' })
  @Transform((param) => new Client(param.value), { toPlainOnly: true })
    client: Client;

  @OneToOne(() => Address, { cascade: true })
  @JoinColumn({ name: 'address_id' })
  @Transform((param) => new Address(param.value), { toPlainOnly: true })
    address?: Address;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

  constructor(user: any) {
    Object.assign(this, user);
  }
}
