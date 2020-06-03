import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddFollowersFieldToUsers1591049924675
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'followers',
        type: 'int',
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'followers');
  }
}
