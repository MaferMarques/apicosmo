import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddCommentsFieldToPosts1591728503376
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'posts',
      new TableColumn({
        name: 'comments',
        type: 'int',
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('posts', 'comments');
  }
}
