import React from 'react';
import AllPosts from '../../components/posts/all-posts';
import { DUMMY_POSTS } from '../../data';

type Props = {};

function AllPostsPage({}: Props) {
  return <AllPosts posts={DUMMY_POSTS} />;
}

export default AllPostsPage;
