import { useAuth } from '@/hooks/useAuth';
import { LayoutProps } from '@/models/common';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import Auth from '../common/auth';

export default function AdminLayout({ children }: LayoutProps) {
    const { logout, profile } = useAuth();
    const router = useRouter();
    const handleLogout = async () => {
        try {
            await logout();
            console.log('logout');
            router.push('/login');
        } catch (error) {
            console.log('failed to logout', error);
        }
    };
    return (
        <Auth>
            <h1>Admin Layout</h1>
            <div>Sidebar</div>

            <p>Profile:{JSON.stringify(profile)} </p>

            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>

            <Link href="/">
                <a>Home</a>
            </Link>

            <Link href="/about">
                <a>About</a>
            </Link>

            <div>{children}</div>
        </Auth>
    );
}
