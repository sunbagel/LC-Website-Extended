import { Part } from "@/types"
import { columns } from "./PartColumn"
import { DataTable } from "./PartDataTable"

 function getData(): Part[] {
  // Fetch data from your API here.
  return [
    {
      partNumber: "001"
    },
    {
      partNumber: "002"
    }
    // ...
  ]
}

export default function DemoPage() {
  const data = getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
