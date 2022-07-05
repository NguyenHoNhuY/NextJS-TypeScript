import AdminLayout from '@/components/layout/admin';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
// import dynamic from 'next/dynamic'

// const Header = dynamic(() => import('@/components/common/header'), { ssr: false })

export interface AboutPageProps {}

export default function AboutPage(props: AboutPageProps) {
    const router = useRouter();

    return <div></div>;
}

AboutPage.Layout = AdminLayout;
