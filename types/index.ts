export interface IPostMeta {
  title: string;
  date: string;
  image: string;
  excerpt: string;
  isFeatured: boolean;
}
export interface IPostPreview extends IPostMeta {
  slug: string;
}

export interface IPost extends IPostPreview {
  content: string;
}
