import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class vehicle1665019482282 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'vehicle',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'model',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'brand',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'license_plate',
          type: 'varchar',
          length: '255',
          isUnique: true,
        },
        {
          name: 'color',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'chassi',
          type: 'varchar',
          length: '255',
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
    await queryRunner.dropTable('vehicle');
  }
}
