"use client"

import axios from "axios"
import { toast } from "sonner"
import Image from "next/image"
import { useDropzone } from "react-dropzone"
import { ElementRef, useRef, useState } from "react"
import { ImagePlus, UploadCloud } from "lucide-react"
import { ControllerRenderProps } from "react-hook-form"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { ProductFormValues } from "../product-form"

interface ImageDropzoneProps {
  field: ControllerRenderProps<ProductFormValues, "image">
}

export const ImageDropzone = ({ field }: ImageDropzoneProps) => {
  const closeRef = useRef<ElementRef<"button">>(null)
  const [uploading, setUploading] = useState(false)
  const [image, setImage] = useState<File | null>(null)

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setImage(acceptedFiles[0])
    },
  })

  const UploadImage = async () => {
    if (!image) return

    setUploading(true)
    const formData = new FormData()
    formData.append("image", image)

    await axios
      .post("/api/image-upload", formData)
      .then((response) => {
        field.onChange([...field.value, response.data.filename])
        setImage(null)
        closeRef.current?.click()
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setUploading(false))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" type="button">
          <ImagePlus className="h-5 w-5 mr-2" /> Upload Image
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload product image</DialogTitle>
        </DialogHeader>
        {image ? (
          <Image
            src={URL.createObjectURL(image)}
            width={350}
            height={250}
            objectFit="contain"
            className="mx-auto"
            alt="Image"
          />
        ) : (
          <div
            {...getRootProps({ className: "dropzone" })}
            className="h-36 bg-secondary text-secondary-foreground border-2 border-dashed rounded-md flex flex-col justify-center items-center"
          >
            <input {...getInputProps()} accept="image/*" disabled={uploading} />
            <UploadCloud className="h-10 w-10" />
            <p>Choose images or drag and drop</p>
          </div>
        )}
        <DialogFooter>
          <DialogClose ref={closeRef} asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button disabled={!image || uploading} onClick={UploadImage}>
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
