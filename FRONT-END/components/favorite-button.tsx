"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"

interface FavoriteButtonProps {
  itemId: string
  itemType: "store" | "product"
  initialFavorite?: boolean
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export default function FavoriteButton({
  itemId,
  itemType,
  initialFavorite = false,
  variant = "outline",
  size = "icon",
  className = "",
}: FavoriteButtonProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isFavorite, setIsFavorite] = useState(initialFavorite)
  const [isLoading, setIsLoading] = useState(false)

  // Load favorite status from localStorage on mount
  useEffect(() => {
    if (!user) return

    const key = `masar_favorites_${itemType}_${user.id}`
    const storedFavorites = localStorage.getItem(key)

    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites)
      setIsFavorite(favorites.includes(itemId))
    }
  }, [itemId, itemType, user])

  const toggleFavorite = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save favorites",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const key = `masar_favorites_${itemType}_${user.id}`
      const storedFavorites = localStorage.getItem(key)
      let favorites = storedFavorites ? JSON.parse(storedFavorites) : []

      if (isFavorite) {
        // Remove from favorites
        favorites = favorites.filter((id: string) => id !== itemId)
        toast({
          title: "Removed from favorites",
          description: `${itemType.charAt(0).toUpperCase() + itemType.slice(1)} removed from your favorites`,
        })
      } else {
        // Add to favorites
        favorites.push(itemId)
        toast({
          title: "Added to favorites",
          description: `${itemType.charAt(0).toUpperCase() + itemType.slice(1)} added to your favorites`,
        })
      }

      localStorage.setItem(key, JSON.stringify(favorites))
      setIsFavorite(!isFavorite)
      setIsLoading(false)
    }, 500)
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={`rounded-full ${className}`}
      onClick={toggleFavorite}
      disabled={isLoading}
      aria-label={isFavorite ? `Remove from favorites` : `Add to favorites`}
    >
      <Heart className={`h-[1.2em] w-[1.2em] ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
    </Button>
  )
}
