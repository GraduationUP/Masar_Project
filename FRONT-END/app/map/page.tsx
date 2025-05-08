'use client'

import dynamic from 'next/dynamic';
const GazaMap = dynamic(() => import('@/components/map'), { ssr: false });

export default function MapPage() {
    return(
        <GazaMap />
    )
}