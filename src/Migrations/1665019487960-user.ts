import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class user1665019487960 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'user',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
          length: '255',
        },
        {
          name: 'cpf',
          type: 'varchar',
          length: '11',
          isUnique: true,
        },
        {
          name: 'birthdate',
          type: 'date',
          isNullable: true,
        },
        {
          name: 'phone_number',
          type: 'varchar',
          length: '15',
          isNullable: true,
        },
        {
          name: 'client_id',
          type: 'int',
          isNullable: true,
          isUnique: true,
        },
        {
          name: 'address_id',
          type: 'int',
          isNullable: true,
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
          name: 'FK_client_id_user',
          columnNames: ['client_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'client',
          onDelete: 'SET NULL',
        },
        {
          name: 'FK_address_id_user',
          columnNames: ['address_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'address',
          onDelete: 'SET NULL',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropDatabase('user');
  }
}
