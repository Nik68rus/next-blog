import { IPost, IPostMeta } from './../types/index';
import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export const getPostData = (fileIdentifier: string) => {
  const postSlug = fileIdentifier.replace(/\.md$/, ''); //removes extension
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const data = matter(fileContent).data as IPostMeta;
  const content = matter(fileContent).content;

  const postData: IPost = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
};

export const getSlugs = () => {
  const postFiles = fs.readdirSync(postsDirectory);
  const postSlugs = postFiles.map((fileName) => fileName.replace(/\.md$/, '')); //removes extension
  return postSlugs;
};

export const getAllPosts = () => {
  const postFiles = fs.readdirSync(postsDirectory);

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((a, b) =>
    new Date(a.date) > new Date(b.date) ? -1 : 1
  );

  return sortedPosts;
};

export const getFeaturedPosts = () => {
  const posts = getAllPosts();

  return posts.filter((post) => post.isFeatured);
};
