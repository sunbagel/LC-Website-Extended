// tests/database.test.js  – Extended coverage for Prisma data layer
// ---------------------------------------------------------------
// Prereqs (package.json):
//   "scripts": {
//     "db:test:reset": "cross-env DATABASE_URL=file:./test.db prisma db push --force-reset && prisma generate",
//     "test": "npm run db:test:reset && cross-env NODE_OPTIONS=--experimental-vm-modules jest"
//   }
// Run with `npm test`
// ---------------------------------------------------------------

import {
  prisma,
  createPart,
  editPart,
  searchParts,
  getParts,
  getPart,
  createManufacturer,
  createPartType,
  createSupplier,
  createLocation
} from '../database.js'

let supplier1, supplier2, location1, manufacturer1, typeBolt
let partBolt, partWasher, partNut

beforeAll(async () => {
  // Clean slate for deterministic tests
  await prisma.$transaction([
    prisma.parts.deleteMany(),
    prisma.locations.deleteMany(),
    prisma.suppliers.deleteMany(),
    prisma.manufacturers.deleteMany(),
    prisma.part_type.deleteMany()
  ])

  // Fixtures
  location1 = await createLocation('Aisle‑1')
  supplier1 = await createSupplier('Acme')
  supplier2 = await createSupplier('Globex')
  manufacturer1 = await createManufacturer('WidgetCo')
  typeBolt = await createPartType('Bolt')

  // Parts
  partBolt = await createPart({
    part_name: 'M10 Bolt',
    part_number: 'B‑001',
    description: 'Steel, 30 mm',
    price: 0.2,
    quantity: 50,
    location_id: location1.id,
    supplier_id: supplier1.id,
    manufacturer_id: manufacturer1.id,
    part_type_id: typeBolt.id
  })

  partWasher = await createPart({
    part_name: 'Flat Washer',
    part_number: 'W‑001',
    description: 'M10 – stainless',
    price: 0.05,
    quantity: 200,
    location_id: location1.id,
    supplier_id: supplier1.id,
    manufacturer_id: manufacturer1.id,
    part_type_id: typeBolt.id
  })

  partNut = await createPart({
    part_name: 'Hex Nut',
    part_number: 'N‑001',
    description: 'M10 – zinc',
    price: 0.1,
    quantity: 5,
    location_id: location1.id,
    supplier_id: supplier2.id,
    manufacturer_id: manufacturer1.id,
    part_type_id: typeBolt.id
  })
})

afterAll(async () => {
  await prisma.$disconnect()
})

describe('Prisma data‑layer extended parity', () => {
  test('getParts returns all inserted parts', async () => {
    const all = await getParts()
    expect(all).toHaveLength(3)
  })

  test('searchParts by name substring (case‑insensitive)', async () => {
    const boltResults = await searchParts({ part_name: 'bolt' })
    expect(boltResults).toHaveLength(1)
    expect(boltResults[0].id).toBe(partBolt.id)
  })

  test('searchParts by supplier_id', async () => {
    const globexParts = await searchParts({ supplier_id: supplier2.id })
    expect(globexParts).toHaveLength(1)
    expect(globexParts[0].id).toBe(partNut.id)
  })

  test('searchParts by price range', async () => {
    const midPrice = await searchParts({ price_min: 0.06, price_max: 0.25 })
    // Should include bolt (0.20) but exclude washer (0.05) and nut (0.10 falls in range) -> 2 items
    const ids = midPrice.map(p => p.id).sort()
    expect(ids).toEqual([partBolt.id, partNut.id].sort())
  })

  test('searchParts by quantity minimum', async () => {
    const plentiful = await searchParts({ quantity_min: 100 })
    expect(plentiful).toHaveLength(1)
    expect(plentiful[0].id).toBe(partWasher.id)
  })

  test('editPart updates price & quantity', async () => {
    await editPart(partNut.id, { price: 0.12, quantity: 15 })
    const updated = await getPart(partNut.id)
    expect(updated.price).toBe('0.12')
    expect(updated.quantity).toBe(15)
  })
})
