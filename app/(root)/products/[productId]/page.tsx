import { notFound } from "next/navigation"

import db from "@/lib/db"

import { ProductForm } from "./_components/product-form"

interface ProductIdProps {
  params: { productId: string }
}

const ProductId = async ({ params }: ProductIdProps) => {
  const product = await db.product.findUnique({
    where: { id: params.productId },
  })

  if (params.productId !== "new" && !product) {
    notFound()
  }

  const categories = await db.category.findMany({
    include: { subCategories: { include: { subSubCategories: true } } },
    orderBy: { createdAt: "desc" },
  })

  const works = await db.work.findMany({
    orderBy: { createdAt: "desc" },
  })

  const fabrics = await db.fabric.findMany({
    orderBy: { createdAt: "desc" },
  })

  const occasions = await db.occasion.findMany({
    orderBy: { createdAt: "desc" },
  })

  const seasons = await db.season.findMany({
    orderBy: { createdAt: "desc" },
  })

  const colors = await db.color.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={product}
          categories={categories}
          works={works}
          fabrics={fabrics}
          occasions={occasions}
          seasons={seasons}
          colors={colors}
        />
      </div>
    </div>
  )
}

export default ProductId
