import React from 'react';
import { IPost } from '../../types';
import PostsGrid from '../posts/posts-grid';
import classes from './featured-posts.module.css';

type Props = {
  posts: IPost[];
};

function FeaturedPosts({ posts }: Props) {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
}

export default FeaturedPosts;
