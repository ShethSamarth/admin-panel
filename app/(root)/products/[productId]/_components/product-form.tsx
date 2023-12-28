"use client"

import {
  Category,
  SubCategory,
  SubSubCategory,
  Product,
  Work,
  Fabric,
  Occasion,
  Season,
  Color,
} from "@prisma/client"
import * as z from "zod"
import axios from "axios"
import { toast } from "sonner"
import { useState } from "react"
import { Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"

import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DeleteModal } from "@/components/modals/delete-modal"

import { ManageProduct } from "./manage"

const formSchema = z.object({
  name: z.string().min(1),
  image: z.array(z.string()),
  code: z.string().min(1),
  description: z.string(),
  colorGroup: z.string(),
  marketPrice: z.coerce.number().min(1),
  discount: z.coerce.number().min(0).max(100),
  offerPrice: z.coerce.number().min(1),
  vendorPrice: z.coerce.number().optional(),
  weight: z.coerce.number().optional(),
  shippingType: z.string().min(1),
  productRatings: z.coerce.number().min(0).max(5),
  categoryId: z
    .array(z.string())
    .min(1, { message: "Please select atleast 1 category" }),
  subCategoryId: z.array(z.string()),
  subSubCategoryId: z.array(z.string()),
  workId: z.array(z.string()),
  fabricId: z.array(z.string()),
  occasionId: z.array(z.string()),
  seasonId: z.array(z.string()),
  colorId: z.array(z.string()),
})

export type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormProps {
  initialData: Product | null
  categories: ({
    subCategories: ({ subSubCategories: SubSubCategory[] } & SubCategory)[]
  } & Category)[]
  works: Work[]
  fabrics: Fabric[]
  occasions: Occasion[]
  seasons: Season[]
  colors: Color[]
}

export const ProductForm = ({
  initialData,
  categories,
  works,
  fabrics,
  occasions,
  seasons,
  colors,
}: ProductFormProps) => {
  const router = useRouter()
  const params = useParams()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? "Edit product" : "Create product"
  const description = initialData ? "Edit a product" : "Add a new product"
  const toastMessage = initialData ? "Product updated." : "Product created."
  const action = initialData ? "Save changes" : "Create"

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      image: initialData?.image || [],
      description: initialData?.description || "",
      code: initialData?.code || "",
      colorGroup: initialData?.colorGroup || "",
      marketPrice: initialData?.marketPrice || undefined,
      discount: initialData?.discount || undefined,
      offerPrice: initialData?.offerPrice || undefined,
      vendorPrice: initialData?.vendorPrice || undefined,
      weight: initialData?.weight || undefined,
      shippingType: initialData?.shippingType || "",
      productRatings: initialData?.productRatings || undefined,
      categoryId: initialData?.categoryId || [],
      subCategoryId: initialData?.subCategoryId || [],
      subSubCategoryId: initialData?.subSubCategoryId || [],
      workId: initialData?.workId || [],
      fabricId: initialData?.fabricId || [],
      occasionId: initialData?.occasionId || [],
      seasonId: initialData?.seasonId || [],
      colorId: initialData?.colorId || [],
    },
  })

  const { isSubmitting } = form.formState
  const { invalid, error } = form.getFieldState("categoryId")

  const onSubmit = async (data: ProductFormValues) => {
    try {
      if (initialData) {
        await axios.patch(`/api/products/${params.productId}`, data)
      } else {
        await axios.post("/api/products", data)
      }
      router.push("/products")
      router.refresh()
      toast.success(toastMessage)
    } catch (error) {
      toast.error("Something went wrong.")
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/products/${params.productId}`)
      router.push("/products")
      router.refresh()
      toast.success("Product deleted.")
    } catch (error) {
      toast.error(
        "Make sure you removed all products using this product first."
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
      <ManageProduct
        action={action}
        categories={categories}
        works={works}
        fabrics={fabrics}
        occasions={occasions}
        seasons={seasons}
        colors={colors}
        form={form}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        invalid={invalid}
        error={error}
      />
    </>
  )
}
