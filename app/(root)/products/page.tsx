import { format } from "date-fns"

import db from "@/lib/db"

import { ProductClient } from "./_components/client"
import { ProductColumn } from "./_components/columns"

const Products = async () => {
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
  })

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    code: item.code,
    marketPrice: item.marketPrice,
    createdAt: format(item.createdAt, "dd/MM/yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient products={formattedProducts} />
      </div>
    </div>
  )
}

export default Products
