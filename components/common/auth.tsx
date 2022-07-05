import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export interface AuthProps {
    children: any;
}

export default function Auth({ children }: AuthProps) {
    const { profile, firstLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!firstLoading && !(profile as any)?.username) router.push('/login');
    }, [router, profile, firstLoading]);

    if (!(profile as any)?.username) return <p>Loading...</p>;

    return <div>{children}</div>;
}
