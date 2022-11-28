import React from 'react';
import ReactMarkdown from 'react-markdown';
import { IPost } from '../../../types';
import classes from './post-content.module.css';
import PostHeader from './post-header';

type Props = {
  post: IPost;
};

function PostContent({ post }: Props) {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;
  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
