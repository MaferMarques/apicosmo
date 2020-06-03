import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('follows')
class Follow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  follower_id: string;

  @CreateDateColumn()
  created_at: Date;
}

export default Follow;
