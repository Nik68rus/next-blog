import React from 'react';
import FeaturedPosts from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';

type Props = {};

function HomePage({}: Props) {
  return (
    <>
      <Hero />
      <FeaturedPosts />
    </>
  );
}

export default HomePage;
