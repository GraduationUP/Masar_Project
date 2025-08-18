"use client";

import Header from "@/components/main_layout/header";
import PageTitle from "@/components/main_layout/PageTitle";
import { useState, useEffect } from "react";
import Loading from "./loading";
import { Plus } from "lucide-react";
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
import { CustomAlert } from "@/components/customAlert";

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
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [failuer, setFailure] = useState(false);
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
      const json = await response.json();
      if (json.status) {
        fetchCategories();
        setNewCategoryName("");
        setMessage("تم إضافة الفئة بنجاح");
        setSuccess(true);
      } else {
        console.error("API returned status false for categories:", json);
      }
    } catch (error) {
      console.error("Error adding category:", error);
      setFailure(true);
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
      const json = await response.json();
      if (json.status) {
        fetchCategories();
        setMessage("تم حذف الفئة بنجاح");
        setSuccess(true);
      } else {
        console.error("API returned status false for categories:", json);
        setFailure(true);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
        show={failuer}
        onClose={() => setFailure(false)}
        success={false}
      />
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus />
            اضافة فئة جديدة
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>اضافة فئة جديدة</DialogTitle>
          <form onSubmit={handleAddCategory}>
            <Label htmlFor="name">اسم الفئة</Label>
            <Input
              id="name"
              name="name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="اسم الفئة الجديدة"
            />
            <Button type="submit">اضافة</Button>
          </form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"}>الغاء</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between bg-white rounded-md p-4 shadow-md"
          >
            <span>{category.name}</span>
            <Button
              onClick={() => handleDeleteCategory(category.id)}
              variant={"destructive"}
            >
              حذف
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
