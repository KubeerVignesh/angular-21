const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const products = [
  {
    name: 'Wireless Bluetooth Headphones',
    description:
      'High-quality wireless headphones with noise cancellation and 20-hour battery life.',
    price: 89.99,
    category: 'Electronics',
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
  },
  {
    name: 'Smart Watch Series 5',
    description: 'Track your fitness, heart rate, and notifications with this sleek smart watch.',
    price: 199.99,
    category: 'Electronics',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
  },
  {
    name: 'Premium Coffee Maker',
    description:
      'Brew the perfect cup of coffee every morning with this programmable coffee maker.',
    price: 49.99,
    category: 'Home & Kitchen',
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80',
  },
  {
    name: 'Running Shoes',
    description:
      'Lightweight and comfortable running shoes for your daily jog or marathon training.',
    price: 75.0,
    category: 'Sports',
    stock: 100,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
  },
  {
    name: 'Leather Wallet',
    description: 'Genuine leather wallet with multiple card slots and a sleek design.',
    price: 29.99,
    category: 'Fashion',
    stock: 75,
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-181ce5171c98?w=500&q=80',
  },
  {
    name: '4K Ultra HD Monitor',
    description: 'Experience crystal clear visuals with this 27-inch 4K monitor.',
    price: 349.99,
    category: 'Electronics',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80',
  },
  {
    name: 'Ergonomic Office Chair',
    description: 'Work in comfort with this adjustable ergonomic office chair with lumbar support.',
    price: 129.99,
    category: 'Furniture',
    stock: 10,
    imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80',
  },
  {
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat for all your fitness and meditation needs.',
    price: 19.99,
    category: 'Sports',
    stock: 60,
    imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80',
  },
  {
    name: 'Stainless Steel Water Bottle',
    description:
      'Keep your drinks cold for 24 hours or hot for 12 hours with this insulated bottle.',
    price: 24.99,
    category: 'Home & Kitchen',
    stock: 80,
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-01114195bc03?w=500&q=80',
  },
  {
    name: 'Wireless Gaming Mouse',
    description: 'Precision gaming mouse with customizable RGB lighting and programmable buttons.',
    price: 59.99,
    category: 'Electronics',
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80',
  },
  {
    name: 'Cotton T-Shirt',
    description: 'Soft and breathable 100% cotton t-shirt available in various colors.',
    price: 14.99,
    category: 'Fashion',
    stock: 200,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
  },
  {
    name: 'Mechanical Keyboard',
    description: 'Tactile mechanical keyboard for typing enthusiasts and gamers.',
    price: 89.99,
    category: 'Electronics',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b91a91e?w=500&q=80',
  },
  {
    name: 'Digital Camera',
    description: "Capture life's moments with this high-resolution digital camera.",
    price: 499.0,
    category: 'Electronics',
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80',
  },
  {
    name: 'Backpack',
    description: 'Durable backpack with laptop compartment and plenty of storage space.',
    price: 39.99,
    category: 'Fashion',
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
  },
  {
    name: 'Blender',
    description: 'High-speed blender for making smoothies, soups, and sauces.',
    price: 69.99,
    category: 'Home & Kitchen',
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1570222094114-28a9d88a2b64?w=500&q=80',
  },
  {
    name: 'Sunglasses',
    description: 'Stylish sunglasses with UV protection for sunny days.',
    price: 19.99,
    category: 'Fashion',
    stock: 90,
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80',
  },
  {
    name: 'Desk Lamp',
    description: 'Adjustable LED desk lamp with multiple brightness levels.',
    price: 25.99,
    category: 'Home & Kitchen',
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1534073828943-f801091a7d58?w=500&q=80',
  },
  {
    name: 'Portable Speaker',
    description: 'Compact portable speaker with powerful sound and water resistance.',
    price: 45.0,
    category: 'Electronics',
    stock: 55,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
  },
  {
    name: 'Notebook',
    description: 'Premium hardcover notebook for journaling and note-taking.',
    price: 12.99,
    category: 'Stationery',
    stock: 120,
    imageUrl: 'https://images.unsplash.com/photo-1531346878377-a513bc95ba0d?w=500&q=80',
  },
  {
    name: 'Plant Pot',
    description: 'Ceramic plant pot to add greenery to your home or office.',
    price: 15.99,
    category: 'Home & Garden',
    stock: 65,
    imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80',
  },
];

const seedProducts = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Find or create the specific user
    const email = 'hello@gmail.com';
    let user = await User.findOne({ email });

    if (!user) {
      console.log(`User ${email} not found. Creating...`);
      user = await User.create({
        name: 'Hello User',
        email: email,
        password: 'password123', // Will be hashed by pre-save hook
        role: 'user',
      });
      console.log(`User ${email} created.`);
    } else {
      console.log(`User ${email} found.`);
    }

    console.log(`Assigning products to user: ${user.name} (${user._id})`);

    // Add createdBy field to all products
    const productsWithUser = products.map((product, index) => ({
      ...product,
      createdBy: user._id,
      id: index + 1,
    }));

    // Clear existing products to verify precise seeding
    console.log('Clearing existing products...');
    await Product.deleteMany({});

    const createdProducts = await Product.insertMany(productsWithUser);

    console.log(`Successfully imported ${createdProducts.length} products for ${email}!`);

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedProducts();
