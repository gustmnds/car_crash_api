import {
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn('increment')
    id: number;

  @Column()
    zip: string;

  @Column()
    street: string;

  @Column()
    city: string;

  @Column()
    state: string;

  @Column()
    country: string;

  @CreateDateColumn()
    created_at: Date;

  @UpdateDateColumn()
    updated_at: Date;

  constructor(address: any) {
    Object.assign(this, address);
  }
}
