import type { MigrationInterface, QueryRunner } from 'typeorm';
import { Table } from 'typeorm';

export class address1665019455480 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'address',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'zip',
          type: 'int',
        },
        {
          name: 'street',
          type: 'varchar',
          length: '100',
        },
        {
          name: 'city',
          type: 'varchar',
          length: '50',
        },
        {
          name: 'state',
          type: 'varchar',
          length: '100',
        },
        {
          name: 'country',
          type: 'varchar',
          length: '100',
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('address');
  }
}
