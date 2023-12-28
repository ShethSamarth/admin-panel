"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { Category, SubCategory, SubSubCategory } from "@prisma/client"

import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormField, FormItem } from "@/components/ui/form"

import { ProductFormValues } from "../product-form"
import { SubCategoriesForm } from "./subcategories-form"

interface CategoriesFormProps {
  category: {
    subCategories: ({ subSubCategories: SubSubCategory[] } & SubCategory)[]
  } & Category
  form: UseFormReturn<ProductFormValues>
  isSubmitting: boolean
}

export const CategoriesForm = ({
  category,
  form,
  isSubmitting,
}: CategoriesFormProps) => {
  const [open, setOpen] = useState(false)

  const onChange = ({ value, field, id }: any) => {
    if (value) {
      field.onChange([...field.value, id])
    } else {
      field.onChange([...field.value.filter((current: any) => current !== id)])
    }
  }

  return (
    <>
      <div className="flex items-center space-x-2">
        {category.subCategories[0] ? (
          <>
            {open ? (
              <Minus
                className="h-5 w-5 hover:cursor-pointer"
                onClick={() => setOpen(false)}
              />
            ) : (
              <Plus
                className="h-5 w-5 hover:cursor-pointer"
                onClick={() => setOpen(true)}
              />
            )}
          </>
        ) : (
          <div className="h-5 w-5" />
        )}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Checkbox
                  id={category.id}
                  disabled={isSubmitting}
                  checked={field.value.includes(category.id)}
                  onCheckedChange={(value) =>
                    onChange({ value, field, id: category.id })
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
        <label
          htmlFor={category.id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {category.name}
        </label>
      </div>
      {open && (
        <div className="flex flex-col space-y-1 ml-6 mt-2">
          {category.subCategories.map((subCategory) => (
            <SubCategoriesForm
              key={subCategory.id}
              subCategory={subCategory}
              form={form}
              isSubmitting={isSubmitting}
            />
          ))}
        </div>
      )}
    </>
  )
}
