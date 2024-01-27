

import { PartValues } from "@/types"
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<PartValues>[] = [
  {
    accessorKey: "part_number",
    header: () => <div className="text-left">Part Number</div>,
  },
  {
    accessorKey: "part_name",
    header: "Part Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "part_type_name",
    header: "Part Type",
  },
  {
    accessorKey: "suppliers_name",
    header: "Supplier",
  },
  {
    accessorKey: "manufacturers_name",
    header: "Manufacturer",
  },
  {
    accessorKey: "locations_name",
    header: "Location",
  },
  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-left">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"))
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount)
 
  //     return <div className="text-right font-medium">{formatted}</div>
  //   },
  // },
  {
    id: 'edit'
  }
]
