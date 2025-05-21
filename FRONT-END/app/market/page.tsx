"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badg"
import { Filter, Search, ShoppingBag, Star } from "lucide-react"

export default function MarketplacePage() {
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "Product 1",
      description: "This is a product",
      price: 10.99,
      rating: 4.5,
      category: "Electronics",
      storeId: "1",
      image: "/product1.jpg",
      createdAt: "2023-10-01T10:00:00Z",
    },
    {
      id: "2",
      name: "Product 2",
      description: "This is another product",
      price: 9.99,
      rating: 4.2,
      category: "Electronics",
      storeId: "2",
      image: "/product2.jpg",
      createdAt: "2023-10-02T10:00:00Z",
    },
  ])
  const [stores, setStores] = useState([
    {
      id: "1",
      name: "Store 1",
    },
    {
      id: "2",
      name: "Store 2",
    },
  ])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  useEffect(() => {
    setProducts([...products])
    setStores([...stores])
  }, [])

  // Get all available categories
  const allCategories = [...new Set(products.map((product) => product.category))].sort()

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "" || product.category.toLowerCase() === categoryFilter.toLowerCase()

    return matchesSearch && matchesCategory
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortBy === "price-low") {
      return a.price - b.price
    } else if (sortBy === "price-high") {
      return b.price - a.price
    } else if (sortBy === "rating") {
      return (b.rating || 0) - (a.rating || 0)
    }
    return 0
  })

  // Get store name by ID
  const getStoreName = (storeId: string) => {
    const store = stores.find((s) => s.id === storeId)
    return store ? store.name : "Unknown Store"
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
          <p className="text-muted-foreground">Browse products from local sellers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
                <CardDescription>Refine your product search</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      type="search"
                      placeholder="Search products..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {allCategories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sort">Sort By</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger id="sort">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSearchQuery("")
                      setCategoryFilter("")
                      setSortBy("newest")
                    }}
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Reset Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-muted-foreground">Showing {sortedProducts.length} products</p>
              <div className="flex items-center gap-2">
                <Label htmlFor="mobile-sort" className="sr-only">
                  Sort
                </Label>
                <Select value={sortBy} onValueChange={setSortBy} className="md:hidden">
                  <SelectTrigger id="mobile-sort" className="w-[180px]">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {sortedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No products found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your search or filter to find what you&apos;re looking for.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <Link href={`/products/${product.id}`} key={product.id}>
                    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                      <div className="relative h-48 w-full">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-background/80 hover:bg-background/80 backdrop-blur-sm text-foreground">
                            {product.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-bold">{product.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="font-bold">${product.price.toFixed(2)}</span>
                          {product.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 border-t">
                        <span className="text-xs text-muted-foreground">{getStoreName(product.storeId)}</span>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

