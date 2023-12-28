"use client"

import Image from "next/image"
import { ControllerRenderProps } from "react-hook-form"

import { ImageDropzone } from "./image-dropzone"
import { ProductFormValues } from "../product-form"
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  field: ControllerRenderProps<ProductFormValues, "image">
}

export const ImageUpload = ({ field }: ImageUploadProps) => {
  const onDelete = (image: string) => {
    if (field.value.includes(image)) {
      field.onChange([
        ...field.value.filter((current: any) => current !== image),
      ])
    }
  }

  return (
    <>
      <div className="flex justify-start items-center flex-wrap gap-3">
        {field.value.map((image) => (
          <div key={image} className="relative">
            <Image
              src={`/products/${image}`}
              width={200}
              height={200}
              alt={image}
              className="h-32 w-32 bg-gray-300 rounded-md overflow-hidden object-contain"
            />
            <div className="absolute top-1 right-1">
              <Button
                variant="destructive"
                type="button"
                size="sm"
                onClick={() => onDelete(image)}
              >
                <Trash className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <ImageDropzone field={field} />
    </>
  )
}
