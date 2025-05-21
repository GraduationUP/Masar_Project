"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ChevronLeft, Loader2, Package, Upload } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { addProduct, getStoresByOwner } from "@/lib/storage-utils"
import type { Store } from "@/lib/storage-utils"

export default function NewProductPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const storeId = searchParams.get("storeId")
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [stores, setStores] = useState<Store[]>([])
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    storeId: storeId || "",
    image: "",
    inStock: true,
  })

  useEffect(() => {
    if (!user) return

    // Get seller's stores
    const sellerStores = getStoresByOwner(user.id)
    setStores(sellerStores)

    // If storeId is provided and valid, set it
    if (storeId && sellerStores.some((store) => store.id === storeId)) {
      setProductData((prev) => ({ ...prev, storeId }))
    } else if (sellerStores.length > 0) {
      // Otherwise set the first store as default
      setProductData((prev) => ({ ...prev, storeId: sellerStores[0].id }))
    }
  }, [user, storeId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in as a seller to add a product",
        variant: "destructive",
      })
      return
    }

    if (!productData.storeId) {
      toast({
        title: "Store required",
        description: "Please select a store for this product",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Get the selected store
    const store = stores.find((s) => s.id === productData.storeId)

    if (!store) {
      toast({
        title: "Invalid store",
        description: "The selected store does not exist",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Create new product
    const newProduct = {
      name: productData.name,
      description: productData.description,
      price: Number.parseFloat(productData.price) || 0,
      category: productData.category || store.categories[0],
      storeId: productData.storeId,
      image: productData.image || "/assorted-products-display.png",
      inStock: productData.inStock,
      location: store.location,
    }

    // Simulate API call
    setTimeout(() => {
      try {
        const product = addProduct(newProduct)

        toast({
          title: "Product added successfully",
          description: "Your new product has been added to your store",
        })

        // Redirect to store management page
        router.push(`/seller/stores/${productData.storeId}?tab=products`)
      } catch (error) {
        toast({
          title: "Error adding product",
          description: "There was an error adding your product. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }, 1500)
  }

  // Get categories from the selected store
  const selectedStore = stores.find((store) => store.id === productData.storeId)
  const storeCategories = selectedStore?.categories || []

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link href={productData.storeId ? `/seller/stores/${productData.storeId}` : "/seller/dashboard"}>
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
            <p className="text-muted-foreground">Add a product to your store</p>
          </div>
        </div>

        {stores.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Package className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No stores available</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-md">
                You need to create a store before you can add products.
              </p>
              <Button asChild className="mt-6 rounded-full">
                <Link href="/seller/stores/new">Create Store</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Information</CardTitle>
                    <CardDescription>Basic details about your product</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter your product name"
                        value={productData.name}
                        onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                        required
                        className="rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Product Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your product in detail"
                        value={productData.description}
                        onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                        required
                        className="min-h-[120px] rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price (USD) *</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          value={productData.price}
                          onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                          required
                          className="rounded-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={productData.category}
                          onValueChange={(value) => setProductData({ ...productData, category: value })}
                          required
                        >
                          <SelectTrigger id="category" className="rounded-lg">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {storeCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="store">Store *</Label>
                      <Select
                        value={productData.storeId}
                        onValueChange={(value) => setProductData({ ...productData, storeId: value })}
                        required
                      >
                        <SelectTrigger id="store" className="rounded-lg">
                          <SelectValue placeholder="Select a store" />
                        </SelectTrigger>
                        <SelectContent>
                          {stores.map((store) => (
                            <SelectItem key={store.id} value={store.id}>
                              {store.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="in-stock"
                        checked={productData.inStock}
                        onCheckedChange={(checked) => setProductData({ ...productData, inStock: checked })}
                      />
                      <Label htmlFor="in-stock">In Stock</Label>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Image</CardTitle>
                    <CardDescription>Upload an image for your product</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed rounded-lg p-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-40 w-full bg-muted/50 rounded-lg flex items-center justify-center overflow-hidden">
                          {productData.image ? (
                            <img
                              src={productData.image || "/placeholder.svg"}
                              alt="Product image preview"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Package className="h-12 w-12 text-muted-foreground" />
                          )}
                        </div>
                        <Button type="button" variant="outline" size="sm" className="rounded-full">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Image
                        </Button>
                        <p className="text-xs text-muted-foreground">Recommended: 800x800px</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Product Preview</CardTitle>
                    <CardDescription>How your product will appear</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border overflow-hidden">
                      <div className="h-48 bg-muted/50 relative">
                        {productData.image ? (
                          <img
                            src={productData.image || "/placeholder.svg"}
                            alt="Product preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <Package className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold">{productData.name || "Product Name"}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {productData.description || "Product description will appear here"}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold">${Number.parseFloat(productData.price || "0").toFixed(2)}</span>
                          <span className="text-xs bg-muted px-2 py-1 rounded-full">
                            {productData.category || (storeCategories.length > 0 ? storeCategories[0] : "Category")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button type="button" variant="outline" asChild className="rounded-full">
                <Link href={productData.storeId ? `/seller/stores/${productData.storeId}` : "/seller/dashboard"}>
                  Cancel
                </Link>
              </Button>
              <Button
                type="submit"
                className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding Product...
                  </>
                ) : (
                  <>
                    <Package className="mr-2 h-4 w-4" />
                    Add Product
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
