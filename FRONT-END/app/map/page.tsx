'use client'

import dynamic from 'next/dynamic';
const GazaMap = dynamic(() => import('@/components/map'), { ssr: false });

export const metadata = {
    title: "مسار | الخريطة",
    description: "المنصة الفلسطينية الأولى لمساعدة المتضريين من الحرب",
}

export default function MapPage() {
    return(
        <GazaMap />
    )
}