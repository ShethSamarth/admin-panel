"use client"

import * as z from "zod"
import axios from "axios"
import { toast } from "sonner"
import { useState } from "react"
import { Trash } from "lucide-react"
import { Work } from "@prisma/client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"

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

type WorkFormValues = z.infer<typeof formSchema>

interface WorkFormProps {
  initialData: Work | null
}

export const WorkForm = ({ initialData }: WorkFormProps) => {
  const router = useRouter()
  const params = useParams()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? "Edit work" : "Create work"
  const description = initialData ? "Edit a work" : "Add a new work"
  const toastMessage = initialData ? "Work updated." : "Work created."
  const action = initialData ? "Save changes" : "Create"

  const form = useForm<WorkFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (data: WorkFormValues) => {
    try {
      if (initialData) {
        await axios.patch(`/api/works/${params.workId}`, data)
      } else {
        await axios.post("/api/works", data)
      }
      router.push("/works")
      router.refresh()
      toast.success(toastMessage)
    } catch (error) {
      toast.error("Something went wrong.")
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/works/${params.workId}`)
      router.push("/works")
      router.refresh()
      toast.success("Work deleted.")
    } catch (error) {
      toast.error("Make sure you removed all products using this work first.")
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Work"
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
