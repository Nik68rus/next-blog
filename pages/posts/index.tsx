import React from 'react';
import AllPosts from '../../components/posts/all-posts';
import { DUMMY_POSTS } from '../../data';
import { getAllPosts } from '../../helpers/post-util';
import { IPost } from '../../types';

type Props = { posts: IPost[] };

function AllPostsPage({ posts }: Props) {
  return <AllPosts posts={posts} />;
}

export const getStaticProps = async () => {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
};

export default AllPostsPage;
