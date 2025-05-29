"use client"

import { useEffect, useState } from "react"
import { getServices, deleteService, type Service } from "@/lib/storage-utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2, AlertTriangle, MapPin } from "lucide-react"
import Link from "next/link"

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null)

  useEffect(() => {
    const fetchServices = () => {
      const allServices = getServices()
      setServices(allServices)
    }

    fetchServices()
  }, [])

  const handleDeleteService = () => {
    if (serviceToDelete) {
      deleteService(serviceToDelete)
      setServices(services.filter((service) => service.id !== serviceToDelete))
      setServiceToDelete(null)
    }
  }

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.location.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center space-y-2 sm:space-y-0">
          <div>
            <CardTitle className="text-2xl">إدارة الخدمات</CardTitle>
            <CardDescription>إدارة جميع الخدمات على منصة مسار</CardDescription>
          </div>
          <Link href="/admin/services/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              إضافة خدمة جديدة
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث عن الخدمات..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الاسم</TableHead>
                  <TableHead>الفئة</TableHead>
                  <TableHead className="hidden md:table-cell">الموقع</TableHead>
                  <TableHead className="hidden md:table-cell">الحالة</TableHead>
                  <TableHead className="hidden md:table-cell">طوارئ</TableHead>
                  <TableHead className="text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{service.category}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center">
                          <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          <span className="truncate max-w-[200px]">{service.location.address}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {service.isOpen ? (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                            مفتوح
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                            مغلق
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {service.isEmergency ? (
                          <div className="flex items-center">
                            <AlertTriangle className="h-3.5 w-3.5 mr-1 text-red-500" />
                            <span className="text-red-500">نعم</span>
                          </div>
                        ) : (
                          <span>لا</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/services/${service.id}/edit`}>
                            <Button variant="outline" size="sm">
                              <Edit className="h-3.5 w-3.5" />
                              <span className="sr-only">تعديل</span>
                            </Button>
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500 border-red-200 hover:bg-red-50"
                                onClick={() => setServiceToDelete(service.id)}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                <span className="sr-only">حذف</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
                                <AlertDialogDescription>
                                  سيتم حذف الخدمة "{service.name}" نهائيًا. لا يمكن التراجع عن هذا الإجراء.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setServiceToDelete(null)}>إلغاء</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={handleDeleteService}
                                  className="bg-red-500 hover:bg-red-600"
                                >
                                  حذف
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      لا توجد خدمات.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

