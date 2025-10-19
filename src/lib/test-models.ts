export interface AddressInfo {
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
}

export interface PackageInfo {
  weight: string
  dimensions: string
  description: string
  value?: string
  specialInstructions?: string
}

export interface TrackingInfo {
  origin: string
  destination: string
  estimatedDelivery: string
  serviceLevel: string
  trackingNumber: string
}

export interface TestModelData {
  serviceType: string
  originTrackingNumber: string
  deliveredTrackingNumber: string
  sender: AddressInfo
  receiver: AddressInfo
  package: PackageInfo
  tracking: TrackingInfo
  // Legacy fields for backward compatibility
  senderName: string
  senderAddress: string
  receiverName: string
  receiverAddress: string
  weight: string
}

export interface TestModel {
  id: string
  name: string
  description: string
  category: 'domestic' | 'international' | 'express' | 'bulk' | 'special'
  data: TestModelData
}

// Predefined test scenarios
export const testModels: TestModel[] = [
  {
    id: 'express-domestic',
    name: 'Express Domestic',
    description: 'Fast domestic delivery within 1-2 business days',
    category: 'express',
    data: {
      serviceType: 'Express',
      originTrackingNumber: 'EXP123456789',
      deliveredTrackingNumber: 'EXP987654321',
      sender: {
        name: 'John Smith',
        address: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
        phone: '+1 (555) 123-4567'
      },
      receiver: {
        name: 'Jane Doe',
        address: '456 Oak Avenue',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'USA',
        phone: '+1 (555) 987-6543'
      },
      package: {
        weight: '2.5 lbs',
        dimensions: '12x8x4 in',
        description: 'Electronics',
        value: '$299.99',
        specialInstructions: 'Handle with care - fragile'
      },
      tracking: {
        origin: 'New York, NY',
        destination: 'Los Angeles, CA',
        estimatedDelivery: '2024-01-15',
        serviceLevel: 'Next Day Air',
        trackingNumber: 'EXP987654321'
      },
      // Legacy fields
      senderName: 'John Smith',
      senderAddress: '123 Main Street, New York, NY 10001',
      receiverName: 'Jane Doe',
      receiverAddress: '456 Oak Avenue, Los Angeles, CA 90210',
      weight: '2.5 lbs'
    }
  },
  {
    id: 'standard-domestic',
    name: 'Standard Domestic',
    description: 'Regular domestic shipping within 3-5 business days',
    category: 'domestic',
    data: {
      serviceType: 'Standard',
      originTrackingNumber: 'STD456789123',
      deliveredTrackingNumber: 'STD789123456',
      sender: {
        name: 'Mike Johnson',
        address: '789 Pine Street',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'USA',
        phone: '+1 (555) 456-7890'
      },
      receiver: {
        name: 'Sarah Wilson',
        address: '321 Elm Street',
        city: 'Houston',
        state: 'TX',
        zipCode: '77001',
        country: 'USA',
        phone: '+1 (555) 321-0987'
      },
      package: {
        weight: '5.2 lbs',
        dimensions: '15x10x6 in',
        description: 'Books and documents',
        value: '$89.99'
      },
      tracking: {
        origin: 'Chicago, IL',
        destination: 'Houston, TX',
        estimatedDelivery: '2024-01-18',
        serviceLevel: 'Ground',
        trackingNumber: 'STD789123456'
      },
      // Legacy fields
      senderName: 'Mike Johnson',
      senderAddress: '789 Pine Street, Chicago, IL 60601',
      receiverName: 'Sarah Wilson',
      receiverAddress: '321 Elm Street, Houston, TX 77001',
      weight: '5.2 lbs'
    }
  },
  {
    id: 'international-express',
    name: 'International Express',
    description: 'Fast international shipping with customs',
    category: 'international',
    data: {
      serviceType: 'International Express',
      originTrackingNumber: 'INT789123456',
      deliveredTrackingNumber: 'INT456789123',
      sender: {
        name: 'David Brown',
        address: '555 Broadway',
        city: 'New York',
        state: 'NY',
        zipCode: '10013',
        country: 'USA',
        phone: '+1 (555) 789-0123'
      },
      receiver: {
        name: 'Emma Thompson',
        address: '42 Baker Street',
        city: 'London',
        state: 'England',
        zipCode: 'NW1 6XE',
        country: 'United Kingdom',
        phone: '+44 20 7946 0958'
      },
      package: {
        weight: '3.1 lbs',
        dimensions: '10x8x5 in',
        description: 'Gift items',
        value: '$150.00',
        specialInstructions: 'Customs declaration required'
      },
      tracking: {
        origin: 'New York, NY, USA',
        destination: 'London, England, UK',
        estimatedDelivery: '2024-01-20',
        serviceLevel: 'International Express',
        trackingNumber: 'INT456789123'
      },
      // Legacy fields
      senderName: 'David Brown',
      senderAddress: '555 Broadway, New York, NY 10013',
      receiverName: 'Emma Thompson',
      receiverAddress: '42 Baker Street, London, England NW1 6XE',
      weight: '3.1 lbs'
    }
  },
  {
    id: 'bulk-shipment',
    name: 'Bulk Shipment',
    description: 'Large quantity shipment for business',
    category: 'bulk',
    data: {
      serviceType: 'Bulk',
      originTrackingNumber: 'BLK123456789',
      deliveredTrackingNumber: 'BLK987654321',
      sender: {
        name: 'ABC Manufacturing Co.',
        address: '1000 Industrial Blvd',
        city: 'Detroit',
        state: 'MI',
        zipCode: '48201',
        country: 'USA',
        phone: '+1 (555) 000-1111'
      },
      receiver: {
        name: 'XYZ Distribution Center',
        address: '2000 Warehouse Way',
        city: 'Atlanta',
        state: 'GA',
        zipCode: '30301',
        country: 'USA',
        phone: '+1 (555) 222-3333'
      },
      package: {
        weight: '45.7 lbs',
        dimensions: '24x18x12 in',
        description: 'Manufacturing parts',
        value: '$1,250.00',
        specialInstructions: 'Forklift required for delivery'
      },
      tracking: {
        origin: 'Detroit, MI',
        destination: 'Atlanta, GA',
        estimatedDelivery: '2024-01-22',
        serviceLevel: 'Freight',
        trackingNumber: 'BLK987654321'
      },
      // Legacy fields
      senderName: 'ABC Manufacturing Co.',
      senderAddress: '1000 Industrial Blvd, Detroit, MI 48201',
      receiverName: 'XYZ Distribution Center',
      receiverAddress: '2000 Warehouse Way, Atlanta, GA 30301',
      weight: '45.7 lbs'
    }
  },
  {
    id: 'fragile-special',
    name: 'Fragile Special Handling',
    description: 'Special handling for fragile items',
    category: 'special',
    data: {
      serviceType: 'Special Handling',
      originTrackingNumber: 'FRG456789123',
      deliveredTrackingNumber: 'FRG789123456',
      sender: {
        name: 'Art Gallery NYC',
        address: '888 Art Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10003',
        country: 'USA',
        phone: '+1 (555) 444-5555'
      },
      receiver: {
        name: 'Museum of Fine Arts',
        address: '999 Culture Avenue',
        city: 'Boston',
        state: 'MA',
        zipCode: '02115',
        country: 'USA',
        phone: '+1 (555) 666-7777'
      },
      package: {
        weight: '12.3 lbs',
        dimensions: '36x24x6 in',
        description: 'Framed artwork',
        value: '$5,000.00',
        specialInstructions: 'FRAGILE - This side up - Handle with extreme care'
      },
      tracking: {
        origin: 'New York, NY',
        destination: 'Boston, MA',
        estimatedDelivery: '2024-01-19',
        serviceLevel: 'Special Handling',
        trackingNumber: 'FRG789123456'
      },
      // Legacy fields
      senderName: 'Art Gallery NYC',
      senderAddress: '888 Art Street, New York, NY 10003',
      receiverName: 'Museum of Fine Arts',
      receiverAddress: '999 Culture Avenue, Boston, MA 02115',
      weight: '12.3 lbs'
    }
  }
]

// Utility function to get test model by ID
export function getTestModel(id: string): TestModel | undefined {
  return testModels.find(model => model.id === id)
}

// Utility function to get test models by category
export function getTestModelsByCategory(category: TestModel['category']): TestModel[] {
  return testModels.filter(model => model.category === category)
}

// Utility function to generate random test data
export function generateRandomTestData(): TestModelData {
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose']
  const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'TX', 'CA', 'TX', 'CA']
  const zipCodes = ['10001', '90210', '60601', '77001', '85001', '19101', '78201', '92101', '75201', '95110']
  
  const randomCity = cities[Math.floor(Math.random() * cities.length)]
  const randomState = states[Math.floor(Math.random() * states.length)]
  const randomZip = zipCodes[Math.floor(Math.random() * zipCodes.length)]
  
  const trackingNumber = Math.random().toString(36).substring(2, 15).toUpperCase()
  
  return {
    serviceType: 'Express',
    originTrackingNumber: `ORIG${trackingNumber}`,
    deliveredTrackingNumber: `DEL${trackingNumber}`,
    sender: {
      name: 'John Smith',
      address: '123 Main Street',
      city: randomCity,
      state: randomState,
      zipCode: randomZip,
      country: 'USA',
      phone: '+1 (555) 123-4567'
    },
    receiver: {
      name: 'Jane Doe',
      address: '456 Oak Avenue',
      city: randomCity,
      state: randomState,
      zipCode: randomZip,
      country: 'USA',
      phone: '+1 (555) 987-6543'
    },
    package: {
      weight: `${(Math.random() * 10 + 1).toFixed(1)} lbs`,
      dimensions: `${Math.floor(Math.random() * 20 + 5)}x${Math.floor(Math.random() * 15 + 5)}x${Math.floor(Math.random() * 10 + 2)} in`,
      description: 'Package contents',
      value: `$${(Math.random() * 500 + 50).toFixed(2)}`
    },
    tracking: {
      origin: `${randomCity}, ${randomState}`,
      destination: `${randomCity}, ${randomState}`,
      estimatedDelivery: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      serviceLevel: 'Express',
      trackingNumber: `DEL${trackingNumber}`
    },
    // Legacy fields
    senderName: 'John Smith',
    senderAddress: `123 Main Street, ${randomCity}, ${randomState} ${randomZip}`,
    receiverName: 'Jane Doe',
    receiverAddress: `456 Oak Avenue, ${randomCity}, ${randomState} ${randomZip}`,
    weight: `${(Math.random() * 10 + 1).toFixed(1)} lbs`
  }
}
