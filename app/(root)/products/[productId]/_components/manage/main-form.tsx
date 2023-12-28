"use client"

import { SHIPPING_TYPE } from "@prisma/client"
import { UseFormReturn } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { ImageUpload } from "./image-upload"
import { ProductFormValues } from "../product-form"

interface MainFormProps {
  form: UseFormReturn<ProductFormValues>
  isSubmitting: boolean
}

export const MainForm = ({ form, isSubmitting }: MainFormProps) => {
  return (
    <div className="gap-8 col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Name *</FormLabel>
            <FormControl>
              <Input
                disabled={isSubmitting}
                placeholder="Product Name"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="code"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Code *</FormLabel>
            <FormControl>
              <Input
                disabled={isSubmitting}
                placeholder="Product Code"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <ImageUpload field={field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Description</FormLabel>
            <FormControl>
              <Textarea
                disabled={isSubmitting}
                placeholder="Product Description"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="colorGroup"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Color Group Code</FormLabel>
            <FormControl>
              <Input
                disabled={isSubmitting}
                placeholder="Color Group Code"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="marketPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Market Price (₹) *</FormLabel>
            <FormControl>
              <Input
                type="number"
                disabled={isSubmitting}
                placeholder="Market Price"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="discount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Discount (%) *</FormLabel>
            <FormControl>
              <Input
                type="number"
                disabled={isSubmitting}
                placeholder="Discount"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="offerPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Offer Price (₹) *</FormLabel>
            <FormControl>
              <Input
                type="number"
                disabled={isSubmitting}
                placeholder="Offer Price"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="vendorPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Vendor Price (₹)</FormLabel>
            <FormControl>
              <Input
                type="number"
                disabled={isSubmitting}
                placeholder="Vendor Price"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="weight"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Weight (in KG)</FormLabel>
            <FormControl>
              <Input
                type="number"
                disabled={isSubmitting}
                placeholder="Weight"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="shippingType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Shipping Type *</FormLabel>
            <Select
              disabled={isSubmitting}
              onValueChange={field.onChange}
              value={field.value}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    defaultValue={field.value}
                    placeholder="Select shipping type"
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem
                  key={SHIPPING_TYPE.WEIGHT}
                  value={SHIPPING_TYPE.WEIGHT}
                >
                  By Weight
                </SelectItem>
                <SelectItem
                  key={SHIPPING_TYPE.PIECES}
                  value={SHIPPING_TYPE.PIECES}
                >
                  By Pieces
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="productRatings"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Ratings *</FormLabel>
            <FormControl>
              <Input
                type="number"
                disabled={isSubmitting}
                placeholder="Product Ratings"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
