type PropertyData = {
  // Property type
  propertyType: string

  // Location
  address: string
  pricePerSqm: string

  // Rooms
  suites: string
  bathrooms: string
  livingRooms: string
  kitchens: string
  parkingSpaces: string

  // Features
  hasPool: boolean

  // Decor types
  decorModern: boolean
  decorClassic: boolean
  decorMinimalist: boolean
  decorIndustrial: boolean
  decorRustic: boolean

  // Paint condition
  exteriorPaint: string
  interiorPaint: string
}