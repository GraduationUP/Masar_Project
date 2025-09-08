"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, Search, ShoppingBag } from "lucide-react";
import Header from "@/components/main_layout/header";
import PageTitle from "@/components/main_layout/PageTitle";
import PageBanner from "@/components/main_layout/PageBanner";

interface StoreItem {
  id: number;
  name: string;
  description: string;
  photo: string | null;
  category_id: number;
  price: string;
  latitude: string | null;
  longitude: string | null;
  show_location: number;
  created_at: string;
  updated_at: string;
  store: {
    id: number;
    user_id: number;
    store_name: string;
    id_card_photo: string;
    phone: string;
    location_address: string;
    status: number;
    created_at: string;
    updated_at: string;
    latitude: string;
    longitude: string;
  };
  // Add a category name to the StoreItem interface for easier access
  category_name: string;
}

interface ApiResponse {
  status: boolean;
  data: StoreItem[];
}

interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export default function MarketplacePage() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const [products, setProducts] = useState<StoreItem[]>([]); // Initialize as an array of StoreItem
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [availableCategories, setAvailableCategories] = useState<Category[]>(
    []
  );
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch products
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/guest/products`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json: ApiResponse = await response.json(); // Cast to ApiResponse
        if (json.status) {
          // Map category_id to category_name
          const productsWithCategoryNames = json.data.map((product) => {
            const category = availableCategories.find(
              (cat) => cat.id === product.category_id
            );
            return {
              ...product,
              category_name: category ? category.name : "Uncategorized",
            };
          });
          setProducts(productsWithCategoryNames);
        } else {
          console.error("API returned status false:", json);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [API_BASE_URL, availableCategories]); // Re-run when availableCategories changes

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/guest/categories`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        if (json.status) {
          setAvailableCategories(json.data);
        } else {
          console.error("API returned status false for categories:", json);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, [API_BASE_URL]);

  const allCategories = [
    ...new Set(availableCategories.map((category) => category.name)),
  ].sort();

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesCategory = categoryFilter === "" || categoryFilter === "all";

    if (!matchesCategory && categoryFilter !== "") {
      const selectedCategory = availableCategories.find(
        (cat) => cat.name.toLowerCase() === categoryFilter.toLowerCase()
      );

      if (selectedCategory) {
        matchesCategory = product.category_id === selectedCategory.id;
      } else {
        matchesCategory = false;
      }
    }

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "newest") {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sortBy === "price-low") {
      return Number(a.price) - Number(b.price);
    } else if (sortBy === "price-high") {
      return Number(b.price) - Number(a.price);
    }
    return 0;
  });

  const getStoreName = (product: StoreItem) => {
    return product.store ? product.store.store_name : "Unknown Store";
  };

  return (
    <>
      <Header />
      <PageBanner>
        تسوق، استمتع، اختر، استرخِ!
      </PageBanner>
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col gap-6">
          <PageTitle
            MainTitle="السوق"
            Subtitle="تصفح البضائع من الباعة المحليين"
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>تصفية نتائج البحث</CardTitle>
                  <CardDescription>قم بتحسين بحثك عن المنتجات</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="search">ابحث</Label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search"
                        type="search"
                        placeholder="ابحث عن بضائع..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">القسم</Label>
                    <Select
                      value={categoryFilter}
                      onValueChange={setCategoryFilter}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="جميع الأقسام" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">جميع الأقسام</SelectItem>
                        {allCategories.map((category) => (
                          <SelectItem
                            key={category}
                            value={category.toLowerCase()}
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sort">ترتيب بواسطة</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger id="sort">
                        <SelectValue placeholder="ترتيب بواسطة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">الأحدث</SelectItem>
                        <SelectItem value="price-low">
                          السعر: الأقل الى الأعلى
                        </SelectItem>
                        <SelectItem value="price-high">
                          السعر: الأعلى للأقل
                        </SelectItem>
                        {/* Removed "rating" since there's no rating data in your StoreItem interface */}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSearchQuery("");
                        setCategoryFilter("");
                        setSortBy("newest");
                      }}
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      اعادة ضبط الفلتر
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-3">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="mobile-sort" className="sr-only">
                    رتب
                  </Label>
                  <Select
                    value={sortBy}
                    onValueChange={setSortBy}
                  >
                    <SelectTrigger id="mobile-sort" className="w-[180px]">
                      <SelectValue placeholder="ترتيب بواسطة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">الأحدث</SelectItem>
                      <SelectItem value="price-low">
                        السعر: الأقل الى الأعلى
                      </SelectItem>
                      <SelectItem value="price-high">
                        السعر: الأعلى الى الأقل
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-lg font-medium">جارٍ تحميل البضائع...</p>
                </div>
              ) : sortedProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">لا يوجد أي بضاعة</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    حاول تعديل بحثك أو فلترتك للعثور على ما تبحث عنه.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => (
                    <Link href={`/products/${product.id}`} key={product.id}>
                      <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                        <div className="relative h-48 w-full">
                          <img
                            // Use product.photo, and provide a fallback if it's null
                            src={product.photo || "/boxes.png"}
                            alt={product.name}
                            className="h-full w-full object-contain"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-background/80 hover:bg-background/80 backdrop-blur-sm text-foreground">
                              {/* Use the new category_name property */}
                              {product.category_name}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="text-lg font-bold">{product.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <span className="font-bold">
                              {/* Ensure price is formatted as a number for toFixed */}
                              ₪{Number(product.price).toFixed(2)}
                            </span>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 border-t">
                          <span className="text-xs text-muted-foreground">
                            {/* Pass the product object to getStoreName */}
                            {getStoreName(product)}
                          </span>
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
    </>
  );
}
