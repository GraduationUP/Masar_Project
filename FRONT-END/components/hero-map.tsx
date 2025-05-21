"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import the map component to avoid SSR issues
const MapWithNoSSR = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-muted/30 animate-pulse flex items-center justify-center">
      <p className="text-muted-foreground">Loading map...</p>
    </div>
  ),
})

export default function HeroMap() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <MapWithNoSSR
      center={[31.9539, 35.9106]}
      zoom={13}
      markers={[
        { position: [31.9539, 35.9106], title: "Fresh Market", type: "store" },
        { position: [31.9639, 35.9306], title: "City Gas Station", type: "gas" },
        { position: [31.9739, 35.9206], title: "Community Pharmacy", type: "medical" },
        { position: [31.9839, 35.9406], title: "Emergency Medical Center", type: "emergency" },
      ]}
      interactive={false}
    />
  )
}
