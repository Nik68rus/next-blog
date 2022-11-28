export interface IPostPreview {
  slug: string;
  title: string;
  image: string;
  date: string;
  excerpt: string;
}

export interface IPost extends IPostPreview {
  content: string;
}
