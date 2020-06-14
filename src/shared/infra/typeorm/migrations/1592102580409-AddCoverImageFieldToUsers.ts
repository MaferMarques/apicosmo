import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddCoverImageFieldToUsers1592102580409
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'cover_image',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'cover_image');
  }
}
