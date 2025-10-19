"use client";

import Header from "@/components/main_layout/header";
import PageTitle from "@/components/main_layout/PageTitle";
import { useState, useEffect, useMemo } from "react";
import Loading from "./loading";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomAlert } from "@/components/ui/customAlert";

interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null
  );
  const [updatedCategoryName, setUpdatedCategoryName] = useState<string>("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  async function fetchCategories() {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE_URL}/api/admin/categories`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const responseData = await response.json();
      setCategories(responseData);
    } catch (error) {
      console.error("Error fetching stores data:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/categories`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newCategoryName }),
      });

      if (!response.ok) {
        setFailure(true);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchCategories();
      setNewCategoryName("");
      setMessage("تم إضافة الفئة بنجاح");
      setSuccess(true);
    } catch (error) {
      console.error("Error adding category:", error);
      setFailure(true);
    } finally {
      setIsAddOpen(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/categories/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        setFailure(true);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchCategories();
      setMessage("تم حذف الفئة بنجاح");
      setSuccess(true);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (editingCategoryId === null) return;
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/categories/${editingCategoryId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: updatedCategoryName }),
        }
      );

      if (!response.ok) {
        setFailure(true);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchCategories();
      setUpdatedCategoryName("");
      setMessage("تم تحديث الفئة بنجاح");
      setSuccess(true);
    } catch (error) {
      console.error("Error updating category:", error);
      setFailure(true);
    } finally {
      setEditingCategoryId(null);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  if (loading) return <Loading />;

  return (
    <>
      <Header />
      <PageTitle MainTitle="ادارة الفئات" Arrow />
      <CustomAlert
        message={message}
        show={success}
        onClose={() => setSuccess(false)}
        success
      />
      <CustomAlert
        message={"حدث خطأ ما"}
        show={failure}
        onClose={() => setFailure(false)}
        success={false}
      />
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus />
            اضافة فئة جديدة
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>اضافة فئة جديدة</DialogTitle>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="add-name">اسم الفئة</Label>
              <Input
                id="add-name"
                name="name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="اسم الفئة الجديدة"
              />
            </div>
            <DialogFooter>
              <Button type="submit">اضافة</Button>
              <DialogClose asChild>
                <Button type="button" variant={"outline"}>
                  الغاء
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col gap-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="search">ابحث</Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              type="search"
              placeholder="ابحث عن فئة..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between bg-background text-foreground rounded-md p-4 shadow-md"
          >
            <span>{category.name}</span>
            <div className="flex gap-1">
              <Dialog
                open={editingCategoryId === category.id}
                onOpenChange={(isOpen) => {
                  if (isOpen) {
                    setEditingCategoryId(category.id);
                    setUpdatedCategoryName(category.name);
                  } else {
                    setEditingCategoryId(null);
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingCategoryId(category.id)}>
                    تعديل
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>تعديل الفئة "{category.name}"</DialogTitle>
                  <form onSubmit={handleUpdateCategory} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-name">اسم الفئة</Label>
                      <Input
                        id="edit-name"
                        name="name"
                        value={updatedCategoryName}
                        onChange={(e) => setUpdatedCategoryName(e.target.value)}
                        placeholder={`${category.name}`}
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit">تعديل</Button>
                      <DialogClose asChild>
                        <Button type="button" variant={"outline"}>
                          الغاء
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              <Button
                onClick={() => handleDeleteCategory(category.id)}
                variant={"destructive"}
              >
                حذف
              </Button>
            </div>
          </div>
        ))}
        {filteredCategories.length === 0 && (
          <p className="text-center text-gray-500 mt-4">لا توجد فئات مطابقة</p>
        )}
      </div>
    </>
  );
}
