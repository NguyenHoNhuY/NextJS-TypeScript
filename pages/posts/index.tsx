import { GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import * as React from 'react';

export interface PostPageProps {
    posts: any[];
}

export default function PostPage(props: PostPageProps) {
    const { posts } = props;
    return (
        <div>
            <h1>Post Page</h1>
            <ul>
                {posts.map((x) => (
                    <li key={x.id}>
                        <Link href={`/posts/${x.id}`}>
                            <a>{x.title}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export const getStaticProps: GetStaticProps<PostPageProps> = async (
    context: GetStaticPropsContext
) => {
    //* server-side
    //* this funtion run at build time
    const response: any = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
    const data: any = await response.json();
    console.log('data', data);

    return {
        props: {
            posts: data.data.map((x: any) => ({ id: x.id, title: x.title })),
        },
    };
};
