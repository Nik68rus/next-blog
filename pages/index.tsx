import React from 'react';
import FeaturedPosts from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';
import { DUMMY_POSTS } from '../data';
import { IPost } from '../types';

type Props = {};

function HomePage({}: Props) {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={DUMMY_POSTS} />
    </>
  );
}

export default HomePage;
