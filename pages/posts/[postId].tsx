import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface PostListPageProps {
    post: any;
}

export default function PostListPage(props: PostListPageProps) {
    const router = useRouter();
    const { post } = props;
    if (!post) null;
    return (
        <div>
            <h1>Post detail page</h1>

            <p>{post.id}</p>
            <p>{post.author}</p>
            <p>{post.description}</p>
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const response: any = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');
    const data: any = await response.json();

    //* paths co bao nhieu item thi call bay nhieu lan getStaticProps
    const listPaths = data.data.map((x: any) => ({ parmas: { postId: x.id } }));
    console.log(listPaths);
    return {
        paths: data.data.map((x: any) => ({ params: { postId: x.id } })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<PostListPageProps> = async (
    context: GetStaticPropsContext
) => {
    //* server-side
    //* this funtion run at build time

    const postId = context.params?.postId;
    if (!postId) {
        return {
            notFound: true,
        };
    }

    const response: any = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`);
    const data: any = await response.json();

    return {
        props: {
            post: data,
        },
    };
};
