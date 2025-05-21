// Mock data storage utilities for Masar platform
// In a real application, this would be replaced with actual API calls

// Types
export interface User {
  id: string
  name: string
  email: string
  role: "user" | "seller" | "admin"
  avatar?: string
  createdAt: Date
}

export interface Store {
  id: string
  name: string
  description: string
  logo: string
  coverImage: string
  ownerId: string
  categories: string[]
  location: {
    address: string
    lat: number
    lng: number
  }
  contactInfo: {
    phone: string
    email: string
    website?: string
  }
  openingHours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
  rating?: number
  reviews: Review[]
  createdAt?: Date
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  storeId: string
  image?: string
  inStock: boolean
  rating?: number
  location?: {
    lat: number
    lng: number
  }
  createdAt: Date
}

export interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  createdAt: Date
}

// Update the Service interface to include more fields for different service types
export interface Service {
  id: string
  name: string
  description: string
  category: string
  tags?: string[]
  location: {
    address: string
    lat: number
    lng: number
  }
  contactInfo: {
    phone: string
    email: string
    website?: string
  }
  openingHours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
  isEmergency: boolean
  isOpen: boolean
  image?: string
  rating?: number
  reviewCount?: number
  createdAt: Date

  // Additional fields for specific service types
  facilityType?: string
  serviceType?: string
  specialties?: string[]
  features?: string[]
  priceRange?: string
  deliveryTime?: string
  deliveryTypes?: string[]
  cuisineType?: string[]

  // Gas station specific
  fuelTypes?: string[]
  regularPrice?: string
  premiumPrice?: string
  dieselPrice?: string
  lastUpdated?: string

  // Additional flags
  emergency?: boolean
  express?: boolean
}

// Storage keys
const USERS_KEY = "masar_users"
const STORES_KEY = "masar_stores"
const PRODUCTS_KEY = "masar_products"
const REVIEWS_KEY = "masar_reviews"
const SERVICES_KEY = "masar_services"

// Mock data initialization
export function initializeStorage() {
  if (typeof window === "undefined") return

  // Check if data already exists
  if (!localStorage.getItem(USERS_KEY)) {
    // Create mock users
    const users: User[] = [
      {
        id: "user1",
        name: "John Doe",
        email: "john@example.com",
        role: "user",
        avatar: "/vibrant-street-market.png",
        createdAt: new Date(2023, 0, 15),
      },
      {
        id: "seller1",
        name: "Sarah Smith",
        email: "sarah@example.com",
        role: "seller",
        avatar: "/market-stall-seller.png",
        createdAt: new Date(2023, 1, 10),
      },
      {
        id: "admin1",
        name: "Admin User",
        email: "admin@example.com",
        role: "admin",
        avatar: "/admin-interface.png",
        createdAt: new Date(2023, 0, 1),
      },
    ]
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  }

  if (!localStorage.getItem(STORES_KEY)) {
    // Create mock stores
    const stores: Store[] = [
      {
        id: "store1",
        name: "Electronics Hub",
        description:
          "Your one-stop shop for all electronics and gadgets. We offer the latest technology at competitive prices.",
        logo: "/circuit-cityscape.png",
        coverImage: "/electronics-store-interior.png",
        ownerId: "seller1",
        categories: ["Electronics", "Gadgets", "Computers"],
        location: {
          address: "123 Tech Street, Amman, Jordan",
          lat: 31.9539 + (Math.random() - 0.5) * 0.05,
          lng: 35.9106 + (Math.random() - 0.5) * 0.05,
        },
        contactInfo: {
          phone: "+962 7 1234 5678",
          email: "contact@electronicshub.com",
          website: "www.electronicshub.com",
        },
        openingHours: {
          monday: "9:00 AM - 9:00 PM",
          tuesday: "9:00 AM - 9:00 PM",
          wednesday: "9:00 AM - 9:00 PM",
          thursday: "9:00 AM - 9:00 PM",
          friday: "9:00 AM - 10:00 PM",
          saturday: "10:00 AM - 10:00 PM",
          sunday: "10:00 AM - 8:00 PM",
        },
        rating: 4.8,
        reviews: [],
        createdAt: new Date(2023, 2, 15),
      },
      {
        id: "store2",
        name: "Fashion Store",
        description: "Trendy fashion for all ages. We bring you the latest styles from around the world.",
        logo: "/diverse-fashion-collection.png",
        coverImage: "/fashion-store-boutique.png",
        ownerId: "seller1",
        categories: ["Clothing", "Accessories", "Footwear"],
        location: {
          address: "456 Fashion Avenue, Amman, Jordan",
          lat: 31.9539 + (Math.random() - 0.5) * 0.05,
          lng: 35.9106 + (Math.random() - 0.5) * 0.05,
        },
        contactInfo: {
          phone: "+962 7 9876 5432",
          email: "info@fashionstore.com",
          website: "www.fashionstore.com",
        },
        openingHours: {
          monday: "10:00 AM - 8:00 PM",
          tuesday: "10:00 AM - 8:00 PM",
          wednesday: "10:00 AM - 8:00 PM",
          thursday: "10:00 AM - 8:00 PM",
          friday: "10:00 AM - 10:00 PM",
          saturday: "10:00 AM - 10:00 PM",
          sunday: "12:00 PM - 6:00 PM",
        },
        rating: 4.5,
        reviews: [],
        createdAt: new Date(2023, 3, 5),
      },
      {
        id: "store3",
        name: "Grocery Market",
        description: "Fresh produce and groceries delivered to your doorstep. We source directly from local farmers.",
        logo: "/colorful-grocery-aisle.png",
        coverImage: "/placeholder-y78m6.png",
        ownerId: "seller1",
        categories: ["Groceries", "Produce", "Bakery", "Dairy"],
        location: {
          address: "789 Market Street, Amman, Jordan",
          lat: 31.9539 + (Math.random() - 0.5) * 0.05,
          lng: 35.9106 + (Math.random() - 0.5) * 0.05,
        },
        contactInfo: {
          phone: "+962 7 5555 1234",
          email: "orders@grocerymarket.com",
          website: "www.grocerymarket.com",
        },
        openingHours: {
          monday: "8:00 AM - 10:00 PM",
          tuesday: "8:00 AM - 10:00 PM",
          wednesday: "8:00 AM - 10:00 PM",
          thursday: "8:00 AM - 10:00 PM",
          friday: "8:00 AM - 11:00 PM",
          saturday: "8:00 AM - 11:00 PM",
          sunday: "9:00 AM - 9:00 PM",
        },
        rating: 4.7,
        reviews: [],
        createdAt: new Date(2023, 2, 20),
      },
    ]
    localStorage.setItem(STORES_KEY, JSON.stringify(stores))
  }

  if (!localStorage.getItem(PRODUCTS_KEY)) {
    // Create mock products
    const products: Product[] = [
      {
        id: "product1",
        name: "Wireless Headphones",
        description: "Premium wireless headphones with noise cancellation and 30-hour battery life.",
        price: 199.99,
        category: "Electronics",
        storeId: "store1",
        image: "/wireless-headphones.png",
        inStock: true,
        rating: 4.9,
        createdAt: new Date(2023, 3, 10),
      },
      {
        id: "product2",
        name: "Smartphone",
        description: "Latest smartphone with 6.5-inch display, 128GB storage, and quad camera setup.",
        price: 799.99,
        category: "Electronics",
        storeId: "store1",
        image: "/modern-smartphone.png",
        inStock: true,
        rating: 4.7,
        createdAt: new Date(2023, 3, 12),
      },
      {
        id: "product3",
        name: "Laptop",
        description: "Powerful laptop with 16GB RAM, 512GB SSD, and dedicated graphics card.",
        price: 1299.99,
        category: "Computers",
        storeId: "store1",
        image: "/modern-laptop-workspace.png",
        inStock: false,
        rating: 4.8,
        createdAt: new Date(2023, 3, 15),
      },
      {
        id: "product4",
        name: "Men's T-Shirt",
        description: "Comfortable cotton t-shirt available in various colors and sizes.",
        price: 29.99,
        category: "Clothing",
        storeId: "store2",
        image: "/placeholder-idd5g.png",
        inStock: true,
        rating: 4.5,
        createdAt: new Date(2023, 3, 18),
      },
      {
        id: "product5",
        name: "Women's Jeans",
        description: "Stylish high-waisted jeans with stretch fabric for maximum comfort.",
        price: 59.99,
        category: "Clothing",
        storeId: "store2",
        image: "/placeholder-2erjl.png",
        inStock: true,
        rating: 4.6,
        createdAt: new Date(2023, 3, 20),
      },
      {
        id: "product6",
        name: "Sneakers",
        description: "Lightweight and durable sneakers perfect for casual wear or light exercise.",
        price: 89.99,
        category: "Footwear",
        storeId: "store2",
        image: "/diverse-sneaker-collection.png",
        inStock: true,
        rating: 4.4,
        createdAt: new Date(2023, 3, 22),
      },
      {
        id: "product7",
        name: "Fresh Vegetables Basket",
        description: "Assortment of fresh seasonal vegetables sourced from local farms.",
        price: 24.99,
        category: "Produce",
        storeId: "store3",
        image: "/placeholder-8fc7s.png",
        inStock: true,
        rating: 4.9,
        createdAt: new Date(2023, 3, 25),
      },
      {
        id: "product8",
        name: "Organic Milk",
        description: "Fresh organic milk from grass-fed cows. Available in 1L cartons.",
        price: 3.99,
        category: "Dairy",
        storeId: "store3",
        image: "/organic-milk.png",
        inStock: true,
        rating: 4.7,
        createdAt: new Date(2023, 3, 27),
      },
      {
        id: "product9",
        name: "Artisan Bread",
        description: "Freshly baked artisan bread made with organic flour and traditional methods.",
        price: 5.99,
        category: "Bakery",
        storeId: "store3",
        image: "/artisan-bread.png",
        inStock: true,
        rating: 4.8,
        createdAt: new Date(2023, 3, 29),
      },
    ]
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
  }

  if (!localStorage.getItem(REVIEWS_KEY)) {
    // Create mock reviews
    const reviews: Review[] = [
      {
        id: "review1",
        userId: "user1",
        name: "John Doe",
        avatar: "/vibrant-street-market.png",
        rating: 5,
        comment: "Excellent product! Exactly as described and arrived quickly.",
        createdAt: new Date(2023, 4, 5),
      },
      {
        id: "review2",
        userId: "user1",
        name: "John Doe",
        avatar: "/vibrant-street-market.png",
        rating: 4,
        comment: "Good quality product. Shipping was a bit slow but overall satisfied.",
        createdAt: new Date(2023, 4, 10),
      },
      {
        id: "review3",
        userId: "user1",
        name: "John Doe",
        avatar: "/vibrant-street-market.png",
        rating: 5,
        comment: "Amazing service and product quality. Will definitely buy again!",
        createdAt: new Date(2023, 4, 15),
      },
    ]
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews))
  }

  if (!localStorage.getItem(SERVICES_KEY)) {
    // Create mock services
    const services: Service[] = [
      // Gas Stations
      {
        id: "service1",
        name: "City Gas Station",
        description: "24/7 gas station with convenience store and car wash.",
        category: "Gas Stations",
        tags: ["fuel", "gas", "convenience"],
        location: {
          address: "321 Fuel Street, Amman, Jordan",
          lat: 31.9639 + (Math.random() - 0.5) * 0.05,
          lng: 35.9306 + (Math.random() - 0.5) * 0.05,
        },
        contactInfo: {
          phone: "+962 7 2222 3333",
          email: "info@citygas.com",
          website: "www.citygas.com",
        },
        openingHours: {
          monday: "Open 24 Hours",
          tuesday: "Open 24 Hours",
          wednesday: "Open 24 Hours",
          thursday: "Open 24 Hours",
          friday: "Open 24 Hours",
          saturday: "Open 24 Hours",
          sunday: "Open 24 Hours",
        },
        isEmergency: false,
        isOpen: true,
        image: "/classic-gas-station.png",
        rating: 4.5,
        reviewCount: 32,
        createdAt: new Date(2023, 4, 1),
        fuelTypes: ["Regular", "Premium", "Diesel"],
        regularPrice: "0.95 JOD",
        premiumPrice: "1.10 JOD",
        dieselPrice: "0.85 JOD",
        lastUpdated: "2 hours ago",
        features: ["Car Wash", "Convenience Store", "ATM", "Restrooms"],
      },
      {
        id: "service2",
        name: "Express Fuel",
        description: "Quick service gas station with competitive prices and friendly staff.",
        category: "Gas Stations",
        tags: ["fuel", "gas", "express"],
        location: {
          address: "456 Highway Road, Amman, Jordan",
          lat: 31.9539 + (Math.random() - 0.5) * 0.05,
          lng: 35.9106 + (Math.random() - 0.5) * 0.05,
        },
        contactInfo: {
          phone: "+962 7 3333 4444",
          email: "contact@expressfuel.com",
          website: "www.expressfuel.com",
        },
        openingHours: {
          monday: "6:00 AM - 12:00 AM",
          tuesday: "6:00 AM - 12:00 AM",
          wednesday: "6:00 AM - 12:00 AM",
          thursday: "6:00 AM - 12:00 AM",
          friday: "6:00 AM - 1:00 AM",
          saturday: "6:00 AM - 1:00 AM",
          sunday: "7:00 AM - 11:00 PM",
        },
        isEmergency: false,
        isOpen: true,
        image: "/placeholder-yd50h.png",
        rating: 4.3,
        reviewCount: 28,
        createdAt: new Date(2023, 4, 5),
        fuelTypes: ["Regular", "Premium", "Diesel", "Electric Charging"],
        regularPrice: "0.93 JOD",
        premiumPrice: "1.08 JOD",
        dieselPrice: "0.83 JOD",
        lastUpdated: "5 hours ago",
        features: ["Electric Charging", "Convenience Store", "Coffee Shop"],
      },

      // Grocery Stores
      {
        id: "service3",
        name: "Fresh Market Grocery",
        description: "Local grocery store with fresh produce, meats, and everyday essentials.",
        category: "Grocery Stores",
        tags: ["grocery", "food", "fresh"],
        location: {
          address: "789 Market Street, Amman, Jordan",
          lat: 31.9739 + (Math.random() - 0.5) * 0.05,
          lng: 35.9206 + (Math.random() - 0.5) * 0.05,
        },
        contactInfo: {
          phone: "+962 7 4444 5555",
          email: "info@freshmarket.com",
          website: "www.freshmarket.com",
        },
        openingHours: {
          monday: "8:00 AM - 10:00 PM",
          tuesday: "8:00 AM - 10:00 PM",
          wednesday: "8:00 AM - 10:00 PM",
          thursday: "8:00 AM - 10:00 PM",
          friday: "8:00 AM - 11:00 PM",
          saturday: "8:00 AM - 11:00 PM",
          sunday: "9:00 AM - 9:00 PM",
        },
        isEmergency: false,
        isOpen: true,
        image: "/grocery-store-produce.png",
        rating: 4.7,
        reviewCount: 56,
        createdAt: new Date(2023, 4, 10),
        facilityType: "Supermarket",
        features: ["Fresh Produce", "Bakery", "Deli", "Delivery Available"],
        priceRange: "$$",
      },
      {
        id: "service4",
        name: "Family Supermarket",
        description: "One-stop shop for all your grocery needs with competitive prices.",
        category: "Grocery Stores",
        tags: ["grocery", "supermarket", "family"],
        location: {
          address: "123 Shopping Avenue, Amman, Jordan",
          lat: 31.9839 + (Math.random() - 0.5) * 0.05,
          lng: 35.9406 + (Math.random() - 0.5) * 0.05,
        },
        contactInfo: {
          phone: "+962 7 5555 6666",
          email: "service@familysupermarket.com",
          website: "www.familysupermarket.com",
        },
        openingHours: {
          monday: "7:00 AM - 11:00 PM",
          tuesday: "7:00 AM - 11:00 PM",
          wednesday: "7:00 AM - 11:00 PM",
          thursday: "7:00 AM - 11:00 PM",
          friday: "7:00 AM - 12:00 AM",
          saturday: "7:00 AM - 12:00 AM",
          sunday: "8:00 AM - 10:00 PM",
        },
        isEmergency: false,
        isOpen: true,
        image: "/supermarket-interior.png",
        rating: 4.5,
        reviewCount: 78,
        createdAt: new Date(2023, 4, 15),
        facilityType: "Hypermarket",
        features: ["Fresh Produce", "Bakery", "Pharmacy", "Electronics", "Household Items"],
        priceRange: "$",
      },

      // Restaurants
      {
        id: "service5",
        name: "Olive Garden Restaurant",
        description: "Authentic Mediterranean cuisine in a cozy atmosphere.",
        category: "Restaurants",
        tags: ["food", "dining", "mediterranean"],
        location: {
          address: "456 Dining Street, Amman, Jordan",
          lat: 31.9539 + (Math.random() - 0.5) * 0.05,
          lng: 35.9106 + (Math.random() - 0.5) * 0.05,
        },
        contactInfo: {
          phone: "+962 7 6666 7777",
          email: "reservations@olivegarden.com",
          website: "www.olivegarden-restaurant.com",
        },
        openingHours: {
          monday: "12:00 PM - 10:00 PM",
          tuesday: "12:00 PM - 10:00 PM",
          wednesday: "12:00 PM - 10:00 PM",
          thursday: "12:00 PM - 10:00 PM",
          friday: "12:00 PM - 11:00 PM",
          saturday: "12:00 PM - 11:00 PM",
          sunday: "1:00 PM - 9:00 PM",
        },
        isEmergency: false,
        isOpen: true,
        image: "/placeholder.svg?height=400&width=600&query=mediterranean+restaurant",
        rating: 4.8,
        reviewCount: 124,
        createdAt: new Date(2023, 4, 20),
        cuisineType: ["Mediterranean", "Italian", "Middle Eastern"],
        priceRange: "$$$",
        features: ["Outdoor Seating", "Reservations", "Delivery", "Takeout"],
      },
      {
        id: "service6",
        name: "Spice House",
        description: "Authentic Indian and Asian cuisine with vegetarian options.",
        category: "Restaurants",
        tags: ["food", "dining", "indian", "asian"],
        location: {
          address: "789 Spice Road, Amman, Jordan",
          lat: 31.9639 + (Math.random() - 0.5) * 0.05,
          lng: 35.9306 + (Math.random() - 0.5) * 0.05,
        },
        contactInfo: {
          phone: "+962 7 7777 8888",
          email: "info@spicehouse.com",
          website: "www.spicehouse-restaurant.com",
        },
        openingHours: {
          monday: "11:00 AM - 10:00 PM",
          tuesday: "11:00 AM - 10:00 PM",
          wednesday: "11:00 AM - 10:00 PM",
          thursday: "11:00 AM - 10:00 PM",
          friday: "11:00 AM - 11:00 PM",
          saturday: "11:00 AM - 11:00 PM",
          sunday: "12:00 PM - 9:00 PM",
        },
        isEmergency: false,
        isOpen: true,
        image: "/placeholder.svg?height=400&width=600&query=indian+restaurant",
        rating: 4.6,
        reviewCount: 98,
        createdAt: new Date(2023, 4, 25),
        cuisineType: ["Indian", "Asian", "Vegetarian"],
        priceRange: "$$",
        features: ["Delivery", "Takeout", "Online Ordering"],
      },

      // Medical Services
      {
        id: "service7",
        name: "City Medical Center",
        description: "Comprehensive healthcare services with experienced doctors and modern facilities.",
        category: "Medical Services",
        tags: ["medical", "healthcare", "hospital"],
        location: {
          address: "123 Health Avenue, Amman, Jordan",
          lat: 31.9739 + (Math.random() - 0.5) * 0.05,
          lng: 35.9206 + (Math.random() - 0.5) * 0.05,
        },
        contactInfo: {
          phone: "+962 7 8888 9999",
          email: "info@citymedical.com",
          website: "www.citymedicalcenter.com",
        },
        openingHours: {
          monday: "Open 24 Hours",
          tuesday: "Open 24 Hours",
          wednesday: "Open 24 Hours",
          thursday: "Open 24 Hours",
          friday: "Open 24 Hours",
          saturday: "Open 24 Hours",
          sunday: "Open 24 Hours",
        },
        isEmergency: true,
        isOpen: true,
        image: "/placeholder.svg?height=400&width=600&query=hospital+building",
        rating: 4.7,
        reviewCount: 156,
        createdAt: new Date(2023, 5, 1),
        facilityType: "Hospital",
        specialties: ["Emergency Care", "Surgery", "Pediatrics", "Cardiology", "Orthopedics"],
        features: ["Emergency Services", "24/7 Care", "Online Appointments", "Insurance Accepted"],
        emergency: true,
      },
      {
        id: "service8",
        name: "Family Pharmacy",
        description: "Your neighborhood pharmacy for prescriptions, over-the-counter medications, and health advice.",
        category: "Medical Services",
        tags: ["medical", "pharmacy", "medications"],
        location: {
          address: "456 Wellness Street, Amman, Jordan",
          lat: 31.9839 + (Math.random() - 0.5) * 0.05,
          lng: 35.9406 + (Math.random() - 0.5) * 0.05,
        },
        contactInfo: {
          phone: "+962 7 9999 0000",
          email: "info@familypharmacy.com",
          website: "www.familypharmacy.com",
        },
        openingHours: {
          monday: "8:00 AM - 10:00 PM",
          tuesday: "8:00 AM - 10:00 PM",
          wednesday: "8:00 AM - 10:00 PM",
          thursday: "8:00 AM - 10:00 PM",
          friday: "9:00 AM - 11:00 PM",
          saturday: "9:00 AM - 11:00 PM",
          sunday: "10:00 AM - 8:00 PM",
        },
        isEmergency: false,
        isOpen: true,
        image: "/placeholder.svg?height=400&width=600&query=pharmacy+interior",
        rating: 4.5,
        reviewCount: 87,
        createdAt: new Date(2023, 5, 5),
        facilityType: "Pharmacy",
        specialties: ["Prescriptions", "OTC Medications", "Health Consultations"],
        features: ["Medication Delivery", "Health Consultations", "Vaccinations"],
      },

      // Auto Services
      {
        id: "service9",
        name: "Quick Fix Auto Repair",
        description: "Professional auto repair services with certified mechanics and fair pricing.",
        category: "Auto Services",
        tags: ["auto", "car", "repair"],
        location: {
          address: "789 Mechanic Street, Amman, Jordan",
          lat: 31.9539 + (Math.random() - 0.5) * 0.05,
          lng: 35.9106 + (Math.random() - 0.5) * 0.05,
        },
        contactInfo: {
          phone: "+962 7 1111 2222",
          email: "service@quickfixauto.com",
          website: "www.quickfixauto.com",
        },
        openingHours: {
          monday: "8:00 AM - 6:00 PM",
          tuesday: "8:00 AM - 6:00 PM",
          wednesday: "8:00 AM - 6:00 PM",
          thursday: "8:00 AM - 6:00 PM",
          friday: "8:00 AM - 4:00 PM",
          saturday: "9:00 AM - 3:00 PM",
          sunday: "Closed",
        },
        isEmergency: false,
        isOpen: true,
        image: "/placeholder.svg?height=400&width=600&query=auto+repair+shop",
        rating: 4.6,
        reviewCount: 112,
        createdAt: new Date(2023, 5, 10),
        serviceType: "Auto Repair",
        specialties: ["Engine Repair", "Brake Service", "Oil Change", "Diagnostics"],
        features: ["Certified Mechanics", "Warranty Service", "Loaner Cars"],
        emergency: false,
      },
      {
        id: "service10",
        name: "Luxury Car Wash",
        description: "Premium car wash and detailing services for all vehicle types.",
        category: "Auto Services",
        tags: ["auto", "car", "wash", "detailing"],
        location: {
          address: "123 Clean Street, Amman, Jordan",
          lat: 31.9639 + (Math.random() - 0.5) * 0.05,
          lng: 35.9306 + (Math.random() - 0.5) * 0.05,
        },
        contactInfo: {
          phone: "+962 7 2222 3333",
          email: "info@luxurycarwash.com",
          website: "www.luxurycarwash.com",
        },
        openingHours: {
          monday: "7:00 AM - 8:00 PM",
          tuesday: "7:00 AM - 8:00 PM",
          wednesday: "7:00 AM - 8:00 PM",
          thursday: "7:00 AM - 8:00 PM",
          friday: "7:00 AM - 9:00 PM",
          saturday: "7:00 AM - 9:00 PM",
          sunday: "8:00 AM - 6:00 PM",
        },
        isEmergency: false,
        isOpen: true,
        image: "/placeholder.svg?height=400&width=600&query=car+wash+service",
        rating: 4.8,
        reviewCount: 95,
        createdAt: new Date(2023, 5, 15),
        serviceType: "Car Wash",
        specialties: ["Hand Wash", "Interior Detailing", "Exterior Detailing", "Waxing"],
        features: ["Quick Service", "Premium Products", "Waiting Area"],
      },

      // Home Services
      {
        id: "service11",
        name: "Reliable Plumbing",
        description: "Professional plumbing services for residential and commercial properties.",
        category: "Home Services",
        tags: ["home", "plumbing", "repair"],
        location: {
          address: "456 Plumber Road, Amman, Jordan",
          lat: 31.9739 + (Math.random() - 0.5) * 0.05,
          lng: 35.9206 + (Math.random() - 0.5) * 0.05,
        },
        contactInfo: {
          phone: "+962 7 3333 4444",
          email: "service@reliableplumbing.com",
          website: "www.reliableplumbing.com",
        },
        openingHours: {
          monday: "8:00 AM - 6:00 PM",
          tuesday: "8:00 AM - 6:00 PM",
          wednesday: "8:00 AM - 6:00 PM",
          thursday: "8:00 AM - 6:00 PM",
          friday: "8:00 AM - 4:00 PM",
          saturday: "9:00 AM - 2:00 PM",
          sunday: "Emergency Only",
        },
        isEmergency: true,
        isOpen: true,
        image: "/placeholder.svg?height=400&width=600&query=plumber+working",
        rating: 4.7,
        reviewCount: 134,
        createdAt: new Date(2023, 5, 20),
        serviceType: "Plumbing",
        specialties: ["Leak Repair", "Pipe Installation", "Drain Cleaning", "Water Heaters"],
        features: ["Licensed & Insured", "Emergency Service", "Free Estimates"],
        emergency: true,
      },
      {
        id: "service12",
        name: "Elite Cleaning Services",
        description: "Professional home and office cleaning services with attention to detail.",
        category: "Home Services",
        tags: ["home", "cleaning", "housekeeping"],
        location: {
          address: "789 Clean Avenue, Amman, Jordan",
          lat: 31.9839 + (Math.random() - 0.5) * 0.05,
          lng: 35.9406 + (Math.random() - 0.5) * 0.05,
        },
        contactInfo: {
          phone: "+962 7 4444 5555",
          email: "bookings@elitecleaning.com",
          website: "www.elitecleaningservices.com",
        },
        openingHours: {
          monday: "8:00 AM - 7:00 PM",
          tuesday: "8:00 AM - 7:00 PM",
          wednesday: "8:00 AM - 7:00 PM",
          thursday: "8:00 AM - 7:00 PM",
          friday: "8:00 AM - 7:00 PM",
          saturday: "9:00 AM - 5:00 PM",
          sunday: "By Appointment",
        },
        isEmergency: false,
        isOpen: true,
        image: "/placeholder.svg?height=400&width=600&query=home+cleaning+service",
        rating: 4.9,
        reviewCount: 178,
        createdAt: new Date(2023, 5, 25),
        serviceType: "Cleaning",
        specialties: ["Regular Cleaning", "Deep Cleaning", "Move-in/Move-out", "Office Cleaning"],
        features: ["Bonded & Insured", "Eco-friendly Products", "Online Booking"],
      },

      // Internet & Tech Services
      {
        id: "service13",
        name: "Fast Connect Internet",
        description: "High-speed internet services for residential and business customers.",
        category: "Internet & Tech",
        tags: ["tech", "internet", "ISP"],
        location: {
          address: "123 Network Street, Amman, Jordan",
          lat: 31.9539 + (Math.random() - 0.5) * 0.05,
          lng: 35.9106 + (Math.random() - 0.5) * 0.05,
        },
        contactInfo: {
          phone: "+962 7 5555 6666",
          email: "support@fastconnect.com",
          website: "www.fastconnect.com",
        },
        openingHours: {
          monday: "9:00 AM - 8:00 PM",
          tuesday: "9:00 AM - 8:00 PM",
          wednesday: "9:00 AM - 8:00 PM",
          thursday: "9:00 AM - 8:00 PM",
          friday: "10:00 AM - 6:00 PM",
          saturday: "10:00 AM - 6:00 PM",
          sunday: "12:00 PM - 5:00 PM",
        },
        isEmergency: false,
        isOpen: true,
        image: "/placeholder.svg?height=400&width=600&query=internet+service+provider",
        rating: 4.2,
        reviewCount: 245,
        createdAt: new Date(2023, 6, 1),
        serviceType: "Internet Provider",
        specialties: ["Fiber Optic", "DSL", "Business Solutions", "Home Internet"],
        features: ["24/7 Support", "No Data Caps", "Free Installation"],
      },
      {
        id: "service14",
        name: "Tech Wizards",
        description: "Computer repair, IT support, and technology solutions for home and business.",
        category: "Internet & Tech",
        tags: ["tech", "computer", "repair", "IT"],
        location: {
          address: "456 Tech Boulevard, Amman, Jordan",
          lat: 31.9639 + (Math.random() - 0.5) * 0.05,
          lng: 35.9306 + (Math.random() - 0.5) * 0.05,
        },
        contactInfo: {
          phone: "+962 7 6666 7777",
          email: "help@techwizards.com",
          website: "www.techwizards.com",
        },
        openingHours: {
          monday: "9:00 AM - 7:00 PM",
          tuesday: "9:00 AM - 7:00 PM",
          wednesday: "9:00 AM - 7:00 PM",
          thursday: "9:00 AM - 7:00 PM",
          friday: "9:00 AM - 5:00 PM",
          saturday: "10:00 AM - 4:00 PM",
          sunday: "Closed",
        },
        isEmergency: false,
        isOpen: true,
        image: "/placeholder.svg?height=400&width=600&query=computer+repair+shop",
        rating: 4.8,
        reviewCount: 167,
        createdAt: new Date(2023, 6, 5),
        serviceType: "Tech Support",
        specialties: ["Computer Repair", "Virus Removal", "Data Recovery", "Network Setup"],
        features: ["Remote Support", "On-site Service", "Business IT Solutions"],
        emergency: true,
      },

      // Delivery Services
      {
        id: "service15",
        name: "Speedy Delivery",
        description: "Fast and reliable package delivery services across the city.",
        category: "Delivery",
        tags: ["delivery", "courier", "package"],
        location: {
          address: "789 Delivery Road, Amman, Jordan",
          lat: 31.9739 + (Math.random() - 0.5) * 0.05,
          lng: 35.9206 + (Math.random() - 0.5) * 0.05,
        },
        contactInfo: {
          phone: "+962 7 7777 8888",
          email: "orders@speedydelivery.com",
          website: "www.speedydelivery.com",
        },
        openingHours: {
          monday: "8:00 AM - 10:00 PM",
          tuesday: "8:00 AM - 10:00 PM",
          wednesday: "8:00 AM - 10:00 PM",
          thursday: "8:00 AM - 10:00 PM",
          friday: "8:00 AM - 11:00 PM",
          saturday: "8:00 AM - 11:00 PM",
          sunday: "9:00 AM - 9:00 PM",
        },
        isEmergency: false,
        isOpen: true,
        image: "/placeholder.svg?height=400&width=600&query=delivery+service",
        rating: 4.6,
        reviewCount: 312,
        createdAt: new Date(2023, 6, 10),
        serviceType: "Package Delivery",
        deliveryTime: "1-3 hours",
        deliveryTypes: ["Packages", "Documents", "Food"],
        features: ["Live Tracking", "Insurance Available", "Same-day Delivery"],
        express: true,
      },
      {
        id: "service16",
        name: "Food Express",
        description: "Food delivery service partnering with the best restaurants in town.",
        category: "Delivery",
        tags: ["delivery", "food", "restaurants"],
        location: {
          address: "123 Foodie Street, Amman, Jordan",
          lat: 31.9839 + (Math.random() - 0.5) * 0.05,
          lng: 35.9406 + (Math.random() - 0.5) * 0.05,
        },
        contactInfo: {
          phone: "+962 7 8888 9999",
          email: "support@foodexpress.com",
          website: "www.foodexpress.com",
        },
        openingHours: {
          monday: "10:00 AM - 11:00 PM",
          tuesday: "10:00 AM - 11:00 PM",
          wednesday: "10:00 AM - 11:00 PM",
          thursday: "10:00 AM - 11:00 PM",
          friday: "10:00 AM - 12:00 AM",
          saturday: "10:00 AM - 12:00 AM",
          sunday: "11:00 AM - 10:00 PM",
        },
        isEmergency: false,
        isOpen: true,
        image: "/placeholder.svg?height=400&width=600&query=food+delivery+service",
        rating: 4.5,
        reviewCount: 428,
        createdAt: new Date(2023, 6, 15),
        serviceType: "Food Delivery",
        deliveryTime: "30-45 minutes",
        deliveryTypes: ["Restaurant Food", "Fast Food", "Groceries"],
        features: ["Live Tracking", "Contactless Delivery", "Special Offers"],
      },
    ]
    localStorage.setItem(SERVICES_KEY, JSON.stringify(services))
  }
}

// CRUD operations for stores
export function getStores(): Store[] {
  if (typeof window === "undefined") return []
  const stores = localStorage.getItem(STORES_KEY)
  return stores ? JSON.parse(stores) : []
}

export function getStoreById(id: string): Store | null {
  const stores = getStores()
  return stores.find((store) => store.id === id) || null
}

export function getStoresByOwner(ownerId: string): Store[] {
  const stores = getStores()
  return stores.filter((store) => store.ownerId === ownerId)
}

export function addStore(storeData: Omit<Store, "id" | "createdAt">): Store {
  const stores = getStores()
  const newStore: Store = {
    ...storeData,
    id: `store${Date.now()}`,
    createdAt: new Date(),
  }
  localStorage.setItem(STORES_KEY, JSON.stringify([...stores, newStore]))
  return newStore
}

export function updateStore(id: string, storeData: Partial<Store>): Store | null {
  const stores = getStores()
  const storeIndex = stores.findIndex((store) => store.id === id)

  if (storeIndex === -1) return null

  const updatedStore = { ...stores[storeIndex], ...storeData }
  stores[storeIndex] = updatedStore
  localStorage.setItem(STORES_KEY, JSON.stringify(stores))

  return updatedStore
}

export function deleteStore(id: string): boolean {
  const stores = getStores()
  const filteredStores = stores.filter((store) => store.id !== id)

  if (filteredStores.length === stores.length) return false

  localStorage.setItem(STORES_KEY, JSON.stringify(filteredStores))
  return true
}

// CRUD operations for products
export function getProducts(): Product[] {
  if (typeof window === "undefined") return []
  const products = localStorage.getItem(PRODUCTS_KEY)
  return products ? JSON.parse(products) : []
}

export function getProductById(id: string): Product | null {
  const products = getProducts()
  return products.find((product) => product.id === id) || null
}

export function getProductsByStore(storeId: string): Product[] {
  const products = getProducts()
  return products.filter((product) => product.storeId === storeId)
}

export function getProductsByCategory(category: string): Product[] {
  const products = getProducts()
  return products.filter((product) => product.category === category)
}

export function addProduct(productData: Omit<Product, "id" | "createdAt">): Product {
  const products = getProducts()
  const newProduct: Product = {
    ...productData,
    id: `product${Date.now()}`,
    createdAt: new Date(),
  }
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify([...products, newProduct]))
  return newProduct
}

export function updateProduct(id: string, productData: Partial<Product>): Product | null {
  const products = getProducts()
  const productIndex = products.findIndex((product) => product.id === id)

  if (productIndex === -1) return null

  const updatedProduct = { ...products[productIndex], ...productData }
  products[productIndex] = updatedProduct
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))

  return updatedProduct
}

export function deleteProduct(id: string): boolean {
  const products = getProducts()
  const filteredProducts = products.filter((product) => product.id !== id)

  if (filteredProducts.length === products.length) return false

  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filteredProducts))
  return true
}

// CRUD operations for reviews
export function getReviews(): Review[] {
  if (typeof window === "undefined") return []
  const reviews = localStorage.getItem(REVIEWS_KEY)
  return reviews ? JSON.parse(reviews) : []
}

export function getReviewsByUser(userId: string): Review[] {
  const reviews = getReviews()
  return reviews.filter((review) => review.userId === userId)
}

export function addReview(reviewData: Omit<Review, "id" | "createdAt">): Review {
  const reviews = getReviews()
  const newReview: Review = {
    ...reviewData,
    id: `review${Date.now()}`,
    createdAt: new Date(),
  }
  localStorage.setItem(REVIEWS_KEY, JSON.stringify([...reviews, newReview]))
  return newReview
}

export function updateReview(id: string, reviewData: Partial<Review>): Review | null {
  const reviews = getReviews()
  const reviewIndex = reviews.findIndex((review) => review.id === id)

  if (reviewIndex === -1) return null

  const updatedReview = { ...reviews[reviewIndex], ...reviewData }
  reviews[reviewIndex] = updatedReview
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews))

  return updatedReview
}

export function deleteReview(id: string): boolean {
  const reviews = getReviews()
  const filteredReviews = reviews.filter((review) => review.id !== id)

  if (filteredReviews.length === reviews.length) return false

  localStorage.setItem(REVIEWS_KEY, JSON.stringify(filteredReviews))
  return true
}

// User operations
export function getUsers(): User[] {
  if (typeof window === "undefined") return []
  const users = localStorage.getItem(USERS_KEY)
  return users ? JSON.parse(users) : []
}

export function getUserById(id: string): User | null {
  const users = getUsers()
  return users.find((user) => user.id === id) || null
}

export function getUserByRole(role: "user" | "seller" | "admin"): User[] {
  const users = getUsers()
  return users.filter((user) => user.role === role)
}

// CRUD operations for services
export function getServices(): Service[] {
  if (typeof window === "undefined") return []
  const services = localStorage.getItem(SERVICES_KEY)
  return services ? JSON.parse(services) : []
}

export function getServiceById(id: string): Service | null {
  const services = getServices()
  return services.find((service) => service.id === id) || null
}

export function deleteService(id: string): boolean {
  const services = getServices()
  const filteredServices = services.filter((service) => service.id !== id)

  if (filteredServices.length === services.length) return false

  localStorage.setItem(SERVICES_KEY, JSON.stringify(filteredServices))
  return true
}
