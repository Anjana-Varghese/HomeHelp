export const workers = [
  {
    id: 1,
    name: "John Smith",
    category: "Electrician",
    rating: 4.8,
    experience: "5 years",
    location: "Downtown",
    phone: "+1234567890",
    email: "john.smith@email.com",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    availability: ["2024-01-15", "2024-01-16", "2024-01-17"],
    pricePerHour: 25,
    description: "Experienced electrician specializing in residential and commercial electrical work."
  },
  {
    id: 2,
    name: "Maria Garcia",
    category: "Maid",
    rating: 4.9,
    experience: "3 years",
    location: "Uptown",
    phone: "+1234567891",
    email: "maria.garcia@email.com",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    availability: ["2024-01-15", "2024-01-18", "2024-01-19"],
    pricePerHour: 18,
    description: "Professional house cleaning service with attention to detail."
  },
  {
    id: 3,
    name: "David Wilson",
    category: "Plumber",
    rating: 4.7,
    experience: "8 years",
    location: "Midtown",
    phone: "+1234567892",
    email: "david.wilson@email.com",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    availability: ["2024-01-16", "2024-01-17", "2024-01-20"],
    pricePerHour: 30,
    description: "Licensed plumber with expertise in pipe repair and installation."
  },
  {
    id: 4,
    name: "Sarah Johnson",
    category: "Gardener",
    rating: 4.6,
    experience: "4 years",
    location: "Suburbs",
    phone: "+1234567893",
    email: "sarah.johnson@email.com",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    availability: ["2024-01-15", "2024-01-17", "2024-01-19"],
    pricePerHour: 22,
    description: "Professional landscaping and garden maintenance services."
  },
  {
    id: 5,
    name: "Michael Brown",
    category: "Electrician",
    rating: 4.5,
    experience: "6 years",
    location: "Downtown",
    phone: "+1234567894",
    email: "michael.brown@email.com",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    availability: ["2024-01-16", "2024-01-18", "2024-01-20"],
    pricePerHour: 28,
    description: "Certified electrician with solar panel installation experience."
  },
  {
    id: 6,
    name: "Lisa Davis",
    category: "Maid",
    rating: 4.8,
    experience: "2 years",
    location: "Uptown",
    phone: "+1234567895",
    email: "lisa.davis@email.com",
    photo: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    availability: ["2024-01-15", "2024-01-17", "2024-01-18"],
    pricePerHour: 20,
    description: "Reliable cleaning service with eco-friendly products."
  }
];

export const tools = [
  {
    id: 1,
    name: "Electric Drill",
    category: "Power Tools",
    pricePerDay: 15,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    availability: ["2024-01-15", "2024-01-16", "2024-01-17"],
    description: "High-power electric drill with multiple bits included.",
    ownerId: 1
  },
  {
    id: 2,
    name: "Lawn Mower",
    category: "Garden Tools",
    pricePerDay: 25,
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    availability: ["2024-01-16", "2024-01-18", "2024-01-19"],
    description: "Gas-powered lawn mower, perfect for medium to large lawns.",
    ownerId: 4
  },
  {
    id: 3,
    name: "Pipe Wrench Set",
    category: "Plumbing Tools",
    pricePerDay: 12,
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    availability: ["2024-01-15", "2024-01-17", "2024-01-20"],
    description: "Complete set of pipe wrenches for plumbing work.",
    ownerId: 3
  },
  {
    id: 4,
    name: "Pressure Washer",
    category: "Cleaning Tools",
    pricePerDay: 30,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    availability: ["2024-01-16", "2024-01-17", "2024-01-19"],
    description: "High-pressure washer for cleaning driveways and exterior surfaces.",
    ownerId: 2
  },
  {
    id: 5,
    name: "Circular Saw",
    category: "Power Tools",
    pricePerDay: 20,
    image: "https://images.unsplash.com/photo-1609205807107-e4ec2120f9e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    availability: ["2024-01-15", "2024-01-18", "2024-01-20"],
    description: "Professional circular saw for woodworking projects.",
    ownerId: 5
  },
  {
    id: 6,
    name: "Hedge Trimmer",
    category: "Garden Tools",
    pricePerDay: 18,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    availability: ["2024-01-16", "2024-01-17", "2024-01-18"],
    description: "Electric hedge trimmer for maintaining garden hedges.",
    ownerId: 4
  }
];

export const bookings = [
  {
    id: 1,
    workerId: 1,
    userId: 1,
    date: "2024-01-15",
    time: "09:00",
    status: "confirmed",
    service: "Electrical repair",
    address: "123 Main St, Downtown"
  },
  {
    id: 2,
    workerId: 2,
    userId: 1,
    date: "2024-01-16",
    time: "14:00",
    status: "pending",
    service: "House cleaning",
    address: "456 Oak Ave, Uptown"
  }
];

export const notifications = [
  {
    id: 1,
    message: "Your booking with John Smith has been confirmed for Jan 15, 2024",
    type: "success",
    timestamp: new Date().toISOString(),
    read: false
  },
  {
    id: 2,
    message: "Maria Garcia has accepted your cleaning request",
    type: "info",
    timestamp: new Date().toISOString(),
    read: false
  },
  {
    id: 3,
    message: "Payment of $150 received for completed service",
    type: "success",
    timestamp: new Date().toISOString(),
    read: true
  }
];