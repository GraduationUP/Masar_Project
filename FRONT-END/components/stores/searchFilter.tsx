"use client";

import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "../ui/select";
import { Button } from "../ui/button";

interface Props {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  setExpandedStoreId: (val: any) => void;
}

export default function SearchFilter({
  searchQuery,
  sortBy,
  setSearchQuery,
  setSortBy,
  setExpandedStoreId,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>تصفية المتاجر</CardTitle>
        <CardDescription>قم بتحسين بحثك عن المتاجر</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="search-stores">ابحث</Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search-stores"
              type="search"
              placeholder="ابحث عن متجر أو عنوان..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sort-stores">ترتيب بواسطة</Label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger id="sort-stores">
              <SelectValue placeholder="ترتيب بواسطة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">الأحدث</SelectItem>
              <SelectItem value="name-asc">الاسم: تصاعدي (أ-ي)</SelectItem>
              <SelectItem value="name-desc">الاسم: تنازلي (ي-أ)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="pt-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setSearchQuery("");
              setSortBy("newest");
              setExpandedStoreId(null);
            }}
          >
            <Filter className="mr-2 h-4 w-4" />
            إعادة ضبط الفلتر
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
