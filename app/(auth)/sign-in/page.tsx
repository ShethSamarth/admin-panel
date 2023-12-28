"use client"

import * as z from "zod"
import Link from "next/link"
import { toast } from "sonner"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

const SignInPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    signIn("credentials", { ...values, redirect: false })
      .then((callback) => {
        if (callback?.ok) {
          toast.success("Logged in")
          router.refresh()
          router.push("/")
        }

        if (callback?.error) {
          toast.error(callback.error)
          form.reset()
        }
      })
      .catch(() => {
        toast.error("Something went wrong")
        form.reset()
      })
      .finally(() => setLoading(false))
  }

  return (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Welcome Back!</CardTitle>
        <CardDescription>Please enter your credentials below</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p>Don&apos;t have an account ?</p>
        <Button variant="link" size="sm" asChild>
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default SignInPage
