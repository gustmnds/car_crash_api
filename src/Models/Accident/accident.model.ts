import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Client } from '../Client/client.model';
import { UserAccident } from '../UserAccident/userAccident.model';
import { Vehicle } from '../Vehicle/vehicle.model';

@Entity('accident')
export class Accident {
  @PrimaryGeneratedColumn('increment')
    id: number;

  @Column()
    description: string;

  @ManyToOne(() => Vehicle, { cascade: true })
  @JoinColumn({ name: 'vehicle_id' })
    vehicle: Vehicle;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
    client: Client;

  @Exclude()
  @Column({ name: 'client_id' })
    clientId: number;

  @OneToMany(() => UserAccident, (userAccident) => userAccident.accident, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id', referencedColumnName: 'accident_id' })
    thirds: UserAccident[];

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

  constructor(accident: any) {
    Object.assign(this, accident);
  }
}
