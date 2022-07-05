import { authApi } from 'api-client';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAuth } from '../hooks';

export default function LoginPage() {
    const router = useRouter();
    const { profile, login, logout } = useAuth({
        revalidateOnMount: false,
    });

    const handleLogin = async () => {
        try {
            await login();
            console.log('login');
            router.push('/about');
        } catch (error) {
            console.log('failed to login', error);
        }
    };
    const handleLogout = async () => {
        try {
            await logout();
            console.log('logout');
            router.push('login');
        } catch (error) {
            console.log('failed to logout', error);
        }
    };
    // const handleGetProfile = async () => {
    //     try {
    //         await authApi.getProfile();
    //     } catch (error) {
    //         console.log('failed to get profile', error);
    //     }
    // };

    return (
        <div>
            <h1>Login Page</h1>
            <p>Profile:{JSON.stringify(profile || {}, null, 4)}</p>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout}>Logout</button>
            {/* <button onClick={handleGetProfile}>Get Profile</button> */}
        </div>
    );
}
