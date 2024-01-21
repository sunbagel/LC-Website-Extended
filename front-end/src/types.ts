export type Part = {
    part_id?: number | null
    part_number?: string | null;
    part_name?: string | null;
    description?: string | null;
    quantity?: number | null;
    price?: number | null;
    part_type?: string | null;
    supplier?: string | null;
    manufacturer?: string | null;
    location?: string | null;
}

export const PartKeyNumbers : string[] = ["id", "quantity", "price"];

export type PartValues = {
  id?: number | null
  part_number?: string | null;
  part_name?: string | null;
  description?: string | null;
  quantity?: number | null;
  price?: number | null;
  part_type_id?: number | null;
  supplier_id?: number | null;
  manufacturer_id?: number | null;
  location_id?: number | null;
}

// might need to rewrite partType definition
export type tableType = {
    id: number,
    name: string
}


  