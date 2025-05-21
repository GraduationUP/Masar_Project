"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  BarChart3,
  Check,
  ChevronRight,
  Clock,
  Edit,
  ExternalLink,
  Eye,
  ImageIcon,
  Loader2,
  MapPin,
  Package,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"
import {
  type Product,
  type Store,
  getProductsByStore,
  getStoreById,
  updateStore,
  deleteProduct,
  addProduct,
  updateProduct,
} from "@/lib/storage-utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function StoreManagementPage() {
  const { id } = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [store, setStore] = useState<Store | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)
  const [editedStore, setEditedStore] = useState<Partial<Store>>({})
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Redirect if not logged in or not a seller
  useEffect(() => {
    if (user && user.role !== "seller") {
      router.push("/")
    }
  }, [user, router])

  useEffect(() => {
    // Initialize storage with mock data
    const initStorage = async () => {
      const { initializeStorage } = await import("@/lib/storage-utils")
      initializeStorage()

      if (typeof id === "string") {
        // Get store details
        const storeData = getStoreById(id)
        if (storeData) {
          // Check if user is the owner of this store
          if (user && storeData.ownerId !== user.id) {
            router.push("/seller/dashboard")
            return
          }

          setStore(storeData)
          setEditedStore(storeData)

          // Get store products
          const storeProducts = getProductsByStore(id)
          setProducts(storeProducts)
        } else {
          // Store not found, redirect to 404
          router.push("/not-found")
        }
      }

      setLoading(false)
    }

    if (user) {
      initStorage()
    }
  }, [id, router, user])

  const handleStoreUpdate = () => {
    setIsProcessing(true)

    setTimeout(() => {
      if (store && editedStore) {
        const updatedStore = updateStore(store.id, editedStore)
        if (updatedStore) {
          setStore(updatedStore)
          setIsEditing(false)
          toast({
            title: "Store updated",
            description: "Your store information has been updated successfully.",
          })
        }
      }
      setIsProcessing(false)
    }, 1000)
  }

  const handleProductUpdate = (product: Product) => {
    setIsProcessing(true)

    setTimeout(() => {
      if (selectedProduct) {
        const updatedProduct = updateProduct(selectedProduct.id, product)
        if (updatedProduct) {
          setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)))
          setSelectedProduct(null)
          setIsProductDialogOpen(false)
          toast({
            title: "Product updated",
            description: "Your product has been updated successfully.",
          })
        }
      } else {
        // Add new product
        if (store) {
          const newProduct = addProduct({
            ...product,
            storeId: store.id,
            inStock: true,
            rating: undefined,
            reviews: [],
            location: store.location,
          })
          setProducts([...products, newProduct])
          setIsProductDialogOpen(false)
          toast({
            title: "Product added",
            description: "Your product has been added successfully.",
          })
        }
      }
      setIsProcessing(false)
    }, 1000)
  }

  const handleProductDelete = () => {
    setIsProcessing(true)

    setTimeout(() => {
      if (selectedProduct) {
        const isDeleted = deleteProduct(selectedProduct.id)
        if (isDeleted) {
          setProducts(products.filter((p) => p.id !== selectedProduct.id))
          setSelectedProduct(null)
          setIsDeleteDialogOpen(false)
          toast({
            title: "Product deleted",
            description: "Your product has been deleted successfully.",
          })
        }
      }
      setIsProcessing(false)
    }, 1000)
  }

  if (loading) {
    return (
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Loading store information...</p>
        </div>
      </div>
    )
  }

  if (!store || !user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col gap-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-muted-foreground">
          <Link href="/seller/dashboard" className="hover:text-primary transition-colors">
            Dashboard
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/seller/stores" className="hover:text-primary transition-colors">
            My Stores
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-foreground font-medium truncate">{store.name}</span>
        </nav>

        {/* Store Header */}
        <div className="relative h-48 md:h-64 w-full rounded-xl overflow-hidden shadow-md">
          <img src={store.coverImage || "/placeholder.svg"} alt={store.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent flex items-end">
            <div className="p-6 flex items-center gap-4">
              <div className="bg-background rounded-full p-1 shadow-lg">
                <img
                  src={store.logo || "/placeholder.svg"}
                  alt={`${store.name} logo`}
                  className="h-16 w-16 rounded-full border-2 border-background"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{store.name}</h1>
                  <Badge variant={store.rating && store.rating > 4.5 ? "default" : "secondary"} className="ml-2">
                    {store.rating ? `${store.rating.toFixed(1)} ★` : "New"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    Seller Dashboard
                  </Badge>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{store.location.address}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm" className="rounded-full">
                  <Link href={`/stores/${store.id}`} target="_blank">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Link>
                </Button>
                <Button size="sm" className="rounded-full">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Store
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Store Management Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 rounded-lg mb-6">
            <TabsTrigger value="overview" className="rounded-md">
              Overview
            </TabsTrigger>
            <TabsTrigger value="products" className="rounded-md">
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="rounded-md">
              Orders
            </TabsTrigger>
            <TabsTrigger value="settings" className="rounded-md">
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Store Performance</CardTitle>
                    <CardDescription>View your store's performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex flex-col p-4 bg-muted/30 rounded-lg">
                        <span className="text-sm text-muted-foreground">Total Products</span>
                        <span className="text-2xl font-bold">{products.length}</span>
                        <span className="text-xs text-green-500 mt-1">+2 this week</span>
                      </div>
                      <div className="flex flex-col p-4 bg-muted/30 rounded-lg">
                        <span className="text-sm text-muted-foreground">Store Views</span>
                        <span className="text-2xl font-bold">324</span>
                        <span className="text-xs text-green-500 mt-1">+18% this month</span>
                      </div>
                      <div className="flex flex-col p-4 bg-muted/30 rounded-lg">
                        <span className="text-sm text-muted-foreground">Total Orders</span>
                        <span className="text-2xl font-bold">28</span>
                        <span className="text-xs text-green-500 mt-1">+5 this week</span>
                      </div>
                    </div>
                    <div className="mt-6 h-64 flex items-center justify-center border rounded-lg">
                      <div className="flex flex-col items-center text-center p-6">
                        <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">Performance Analytics</h3>
                        <p className="text-sm text-muted-foreground mt-1 max-w-md">
                          Detailed analytics showing your store's performance over time, including views, orders, and
                          revenue.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Products</CardTitle>
                    <CardDescription>Your most recently added products</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {products.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-6 text-center">
                        <Package className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">No products yet</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Add your first product to start selling on Masar.
                        </p>
                        <Button
                          className="mt-4 rounded-full"
                          onClick={() => {
                            setSelectedProduct(null)
                            setIsProductDialogOpen(true)
                          }}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Product
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {products.slice(0, 5).map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="h-16 w-16 rounded-md overflow-hidden">
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium truncate">{product.name}</h4>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Badge variant="outline" className="text-xs">
                                  {product.category}
                                </Badge>
                                <span>•</span>
                                <span>${product.price.toFixed(2)}</span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="rounded-full"
                              onClick={() => {
                                setSelectedProduct(product)
                                setIsProductDialogOpen(true)
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  {products.length > 0 && (
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full rounded-full"
                        onClick={() => setActiveTab("products")}
                      >
                        View All Products
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      className="w-full justify-start rounded-lg"
                      onClick={() => {
                        setSelectedProduct(null)
                        setIsProductDialogOpen(true)
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Product
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start rounded-lg"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Store Details
                    </Button>
                    <Button variant="outline" className="w-full justify-start rounded-lg" asChild>
                      <Link href={`/stores/${store.id}`} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Public Store
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Store Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="text-sm font-medium">Store is active</span>
                      </div>
                      <Switch checked={true} />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Today's Hours</h4>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {
                            store.openingHours[
                              ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][
                                new Date().getDay()
                              ] as keyof typeof store.openingHours
                            ]
                          }
                        </span>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Store Address</h4>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{store.location.address}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="animate-fade-in">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Products Management</CardTitle>
                  <CardDescription>Manage your store's products</CardDescription>
                </div>
                <Button
                  className="rounded-full"
                  onClick={() => {
                    setSelectedProduct(null)
                    setIsProductDialogOpen(true)
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </CardHeader>
              <CardContent>
                {products.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Package className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No products yet</h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-md">
                      Start adding products to your store to begin selling on Masar.
                    </p>
                    <Button
                      className="mt-6 rounded-full"
                      onClick={() => {
                        setSelectedProduct(null)
                        setIsProductDialogOpen(true)
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Your First Product
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <Input placeholder="Search products..." className="max-w-sm rounded-lg" />
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px] rounded-lg">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {Array.from(new Set(products.map((p) => p.category))).map((category) => (
                            <SelectItem key={category} value={category.toLowerCase()}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium text-sm">
                        <div className="col-span-5">Product</div>
                        <div className="col-span-2">Price</div>
                        <div className="col-span-2">Category</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-1">Actions</div>
                      </div>
                      <div className="divide-y">
                        {products.map((product) => (
                          <div
                            key={product.id}
                            className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/30 transition-colors"
                          >
                            <div className="col-span-5 flex items-center gap-3">
                              <div className="h-12 w-12 rounded-md overflow-hidden">
                                <img
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-medium truncate">{product.name}</h4>
                                <p className="text-xs text-muted-foreground truncate">{product.description}</p>
                              </div>
                            </div>
                            <div className="col-span-2 font-medium">${product.price.toFixed(2)}</div>
                            <div className="col-span-2">
                              <Badge variant="outline">{product.category}</Badge>
                            </div>
                            <div className="col-span-2">
                              <Badge variant={product.inStock ? "default" : "destructive"}>
                                {product.inStock ? "In Stock" : "Out of Stock"}
                              </Badge>
                            </div>
                            <div className="col-span-1 flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => {
                                  setSelectedProduct(product)
                                  setIsProductDialogOpen(true)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full text-destructive hover:text-destructive"
                                onClick={() => {
                                  setSelectedProduct(product)
                                  setIsDeleteDialogOpen(true)
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Orders Management</CardTitle>
                <CardDescription>View and manage customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No orders yet</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-md">
                    When customers place orders from your store, they will appear here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Store Information</CardTitle>
                    <CardDescription>Manage your store details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="store-name">Store Name</Label>
                          <Input
                            id="store-name"
                            value={editedStore.name || ""}
                            onChange={(e) => setEditedStore({ ...editedStore, name: e.target.value })}
                            disabled={!isEditing}
                            className="rounded-lg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="store-email">Contact Email</Label>
                          <Input
                            id="store-email"
                            value={editedStore.contactInfo?.email || ""}
                            onChange={(e) =>
                              setEditedStore({
                                ...editedStore,
                                contactInfo: { ...editedStore.contactInfo, email: e.target.value },
                              })
                            }
                            disabled={!isEditing}
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="store-phone">Contact Phone</Label>
                          <Input
                            id="store-phone"
                            value={editedStore.contactInfo?.phone || ""}
                            onChange={(e) =>
                              setEditedStore({
                                ...editedStore,
                                contactInfo: { ...editedStore.contactInfo, phone: e.target.value },
                              })
                            }
                            disabled={!isEditing}
                            className="rounded-lg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="store-website">Website (Optional)</Label>
                          <Input
                            id="store-website"
                            value={editedStore.contactInfo?.website || ""}
                            onChange={(e) =>
                              setEditedStore({
                                ...editedStore,
                                contactInfo: { ...editedStore.contactInfo, website: e.target.value },
                              })
                            }
                            disabled={!isEditing}
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="store-address">Store Address</Label>
                        <Input
                          id="store-address"
                          value={editedStore.location?.address || ""}
                          onChange={(e) =>
                            setEditedStore({
                              ...editedStore,
                              location: { ...editedStore.location, address: e.target.value },
                            })
                          }
                          disabled={!isEditing}
                          className="rounded-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="store-description">Store Description</Label>
                        <Textarea
                          id="store-description"
                          value={editedStore.description || ""}
                          onChange={(e) => setEditedStore({ ...editedStore, description: e.target.value })}
                          disabled={!isEditing}
                          className="min-h-[120px] rounded-lg"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {isEditing ? (
                      <>
                        <Button
                          variant="outline"
                          className="rounded-full"
                          onClick={() => {
                            setEditedStore(store)
                            setIsEditing(false)
                          }}
                        >
                          Cancel
                        </Button>
                        <Button className="rounded-full" onClick={handleStoreUpdate} disabled={isProcessing}>
                          {isProcessing ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              Save Changes
                            </>
                          )}
                        </Button>
                      </>
                    ) : (
                      <Button className="ml-auto rounded-full" onClick={() => setIsEditing(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Information
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Store Assets</CardTitle>
                    <CardDescription>Manage your store images</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Store Logo</Label>
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full overflow-hidden border">
                          <img
                            src={store.logo || "/placeholder.svg"}
                            alt="Store logo"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <Button variant="outline" size="sm" className="rounded-full" disabled={!isEditing}>
                          <ImageIcon className="mr-2 h-4 w-4" />
                          Change Logo
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Cover Image</Label>
                      <div className="rounded-lg overflow-hidden border h-32">
                        <img
                          src={store.coverImage || "/placeholder.svg"}
                          alt="Store cover"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <Button variant="outline" size="sm" className="rounded-full mt-2" disabled={!isEditing}>
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Change Cover
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Danger Zone</CardTitle>
                    <CardDescription>Irreversible actions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border border-destructive/20 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Deactivate Store</h4>
                          <p className="text-sm text-muted-foreground">
                            Temporarily hide your store from the marketplace
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="text-destructive border-destructive/50 hover:bg-destructive/10 rounded-full"
                        >
                          Deactivate
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 border border-destructive/20 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Delete Store</h4>
                          <p className="text-sm text-muted-foreground">
                            Permanently delete your store and all its data
                          </p>
                        </div>
                        <Button variant="destructive" className="rounded-full">
                          Delete Store
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Product Dialog */}
      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>
              {selectedProduct
                ? "Update your product information below"
                : "Fill in the details to add a new product to your store"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input id="product-name" defaultValue={selectedProduct?.name || ""} className="rounded-lg" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-price">Price ($)</Label>
                <Input
                  id="product-price"
                  type="number"
                  step="0.01"
                  defaultValue={selectedProduct?.price || ""}
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-category">Category</Label>
              <Select defaultValue={selectedProduct?.category || ""}>
                <SelectTrigger id="product-category" className="rounded-lg">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {store.categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-description">Description</Label>
              <Textarea
                id="product-description"
                defaultValue={selectedProduct?.description || ""}
                className="min-h-[100px] rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product-image">Product Image</Label>
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-md overflow-hidden border bg-muted/50">
                  <img
                    src={selectedProduct?.image || "/placeholder.svg"}
                    alt="Product"
                    className="h-full w-full object-cover"
                  />
                </div>
                <Button variant="outline" className="rounded-full">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="product-stock" className="flex-1">
                In Stock
              </Label>
              <Switch id="product-stock" defaultChecked={selectedProduct?.inStock ?? true} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="rounded-full" onClick={() => setIsProductDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="rounded-full"
              onClick={() =>
                handleProductUpdate({
                  id: selectedProduct?.id || "",
                  name: (document.getElementById("product-name") as HTMLInputElement).value,
                  price: Number.parseFloat((document.getElementById("product-price") as HTMLInputElement).value),
                  category: (document.querySelector("[id^='product-category']") as HTMLSelectElement).value,
                  description: (document.getElementById("product-description") as HTMLTextAreaElement).value,
                  image: selectedProduct?.image || "/assorted-products-display.png",
                  storeId: store.id,
                  createdAt: selectedProduct?.createdAt || new Date().toISOString(),
                  inStock: (document.getElementById("product-stock") as HTMLInputElement).checked,
                  location: selectedProduct?.location || store.location,
                })
              }
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {selectedProduct ? "Updating..." : "Adding..."}
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  {selectedProduct ? "Update Product" : "Add Product"}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-4 py-4">
            <div className="h-16 w-16 rounded-md overflow-hidden">
              <img
                src={selectedProduct?.image || "/placeholder.svg"}
                alt={selectedProduct?.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-medium">{selectedProduct?.name}</h4>
              <p className="text-sm text-muted-foreground">{selectedProduct?.category}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="rounded-full" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="rounded-full"
              onClick={handleProductDelete}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Product
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
