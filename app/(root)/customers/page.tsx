import { format } from "date-fns"

import db from "@/lib/db"

import { CustomerClient } from "./_components/client"
import { CustomerColumn } from "./_components/columns"

const Customers = async () => {
  const customers = await db.user.findMany({
    select: {
      id: true,
      fname: true,
      lname: true,
      admin: true,
      mobile: true,
      email: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  })

  const formattedCustomers: CustomerColumn[] = customers.map((item) => ({
    id: item.id,
    fname: item.fname,
    lname: item.lname,
    admin: item.admin,
    mobile: item.mobile,
    email: item.email,
    createdAt: format(item.createdAt, "dd/MM/yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CustomerClient customers={formattedCustomers} />
      </div>
    </div>
  )
}

export default Customers
