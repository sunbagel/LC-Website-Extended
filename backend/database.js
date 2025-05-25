// database.js  (ES‑module version)
// Unified data‑access layer using Prisma ORM (SQLite)
// ---------------------------------------------------
//  * Requires: "type": "module" in package.json  *or*  save this file as .mjs
//  * All exports are now proper ES named exports, so you can
//    `import { prisma, getParts } from './database.js'` everywhere.

import { PrismaClient, Prisma } from '@prisma/client'

export const prisma = new PrismaClient()

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

const includePartRelations = {
  locations: true,
  manufacturers: true,
  part_type: true,
  suppliers: true
}

function toDecimal (val) {
  return val == null ? null : new Prisma.Decimal(Number(val).toFixed(2))
}

function toMatchablePart(part) {
  return {
    ...part,
    price: part?.price?.toFixed ? part.price.toFixed(2) : part.price
  }
}

// ---------------------------------------------------------------------------
// Parts CRUD + search
// ---------------------------------------------------------------------------

export async function getParts () {
  const parts = await prisma.parts.findMany({ include: includePartRelations })
  return parts.map(toMatchablePart)
}

export async function getPart (id) {
  const part = await prisma.parts.findUnique({
    where: { id: Number(id) },
    include: includePartRelations
  })
  return toMatchablePart(part)
}

export async function searchParts (filters = {}) {
  const where = {}

  // LIKE filters for text fields
  ;['part_name', 'part_number', 'description'].forEach((f) => {
    if (filters[f]) where[f] = { contains: filters[f] }
  })

  ;['supplier_id', 'part_type_id', 'manufacturer_id', 'location_id'].forEach(
    (f) => {
      if (filters[f]) where[f] = Number(filters[f])
    }
  )

  if (filters.price_min || filters.price_max) {
    where.price = {}
    if (filters.price_min) where.price.gte = new Prisma.Decimal(filters.price_min)
    if (filters.price_max) where.price.lte = new Prisma.Decimal(filters.price_max)
  }

  if (filters.quantity_min || filters.quantity_max) {
    where.quantity = {}
    if (filters.quantity_min) where.quantity.gte = Number(filters.quantity_min)
    if (filters.quantity_max) where.quantity.lte = Number(filters.quantity_max)
  }

  const results = await prisma.parts.findMany({ where, include: includePartRelations })
  return results.map(toMatchablePart)
}

export async function createPart (data) {
  const clean = { ...data, price: toDecimal(data.price) }
  const part = await prisma.parts.create({ data: clean })
  return toMatchablePart(part)
}

export async function editPart (id, data) {
  const clean = { ...data }
  if (data.price != null) clean.price = toDecimal(data.price)
  const part = await prisma.parts.update({ where: { id: Number(id) }, data: clean })
  return toMatchablePart(part)
}

// ---------------------------------------------------------------------------
// Part types
// ---------------------------------------------------------------------------

export const getPartTypes = () => prisma.part_type.findMany()
export const getPartType = (id) => prisma.part_type.findUnique({ where: { id: Number(id) } })
export const createPartType = (name) => prisma.part_type.create({ data: { name } })

// ---------------------------------------------------------------------------
// Manufacturers
// ---------------------------------------------------------------------------

export const getManufacturers = () => prisma.manufacturers.findMany()
export const getManufacturer = (id) => prisma.manufacturers.findUnique({ where: { id: Number(id) } })
export const createManufacturer = (name) => prisma.manufacturers.create({ data: { name } })

// ---------------------------------------------------------------------------
// Locations
// ---------------------------------------------------------------------------

export const getLocations = () => prisma.locations.findMany()
export const getLocation = (id) => prisma.locations.findUnique({ where: { id: Number(id) } })
export const createLocation = (name) => prisma.locations.create({ data: { name } })

// ---------------------------------------------------------------------------
// Suppliers
// ---------------------------------------------------------------------------

export const getSuppliers = () => prisma.suppliers.findMany()
export const getSupplier = (id) => prisma.suppliers.findUnique({ where: { id: Number(id) } })
export const createSupplier = (name) => prisma.suppliers.create({ data: { name } })

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------

export const getUser = (username) => prisma.users.findUnique({ where: { username } })
export const createUser = ({ username, password }) => prisma.users.create({ data: { username, password } })

// ---------------------------------------------------------------------------
// Graceful shutdown
// ---------------------------------------------------------------------------

if (process.env.NODE_ENV !== 'production') {
  process.on('SIGINT', async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
}
