import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuCategories } from '../data/menu';
import { locations } from '../data/locations';
import { useForm } from '@formspree/react';

const Menu = () => {
  const [cart, setCart] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('pizza');
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    mobile: '',
    address: '',
    instructions: ''
  });
  const [showCart, setShowCart] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [cartNotification, setCartNotification] = useState('');
  const [state, handleSubmit] = useForm("mjkgqzqr");

  // Clear notification after 2 seconds
  useEffect(() => {
    if (cartNotification) {
      const timer = setTimeout(() => {
        setCartNotification('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [cartNotification]);

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

  const getTotalAmount = () => {
    return cart.reduce((total, item) => {
      if (item.prices) {
        return total + (item.selectedPrice || item.prices.medium) * (item.quantity || 1);
      }
      return total + (item.price * (item.quantity || 1));
    }, 0);
  };

  const getFinalAmount = () => {
    return getTotalAmount();
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!customerDetails.name || !customerDetails.mobile) {
      alert('Please provide your name and mobile number');
      return;
    }

    try {
      const response = await handleSubmit({
        orderDetails: JSON.stringify({
          customerName: customerDetails.name,
          mobileNumber: customerDetails.mobile,
          deliveryLocation: selectedLocation,
          fullAddress: customerDetails.address,
          specialInstructions: customerDetails.instructions,
          totalAmount: getFinalAmount(),
          items: cart.map(item => ({
            name: item.name,
            quantity: item.quantity || 1,
            price: item.prices ? (item.selectedPrice || item.prices.medium) : item.price,
            size: item.selectedSize || (item.prices ? 'medium' : 'regular')
          })),
          orderDate: new Date().toLocaleString()
        }, null, 2)
      });
      
      if (state.succeeded) {
        alert('Order placed successfully! You will receive a confirmation email shortly.');
        setCart([]);
        setSelectedLocation('');
        setCustomerDetails({
          name: '',
          mobile: '',
          address: '',
          instructions: ''
        });
        setShowOrderForm(false);
      }
    } catch (error) {
      alert('There was an error placing your order. Please try again.');
    }
  };

  const addToCart = (item) => {
    const cartItem = {
      ...item,
      quantity: 1,
      selectedSize: item.prices ? 'medium' : undefined,
      selectedPrice: item.prices ? item.prices.medium : item.price
    };
    setCart([...cart, cartItem]);
    setCartNotification('+1');
  };

  const updateQuantity = (itemIndex, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = [...cart];
    updatedCart[itemIndex] = {
      ...updatedCart[itemIndex],
      quantity: newQuantity
    };
    setCart(updatedCart);
  };

  const updateSize = (itemIndex, newSize) => {
    const updatedCart = [...cart];
    updatedCart[itemIndex] = {
      ...updatedCart[itemIndex],
      selectedSize: newSize,
      selectedPrice: updatedCart[itemIndex].prices[newSize]
    };
    setCart(updatedCart);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
    setCartNotification('-1');
  };

  return (
    <div className="min-h-screen py-20 bg-gray-50 relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-primary"
          >
            Our Menu
          </motion.h1>
          <div className="relative">
            {cart.length > 0 && (
              <button
                onClick={() => setShowCart(true)}
                className="bg-primary text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <span>View Cart</span>
                <div className="bg-white text-primary rounded-full w-6 h-6 flex items-center justify-center">
                  {cart.length}
                </div>
              </button>
            )}
            <AnimatePresence>
              {cartNotification && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`absolute -top-4 -right-4 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                    cartNotification.includes('+') ? 'bg-green-500' : 'bg-red-500'
                  } text-white`}
                >
                  {cartNotification}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
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
                  <div className="space-y-1 mb-4">
                    <p>Small: ₹{item.prices.small}</p>
                    <p>Medium: ₹{item.prices.medium}</p>
                    <p>Large: ₹{item.prices.large}</p>
                  </div>
                ) : (
                  <p className="text-lg mb-4">₹{item.price}</p>
                )}
                {cart.find(cartItem => cartItem.name === item.name) ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const cartIndex = cart.findIndex(cartItem => cartItem.name === item.name);
                          const currentQty = cart[cartIndex].quantity || 1;
                          if (currentQty === 1) {
                            removeFromCart(cartIndex);
                          } else {
                            updateQuantity(cartIndex, currentQty - 1);
                          }
                        }}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                      >
                        -
                      </button>
                      <span className="text-lg font-medium">
                        {cart.find(cartItem => cartItem.name === item.name)?.quantity || 1}
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const cartIndex = cart.findIndex(cartItem => cartItem.name === item.name);
                          const currentQty = cart[cartIndex].quantity || 1;
                          updateQuantity(cartIndex, currentQty + 1);
                        }}
                        className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full hover:bg-opacity-90 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        const cartIndex = cart.findIndex(cartItem => cartItem.name === item.name);
                        removeFromCart(cartIndex);
                      }}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fixed Bottom Bar for Cart Summary and Proceed to Order */}
        {cart.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t p-4 z-40">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div>
                  <div className="text-lg font-semibold">Total: ₹{getTotalAmount()}</div>
                </div>
                <div className="text-gray-600">
                  ({cart.length} {cart.length === 1 ? 'item' : 'items'})
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowCart(true)}
                  className="text-primary hover:text-primary-dark"
                >
                  View Cart
                </button>
                <button
                  onClick={() => setShowOrderForm(true)}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Proceed to Order
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cart Modal */}
        {showCart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Your Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      {item.prices && (
                        <select
                          value={item.selectedSize || 'medium'}
                          onChange={(e) => updateSize(index, e.target.value)}
                          className="text-sm border rounded px-2 py-1 mt-1"
                        >
                          <option value="small">Small - ₹{item.prices.small}</option>
                          <option value="medium">Medium - ₹{item.prices.medium}</option>
                          <option value="large">Large - ₹{item.prices.large}</option>
                        </select>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600">
                        {item.quantity || 1} × ₹{item.prices ? (item.selectedPrice || item.prices.medium) : item.price}
                      </p>
                      <p className="font-medium">
                        ₹{(item.prices ? (item.selectedPrice || item.prices.medium) : item.price) * (item.quantity || 1)}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Amount:</span>
                    <span>₹{getTotalAmount()}</span>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setShowCart(false);
                      setShowOrderForm(true);
                    }}
                    className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    Proceed to Order
                  </button>
                  <button
                    onClick={() => setShowCart(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order Form Modal */}
        {showOrderForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Complete Your Order</h2>
                <button
                  onClick={() => setShowOrderForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleOrder} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                    className="w-full border rounded-md py-2 px-3"
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={customerDetails.mobile}
                    onChange={(e) => setCustomerDetails({...customerDetails, mobile: e.target.value})}
                    className="w-full border rounded-md py-2 px-3"
                    required
                    placeholder="Enter your mobile number"
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit mobile number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Location *
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full border rounded-md py-2 px-3"
                    required
                  >
                    <option value="">Select Location</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.name}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Address
                  </label>
                  <textarea
                    value={customerDetails.address}
                    onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                    className="w-full border rounded-md py-2 px-3"
                    rows="2"
                    placeholder="Enter your detailed address, landmarks, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Instructions
                  </label>
                  <textarea
                    value={customerDetails.instructions}
                    onChange={(e) => setCustomerDetails({...customerDetails, instructions: e.target.value})}
                    className="w-full border rounded-md py-2 px-3"
                    rows="2"
                    placeholder="Any special instructions for cooking or delivery?"
                  />
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Amount:</span>
                    <span>₹{getTotalAmount()}</span>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
                  >
                    {state.submitting ? 'Placing Order...' : 'Place Order'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowOrderForm(false);
                      setShowCart(true);
                    }}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Back to Cart
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu; 