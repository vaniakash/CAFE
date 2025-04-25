import { useState } from 'react';
import { motion } from 'framer-motion';
import { menuCategories } from '../data/menu';
import { locations } from '../data/locations';

const Menu = () => {
  const [cart, setCart] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('pizza');

  const menuData = {
    pizza: [
      {
        name: 'Corn Pizza',
        prices: { small: 250.00, medium: 300.00, large: 350.00 },
        image: '/images/about/CORN PIZZA.jpeg'
      },
      {
        name: 'Onion Pizza',
        prices: { small: 250.00, medium: 300.00, large: 350.00 },
        image: '/images/about/ONIAN_PIZZA.jpg'
      },
      {
        name: 'Ham Pizza',
        prices: { small: 400.00, medium: 450.00, large: 500.00 },
        image: '/images/about/HAME PIZZA.jpeg'
      },
      {
        name: 'Capsicum Tikka',
        prices: { small: 350.00, medium: 400.00, large: 450.00 },
        image: '/images/about/Capsicum_Tikka.jpg'
      },
      {
        name: 'Fresh Keema Pizza',
        prices: { small: 400.00, medium: 500.00, large: 550.00 },
        image: '/images/about/Fresh Keema Pizza.webp'
      },
      {
        name: 'Tomato Pizza',
        prices: { small: 200.00, medium: 250.00, large: 300.00 },
        image: '/images/about/Tomato Pizza.jpg'
      }
    ],
    maggi: [
      { name: 'Plain Maggi', price: 40.00 },
      { name: 'Veg Maggi', price: 70.00 },
      { name: 'Egg Maggi', price: 90.00 },
      { name: 'Chicken Maggi', price: 120.00 },
      { name: 'Cheese Maggi (veg/non veg)', price: 150.00 }
    ],
    friedRice: [
      { name: 'Veg Fried Rice', price: 150.00 },
      { name: 'Egg Fried Rice', price: 180.00 },
      { name: 'Chicken Fried Rice', price: 250.00 },
      { name: 'Mix Fried Rice', price: 300.00 }
    ],
    beverages: [
      { name: 'Milk Tea', price: 30.00 },
      { name: 'Black Tea', price: 20.00 },
      { name: 'Lemon Tea', price: 40.00 },
      { name: 'Ginger Lemon Tea', price: 70.00 },
      { name: 'Regular Coffee', price: 120.00 },
      { name: 'Cold Coffee', price: 150.00 },
      { name: 'Black Coffee', price: 100.00 }
    ]
  };

  const extras = [
    { name: 'EX Cheese', price: 75 },
    { name: 'Corn', price: 50 },
    { name: 'Parcel Charge', price: 30 },
    { name: 'Delivery Charge', price: 50 }
  ];

  const comboOffer = {
    name: 'Coffee & Fries Combo',
    price: 199
  };

  const addToCart = (item) => {
    setCart([...cart, { ...item, quantity: 1 }]);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleOrder = () => {
    if (!selectedLocation) {
      alert('Please select a delivery location');
      return;
    }
    if (cart.length === 0) {
      alert('Please add items to your cart');
      return;
    }
    
    const orderSummary = `Order placed successfully!\n\nDelivery Location: ${selectedLocation}\nTotal Amount: ₹${getTotalAmount()}\n\nItems:\n${cart.map(item => `${item.name} x${item.quantity}`).join('\n')}`;
    alert(orderSummary);
    setCart([]);
    setSelectedLocation('');
  };

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-8 text-primary"
        >
          Our Menu
        </motion.h1>

        {/* Category Selection */}
        <div className="flex justify-center space-x-4 mb-8">
          {Object.keys(menuData).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                selectedCategory === category
                  ? 'bg-secondary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuData[selectedCategory].map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {selectedCategory === 'pizza' && (
                <div className="h-48 bg-gray-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-primary mb-2">{item.name}</h3>
                {item.prices ? (
                  <div className="space-y-1">
                    <p>Small: ₹{item.prices.small}</p>
                    <p>Medium: ₹{item.prices.medium}</p>
                    <p>Large: ₹{item.prices.large}</p>
                  </div>
                ) : (
                  <p className="text-lg">₹{item.price}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Extras Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-primary mb-4">Extras</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {extras.map((extra) => (
              <div key={extra.name} className="text-center">
                <p className="font-semibold">{extra.name}</p>
                <p>₹{extra.price}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Combo Offer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-secondary text-white rounded-lg shadow-lg p-6 text-center"
        >
          <h2 className="text-2xl font-bold mb-2">Special Combo Offer!</h2>
          <p className="text-xl">{comboOffer.name}</p>
          <p className="text-2xl font-bold">₹{comboOffer.price}</p>
        </motion.div>

        {/* Cart */}
        <div className="bg-white rounded-lg shadow-lg p-6 h-fit sticky top-20">
          <h2 className="text-2xl font-semibold mb-4">Your Order</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full border rounded-md py-2 px-3"
            >
              <option value="">Select Location</option>
              {locations.map((location) => (
                <option key={location.id} value={location.name}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>

          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">₹{item.price} x {item.quantity}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="text-gray-500 hover:text-primary"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-gray-500 hover:text-primary"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>₹{getTotalAmount()}</span>
                </div>
              </div>

              <button
                onClick={handleOrder}
                className="w-full bg-primary text-white py-2 rounded hover:bg-opacity-90 transition-colors"
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu; 