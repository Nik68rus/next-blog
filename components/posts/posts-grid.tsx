import React from 'react';
import type { IPost } from '../../types';
import PostItem from './post-item';
import classes from './posts-grid.module.css';

type Props = {
  posts: IPost[];
};

function PostsGrid({ posts }: Props) {
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}

export default PostsGrid;
