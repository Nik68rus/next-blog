import Image from 'next/image';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { IPost } from '../../../types';
import classes from './post-content.module.css';
import PostHeader from './post-header';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type Props = {
  post: IPost;
};

function PostContent({ post }: Props) {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;
  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown
        components={{
          // img: ({ src, alt, width, height }) => (
          //   <Image
          //     src={`/images/posts/${post.slug}/${src}`}
          //     alt={alt || 'Image'}
          //     width={900}
          //     height={450}
          //   />
          // ),
          p: (paragraph) => {
            const { node } = paragraph;
            const child = node.children[0] as unknown as HTMLElement;
            if (child.tagName === 'img') {
              return (
                <div className={classes.image}>
                  <Image
                    //@ts-ignore
                    src={`/images/posts/${post.slug}/${child.properties.src}`}
                    //@ts-ignore
                    alt={child.properties.alt || 'Image'}
                    width={600}
                    height={300}
                  />
                </div>
              );
            }
            return <p>{paragraph.children}</p>;
          },
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                //@ts-ignore
                style={atomDark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {post.content}
      </ReactMarkdown>
    </article>
  );
}

export default PostContent;
