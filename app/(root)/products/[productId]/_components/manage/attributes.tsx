"use client"

import { useState } from "react"
import { UseFormReturn } from "react-hook-form"
import { Check, ChevronsUpDown } from "lucide-react"
import { Color, Fabric, Occasion, Season, Work } from "@prisma/client"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem } from "@/components/ui/form"

import { ProductFormValues } from "../product-form"

interface AttributesProps {
  works: Work[]
  fabrics: Fabric[]
  occasions: Occasion[]
  seasons: Season[]
  colors: Color[]
  form: UseFormReturn<ProductFormValues>
}

export const Attributes = ({
  works,
  fabrics,
  occasions,
  seasons,
  colors,
  form,
}: AttributesProps) => {
  const [workOpen, setWorkOpen] = useState(false)
  const [fabricOpen, setFabricOpen] = useState(false)
  const [occasionOpen, setOccasionOpen] = useState(false)
  const [seasonOpen, setSeasonOpen] = useState(false)
  const [colorOpen, setColorOpen] = useState(false)

  const onChange = ({ field, id }: any) => {
    if (field.value.includes(id)) {
      field.onChange([...field.value.filter((current: any) => current !== id)])
    } else {
      field.onChange([...field.value, id])
    }
  }

  return (
    <div className="flex flex-col space-y-3">
      <Popover open={workOpen} onOpenChange={setWorkOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            role="combobox"
            aria-expanded={workOpen}
            aria-label="Select a work"
            className="w-[200px] justify-between"
          >
            Works
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>No work found.</CommandEmpty>
              <CommandGroup heading="Works">
                {works.map((work) => (
                  <FormField
                    key={work.id}
                    control={form.control}
                    name="workId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CommandItem
                            key={work.id}
                            onSelect={() => onChange({ field, id: work.id })}
                            className="text-sm"
                          >
                            {work.name}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                field.value.includes(work.id)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Popover open={fabricOpen} onOpenChange={setFabricOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            role="combobox"
            aria-expanded={fabricOpen}
            aria-label="Select a fabric"
            className="w-[200px] justify-between"
          >
            Fabrics
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>No fabric found.</CommandEmpty>
              <CommandGroup heading="Fabrics">
                {fabrics.map((fabric) => (
                  <FormField
                    key={fabric.id}
                    control={form.control}
                    name="fabricId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CommandItem
                            key={fabric.id}
                            onSelect={() => onChange({ field, id: fabric.id })}
                            className="text-sm"
                          >
                            {fabric.name}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                field.value.includes(fabric.id)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Popover open={occasionOpen} onOpenChange={setOccasionOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            role="combobox"
            aria-expanded={occasionOpen}
            aria-label="Select a occasion"
            className="w-[200px] justify-between"
          >
            Occasions
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>No occasion found.</CommandEmpty>
              <CommandGroup heading="Occasions">
                {occasions.map((occasion) => (
                  <FormField
                    key={occasion.id}
                    control={form.control}
                    name="occasionId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CommandItem
                            key={occasion.id}
                            onSelect={() =>
                              onChange({ field, id: occasion.id })
                            }
                            className="text-sm"
                          >
                            {occasion.name}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                field.value.includes(occasion.id)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Popover open={seasonOpen} onOpenChange={setSeasonOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            role="combobox"
            aria-expanded={seasonOpen}
            aria-label="Select a season"
            className="w-[200px] justify-between"
          >
            Seasons
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>No season found.</CommandEmpty>
              <CommandGroup heading="Seasons">
                {seasons.map((season) => (
                  <FormField
                    key={season.id}
                    control={form.control}
                    name="seasonId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CommandItem
                            key={season.id}
                            onSelect={() => onChange({ field, id: season.id })}
                            className="text-sm"
                          >
                            {season.name}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                field.value.includes(season.id)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Popover open={colorOpen} onOpenChange={setColorOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            role="combobox"
            aria-expanded={colorOpen}
            aria-label="Select a color"
            className="w-[200px] justify-between"
          >
            Colors
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>No color found.</CommandEmpty>
              <CommandGroup heading="Colors">
                {colors.map((color) => (
                  <FormField
                    key={color.id}
                    control={form.control}
                    name="colorId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CommandItem
                            key={color.id}
                            onSelect={() => onChange({ field, id: color.id })}
                            className="text-sm"
                          >
                            {color.name}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                field.value.includes(color.id)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
