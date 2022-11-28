import React from 'react';
import PostContent from '../../components/posts/post-detail/post-content';
import { DUMMY_POSTS } from '../../data';

type Props = {};

function PostDetailPage({}: Props) {
  return <PostContent post={DUMMY_POSTS[0]} />;
}

export default PostDetailPage;
