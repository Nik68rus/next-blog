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

export interface IMessageBody {
  email: string;
  name: string;
  message: string;
}

export interface INotification {
  title: string;
  message: string;
  status: 'success' | 'error' | 'pending';
}
