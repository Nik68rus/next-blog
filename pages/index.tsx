import Head from 'next/head';
import React from 'react';
import FeaturedPosts from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';
import { getFeaturedPosts } from '../helpers/post-util';
import { IPost } from '../types';

type Props = {
  posts: IPost[];
};

function HomePage({ posts }: Props) {
  return (
    <>
      <Head>
        <title>NextJS Blog - Home</title>
        <meta name="description" content="Blog developed with NextJS" />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
}

export const getStaticProps = async () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
};
export default HomePage;
