import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class accident1665019493730 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'accident',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'description',
          type: 'text',
        },
        {
          name: 'vehicle_id',
          type: 'int',
        },
        {
          name: 'client_id',
          type: 'int',
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
      foreignKeys: [
        {
          name: 'FK_vehicle_id_accident',
          columnNames: ['vehicle_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'vehicle',
          onDelete: 'SET NULL',
        },
        {
          name: 'FK_client_id_accident',
          columnNames: ['client_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'client',
          onDelete: 'SET NULL',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('accident');
  }
}
