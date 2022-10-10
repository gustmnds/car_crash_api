import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class thirdAccident1665019502340 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'user_accident',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'user_id',
          type: 'int',
        },
        {
          name: 'accident_id',
          type: 'int',
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],
      foreignKeys: [
        {
          name: 'FK_accident_id_user_accident',
          columnNames: ['accident_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'accident',
          onDelete: 'CASCADE',
        },
        {
          name: 'FK_user_id_user_accident',
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'user',
          onDelete: 'SET NULL',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_accident');
  }
}
