import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddLikesFieldToPosts1591046456146
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'posts',
      new TableColumn({
        name: 'likes',
        type: 'int',
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('posts', 'likes');
  }
}
