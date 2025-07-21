// Sample data for testing product management
export const sampleProducts = {
  Featured: [
    {
      title: "Premium Smart Home Bundle",
      description: "Complete smart home starter kit with hub, sensors, and smart lights",
      price: 499.99,
      category: "Featured",
      stock: 20,
      featured: true,
      imageUrl: "https://example.com/smart-home-bundle.jpg"
    },
    {
      title: "2023 Limited Edition Sports Car",
      description: "Collector's edition performance vehicle with custom paint job",
      price: 75000.00,
      category: "Featured",
      stock: 2,
      featured: true,
      imageUrl: "https://example.com/limited-sports-car.jpg"
    }
  ],
  Electronics: [
    {
      title: "55\" 4K Smart TV",
      description: "Ultra HD Smart TV with HDR and built-in streaming apps",
      price: 699.99,
      category: "Electronics",
      stock: 15
    },
    {
      title: "Wireless Noise-Canceling Headphones",
      description: "Premium bluetooth headphones with active noise cancellation",
      price: 249.99,
      category: "Electronics",
      stock: 30
    },
    {
      title: "Gaming Laptop",
      description: "15.6\" Gaming Laptop with RTX 3060, 16GB RAM, 512GB SSD",
      price: 1299.99,
      category: "Electronics",
      stock: 10
    },
    {
      title: "Smartphone",
      description: "Latest model smartphone with 5G capability and triple camera",
      price: 899.99,
      category: "Electronics",
      stock: 25
    },
    {
      title: "Wireless Earbuds",
      description: "True wireless earbuds with noise isolation and long battery life",
      price: 159.99,
      category: "Electronics",
      stock: 40
    }
  ],
  Cars: [
    {
      title: "2023 Luxury Sedan",
      description: "Executive sedan with leather interior and advanced safety features",
      price: 45000.00,
      category: "Cars",
      stock: 5
    },
    {
      title: "2023 SUV CrossOver",
      description: "Family-friendly SUV with third-row seating and panoramic roof",
      price: 38000.00,
      category: "Cars",
      stock: 8
    },
    {
      title: "2023 Electric Vehicle",
      description: "All-electric vehicle with 300-mile range and autopilot features",
      price: 52000.00,
      category: "Cars",
      stock: 6
    },
    {
      title: "2023 Sports Car",
      description: "High-performance sports car with premium features",
      price: 65000.00,
      category: "Cars",
      stock: 3
    },
    {
      title: "2023 Hybrid Sedan",
      description: "Fuel-efficient hybrid with modern technology package",
      price: 32000.00,
      category: "Cars",
      stock: 10
    }
  ],
  "Accessories": [
    {
      title: "Premium Car Cover",
      description: "All-weather protective car cover with soft interior lining",
      price: 89.99,
      category: "Accessories",
      stock: 45,
      imageUrl: "https://example.com/car-cover.jpg"
    },
    {
      title: "Wireless Car Charger Mount",
      description: "Fast charging car mount with automatic clamping",
      price: 49.99,
      category: "Accessories",
      stock: 60,
      imageUrl: "https://example.com/car-charger.jpg"
    },
    {
      title: "LED Interior Light Kit",
      description: "Customizable LED interior lighting system",
      price: 79.99,
      category: "Accessories",
      stock: 40,
      imageUrl: "https://example.com/led-kit.jpg"
    }
  ],
  "Services": [
    {
      title: "Premium Car Detailing",
      description: "Complete interior and exterior detailing service",
      price: 299.99,
      category: "Services",
      stock: 999,
      type: "service",
      duration: "4 hours"
    },
    {
      title: "Annual Maintenance Package",
      description: "Comprehensive yearly maintenance service package",
      price: 599.99,
      category: "Services",
      stock: 999,
      type: "service",
      duration: "1 year"
    },
    {
      title: "Paint Protection Service",
      description: "Professional ceramic coating application",
      price: 899.99,
      category: "Services",
      stock: 999,
      type: "service",
      duration: "2 days"
    }
  ],
  "Spare Parts": [
    {
      title: "Brake Pad Set",
      description: "High-performance brake pads for various vehicle models",
      price: 89.99,
      category: "Spare Parts",
      stock: 50
    },
    {
      title: "Oil Filter Pack",
      description: "Premium quality oil filters for regular maintenance",
      price: 12.99,
      category: "Spare Parts",
      stock: 100
    },
    {
      title: "Car Battery",
      description: "Heavy-duty car battery with 3-year warranty",
      price: 129.99,
      category: "Spare Parts",
      stock: 30
    },
    {
      title: "Air Filter Set",
      description: "Performance air filters for improved engine breathing",
      price: 24.99,
      category: "Spare Parts",
      stock: 75
    },
    {
      title: "Spark Plug Kit",
      description: "Set of 4 high-quality spark plugs",
      price: 34.99,
      category: "Spare Parts",
      stock: 60
    }
  ]
};

export const addSampleProducts = async (axios, API_URL, getAuthHeaders) => {
  try {
    for (const category in sampleProducts) {
      for (const product of sampleProducts[category]) {
        await axios.post(
          `${API_URL}/api/admin/products`,
          product,
          getAuthHeaders()
        );
      }
    }
    return true;
  } catch (error) {
    console.error('Error adding sample products:', error);
    return false;
  }
};
