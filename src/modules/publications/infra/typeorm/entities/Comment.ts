import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('comments')
class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  post_id: string;

  @Column()
  content: string;

  @Column('int')
  type: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Comment;
