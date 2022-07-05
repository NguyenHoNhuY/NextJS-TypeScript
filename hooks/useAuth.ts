import { authApi } from 'api-client';
import axios from 'axios';
import useSWR from 'swr';
import { PublicConfiguration } from 'swr/dist/types';

export const useAuth = (options?: Partial<PublicConfiguration>) => {
    const {
        data: profile,
        error,
        mutate,
    } = useSWR('/profile', {
        dedupingInterval: 60 * 60 * 1000, //* 1hr
        revalidateOnFocus: false,
        ...options,
    });
    const firstLoading = profile === undefined && error === undefined;

    const login = async () => {
        await authApi.login({
            username: 'test1',
            password: '123123',
        });

        await mutate();
    };

    const logout = async () => {
        await authApi.logout();
        mutate(null, false);
    };

    return {
        profile,
        error,
        login,
        logout,
        firstLoading,
    };
};
