import { GetServerSideProps, GetStaticProps } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import PostContent from '../../components/posts/post-detail/post-content';
import { DUMMY_POSTS } from '../../data';
import { getPostData, getSlugs } from '../../helpers/post-util';
import { IPost } from '../../types';

type Props = {
  post: IPost;
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

function PostDetailPage({ post }: Props) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={post} />;
    </>
  );
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { slug } = context.params!;

  const data = getPostData(slug);
  return {
    props: {
      post: data,
    },
    revalidate: 600,
  };
};

export const getStaticPaths = async () => {
  const slugs = getSlugs();
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
};

export default PostDetailPage;
