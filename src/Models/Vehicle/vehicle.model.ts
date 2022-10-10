import {
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('vehicle')
export class Vehicle {
  @PrimaryGeneratedColumn('increment')
    id: number;

  @Column()
    model: string;

  @Column()
    brand: string;

  @Column({ name: 'license_plate' })
    licensePlate: string;

  @Column()
    color: string;

  @Column()
    chassi: string;

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

  constructor(vehicle: any) {
    Object.assign(this, vehicle);
  }
}
