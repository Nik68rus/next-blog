import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

interface PostMeta {
  title: string;
  date: string;
  image: string;
  excerpt: string;
  isFeatured: boolean;
}

const getPostData = (fileName: string) => {
  const filePath = path.join(postsDirectory, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const data = matter(fileContent).data as PostMeta;
  const content = matter(fileContent).content;

  const postSlug = fileName.replace(/\.md$/, ''); //removes extension

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
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
