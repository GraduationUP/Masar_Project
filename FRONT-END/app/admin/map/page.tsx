"use client"

import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"

// Dynamically import the map component to avoid SSR issues
const GazaMap = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-muted/30 animate-pulse flex items-center justify-center">
      <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
      <span className="sr-only">جار تحميل الخريطة...</span>
    </div>
  ),
})

export default function AdminMapPage() {
  
  return (
    <div className="container px-4 md:px-6 py-8 section-padding">
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">خريطة الخدمات التفاعلية</h1>
        <p className="text-muted-foreground text-lg">استكشف الخدمات والمتاجر في محيطك</p>
      </div>
      <GazaMap />
    </div>
  )
}
