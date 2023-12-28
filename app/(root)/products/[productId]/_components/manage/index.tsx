"use client"

import {
  Category,
  Color,
  Fabric,
  Occasion,
  Season,
  SubCategory,
  SubSubCategory,
  Work,
} from "@prisma/client"
import { useRouter } from "next/navigation"
import { FieldError, UseFormReturn } from "react-hook-form"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import { MainForm } from "./main-form"
import { Attributes } from "./attributes"
import { CategoriesForm } from "./categories-form"
import { ProductFormValues } from "../product-form"

interface ManageProductProps {
  action: string
  categories: ({
    subCategories: ({ subSubCategories: SubSubCategory[] } & SubCategory)[]
  } & Category)[]
  works: Work[]
  fabrics: Fabric[]
  occasions: Occasion[]
  seasons: Season[]
  colors: Color[]
  form: UseFormReturn<ProductFormValues>
  onSubmit: (data: ProductFormValues) => void
  isSubmitting: boolean
  invalid: boolean
  error: FieldError | undefined
}

export const ManageProduct = ({
  action,
  categories,
  works,
  fabrics,
  occasions,
  seasons,
  colors,
  form,
  onSubmit,
  isSubmitting,
  invalid,
  error,
}: ManageProductProps) => {
  const router = useRouter()

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-5 lg:grid-cols-3 h-full"
      >
        <MainForm form={form} isSubmitting={isSubmitting} />
        <div className="col-span-1 space-y-3">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Product categories</CardTitle>
              <CardDescription>
                Select atleast one product category
              </CardDescription>
            </CardHeader>
            <CardContent>
              {categories.map((category) => (
                <CategoriesForm
                  key={category.id}
                  category={category}
                  form={form}
                  isSubmitting={isSubmitting}
                />
              ))}
            </CardContent>
            {invalid && (
              <CardFooter>
                <p className="text-red-500 dark:text-red-900 font-medium text-sm">
                  {error?.message}
                </p>
              </CardFooter>
            )}
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Product attributes</CardTitle>
              <CardDescription>Select attributes for product</CardDescription>
            </CardHeader>
            <CardContent>
              <Attributes
                works={works}
                fabrics={fabrics}
                occasions={occasions}
                seasons={seasons}
                colors={colors}
                form={form}
              />
            </CardContent>
          </Card>
        </div>
        <div>
          <Button disabled={isSubmitting} className="ml-auto" type="submit">
            {action}
          </Button>
          <Button
            disabled={isSubmitting}
            onClick={() => router.back()}
            className="mx-5"
            variant="outline"
            type="button"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}
