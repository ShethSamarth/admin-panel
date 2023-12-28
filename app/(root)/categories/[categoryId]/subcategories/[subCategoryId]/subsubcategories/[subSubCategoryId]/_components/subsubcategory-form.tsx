"use client"

import * as z from "zod"
import axios from "axios"
import { toast } from "sonner"
import { useState } from "react"
import { Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { Category, SubCategory, SubSubCategory } from "@prisma/client"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DeleteModal } from "@/components/modals/delete-modal"

const formSchema = z.object({
  name: z.string().min(1),
})

type SubSubCategoryFormValues = z.infer<typeof formSchema>

interface SubSubCategoryFormProps {
  initialData: SubSubCategory | null
  subCategory: SubCategory | null
  category: Category | null
}

export const SubSubCategoryForm = ({
  initialData,
  category,
  subCategory,
}: SubSubCategoryFormProps) => {
  const router = useRouter()
  const params = useParams()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? "Edit subcategory" : "Create subcategory"
  const description = initialData
    ? "Edit a subcategory"
    : "Add a new subcategory"
  const toastMessage = initialData
    ? "Subcategory updated."
    : "Subcategory created."
  const action = initialData ? "Save changes" : "Create"

  const form = useForm<SubSubCategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (data: SubSubCategoryFormValues) => {
    try {
      if (initialData) {
        await axios.patch(
          `/api/categories/${params.categoryId}/subCategories/${params.subCategoryId}/subSubCategories/${params.subSubCategoryId}`,
          { name: data.name, subCategoryId: subCategory?.id }
        )
      } else {
        await axios.post(
          `/api/categories/${params.categoryId}/subCategories/${params.subCategoryId}/subSubCategories`,
          { name: data.name, subCategoryId: subCategory?.id }
        )
      }
      router.push(
        `/categories/${params.categoryId}/subcategories/${params.subCategoryId}/subsubcategories`
      )
      router.refresh()
      toast.success(toastMessage)
    } catch (error) {
      toast.error("Something went wrong.")
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(
        `/api/categories/${params.categoryId}/subCategories/${params.subCategoryId}/subSubCategories/${params.subSubCategoryId}`
      )
      router.push(
        `/categories/${params.categoryId}/subcategories/${params.subCategoryId}/subsubcategories`
      )
      router.refresh()
      toast.success("Category deleted.")
    } catch (error) {
      toast.error(
        "Make sure you removed all products using this category first."
      )
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <DeleteModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={isSubmitting}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={() => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      placeholder="Category name"
                      value={category?.name}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={() => (
                <FormItem>
                  <FormLabel>Subcategory</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      placeholder="Subcategory name"
                      value={subCategory?.name}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subsubcategory</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Subsubcategory name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={isSubmitting || !isValid}
            className="ml-auto"
            type="submit"
          >
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
        </form>
      </Form>
    </>
  )
}
