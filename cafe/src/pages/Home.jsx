import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHeart, FaCoffee, FaMapMarkerAlt, FaMotorcycle } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[80vh] flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/images/about/FRONTI HOME IMAGE.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              Cafe Tea <FaHeart className="inline text-red-500" /> AMO
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Experience the taste of Harshil Valley
            </p>
            <Link
              to="/menu"
              className="bg-accent text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              Order Now
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              <FaCoffee className="text-4xl text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                We serve the finest tea and snacks made with locally sourced ingredients
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              <FaMapMarkerAlt className="text-4xl text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Prime Location</h3>
              <p className="text-gray-600">
                Located in the beautiful Harshil Valley near Gangotri
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-lg text-center"
            >
              <FaMotorcycle className="text-4xl text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quick Delivery</h3>
              <p className="text-gray-600">
                Fast delivery to 5 locations in and around Harshil Valley
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-xl mb-8">
            Experience the taste of our delicious menu items delivered to your location
          </p>
          <div className="space-x-4">
            <Link
              to="/menu"
              className="bg-accent text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              View Menu
            </Link>
            <Link
              to="/locations"
              className="bg-secondary text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              Delivery Areas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 