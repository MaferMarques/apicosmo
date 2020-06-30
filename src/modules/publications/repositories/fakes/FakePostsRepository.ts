import IPostsRepository from '@modules/publications/repositories/IPostsRepository';
import ICreatePostDTO from '@modules/publications/dtos/ICreatePostDTO';

import Post from '@modules/publications/infra/typeorm/entities/Post';

import { uuid } from 'uuidv4';

class FakeUsersRepository implements IPostsRepository {
  private posts: Post[] = [];

  public async create({ content, user_id }: ICreatePostDTO): Promise<Post> {
    const post = new Post();

    post.content = content;
    post.id = uuid();
    post.user_id = user_id;
    post.comments = 0;

    this.posts.push(post);

    return post;
  }

  public async findByID(id: string): Promise<Post | undefined> {
    const foundPost = this.posts.find((post) => post.id === id);

    return foundPost;
  }

  public async save(post: Post): Promise<Post> {
    const findIndex = this.posts.findIndex(
      (foundPost) => foundPost.id === post.id,
    );

    this.posts[findIndex] = post;

    return post;
  }

  public async findAll(): Promise<Post[]> {
    return this.posts;
  }

  public async findByUserID(id: string): Promise<Post[] | undefined> {
    const foundPosts = this.posts.filter((post) => post.user_id === id);

    return foundPosts;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.posts.findIndex((post) => post.id === id);

    this.posts.splice(findIndex, 1);
  }

  // public async findAllByFollowedUsersId(
  //   users_ids: string[],
  // ): Promise<Post[] | undefined> {
  //   let foundPosts: Post[];

  //   const posts = users_ids.map((user_id) =>
  //     this.findByUserID(user_id).then((postsByUserId) => {
  //       if (postsByUserId) {
  //         return postsByUserId.map((post) => foundPosts.push(post));
  //       }
  //       return undefined;
  //     }),
  //   );

  //   if (!posts) {
  //     return undefined;
  //   }

  //   return posts;
  // }
}

export default FakeUsersRepository;
