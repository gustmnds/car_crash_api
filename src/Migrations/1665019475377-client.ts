import type { MigrationInterface, QueryRunner } from 'typeorm';
import { Table } from 'typeorm';

export class client1665019475377 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'client',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'email',
          type: 'varchar',
          length: '255',
          isUnique: true,
        },
        {
          name: 'password',
          type: 'varchar',
          length: '72',
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
    await queryRunner.dropTable('client');
  }
}
