import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/main_layout/PageTitle";
import Header from "@/components/main_layout/header";

export default function Loading() {
  return (
    <>
      <Header />
      <div className="container">
        <PageTitle MainTitle="تعديل المتجر" />
        <Card className="w-full mt-5">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-3/4" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-1/4" />
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium leading-none text-muted-foreground mb-2">
                صورة المتجر
              </h3>
              <Avatar>
                <AvatarImage>
                  <Skeleton className="h-24 w-24 rounded-full" />
                </AvatarImage>
                <AvatarFallback>
                  <Skeleton className="h-24 w-24 rounded-full" />
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h3 className="text-sm font-medium leading-none text-muted-foreground mb-2">
                رقم التواصل
              </h3>
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div>
              <h3 className="text-sm font-medium leading-none text-muted-foreground mb-2">
                الموقع
              </h3>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4 mt-1" />
            </div>
          </CardContent>
          <CardFooter>
            <Button disabled>
              ارسال
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
