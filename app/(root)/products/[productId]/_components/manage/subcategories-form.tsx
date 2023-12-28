"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { SubCategory, SubSubCategory } from "@prisma/client"

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

import { ProductFormValues } from "../product-form"

interface SubCategoriesFormProps {
  subCategory: { subSubCategories: SubSubCategory[] } & SubCategory
  form: UseFormReturn<ProductFormValues>
  isSubmitting: boolean
}

export const SubCategoriesForm = ({
  subCategory,
  form,
  isSubmitting,
}: SubCategoriesFormProps) => {
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
        {subCategory.subSubCategories[0] ? (
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
          name="subCategoryId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Checkbox
                  id={subCategory.id}
                  disabled={isSubmitting}
                  checked={field.value.includes(subCategory.id)}
                  onCheckedChange={(value) =>
                    onChange({ value, field, id: subCategory.id })
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <label
          htmlFor={subCategory.id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {subCategory.name}
        </label>
      </div>
      {open && (
        <div className="flex flex-col space-y-1 ml-14 !mt-2">
          {subCategory.subSubCategories.map((subSubCategory) => (
            <div
              key={subSubCategory.id}
              className="flex items-center space-x-2"
            >
              <FormField
                control={form.control}
                name="subSubCategoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        id={subSubCategory.id}
                        disabled={isSubmitting}
                        checked={field.value.includes(subSubCategory.id)}
                        onCheckedChange={(value) =>
                          onChange({ value, field, id: subSubCategory.id })
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <label
                htmlFor={subSubCategory.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {subSubCategory.name}
              </label>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
