import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

const Contact = () => {
  const cafeLocation = [31.039250, 78.738083]; // Main branch coordinates

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [38, 38],
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-primary mb-8 text-center"
        >
          Contact Us
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <FaMapMarkerAlt className="text-secondary text-xl mt-1" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-600">
                    Harsil (हर्षिल)<br />
                    Uttarkashi District<br />
                    Uttarakhand 249135<br />
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaPhone className="text-secondary text-xl mt-1" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600">
                    +91 6204624983<br />
                    +91 7060624324
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaEnvelope className="text-secondary text-xl mt-1" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">contact@cafeteaamo.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaClock className="text-secondary text-xl mt-1" />
                <div>
                  <h3 className="font-semibold">Opening Hours</h3>
                  <p className="text-gray-600">
                    Monday - Sunday<br />
                    8:00 AM - 8:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Delivery Information</h3>
              <p className="text-gray-600">
                We deliver to all locations in Harsil Valley.<br />
                Delivery Charge: ₹50<br />
                Parcel Charge: ₹30
              </p>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden h-[500px]"
          >
            <MapContainer
              center={cafeLocation}
              zoom={15}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={cafeLocation} icon={customIcon}>
                <Popup>
                  <div className="text-center">
                    <h3 className="font-semibold">Cafe Tea ❤️ AMO</h3>
                    <p>Main Branch - Harsil Valley</p>
                    <p className="text-sm text-gray-500">
                      {cafeLocation[0].toFixed(6)}°N, {cafeLocation[1].toFixed(6)}°E
                    </p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </motion.div>
        </div>

        {/* Social Media Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-white rounded-lg shadow-lg p-6 text-center"
        >
          <h2 className="text-2xl font-bold text-primary mb-4">Follow Us</h2>
          <p className="text-lg mb-2">Instagram: @Cafeteamo2023</p>
          <p className="text-gray-600 mt-4">We serve with Love ❤️</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact; 