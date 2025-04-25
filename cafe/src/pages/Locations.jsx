import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Locations = () => {
  // Convert DMS coordinates to decimal degrees
  const locations = [
    {
      name: "Cafe Tea ❤️ AMO - Place 1",
      coordinates: [31.039250, 78.738083], // 31°02'21.3"N 78°44'17.1"E
      description: "Our main branch in Harshil Valley"
    },
    {
      name: "Cafe Tea ❤️ AMO - Place 2",
      coordinates: [31.038250, 78.742444], // 31°02'17.7"N 78°44'32.8"E
      description: "Riverside cafe with scenic views"
    },
    {
      name: "Cafe Tea ❤️ AMO - Place 3",
      coordinates: [31.040083, 78.731778], // 31°02'24.3"N 78°43'54.4"E
      description: "Mountain view cafe"
    },
    {
      name: "Cafe Tea ❤️ AMO - Place 4",
      coordinates: [31.039194, 78.737917], // 31°02'21.1"N 78°44'16.5"E
      description: "Cozy corner cafe"
    },
    {
      name: "Cafe Tea ❤️ AMO - Place 5",
      coordinates: [31.037306, 78.728694], // 31°02'14.3"N 78°43'43.3"E
      description: "Forest edge cafe"
    }
  ];

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [38, 38],
  });

  // Center the map on the average position of all locations
  const centerLat = locations.reduce((sum, loc) => sum + loc.coordinates[0], 0) / locations.length;
  const centerLng = locations.reduce((sum, loc) => sum + loc.coordinates[1], 0) / locations.length;

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-8 text-primary"
        >
          Our Locations
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="h-[600px] w-full">
            <MapContainer
              center={[centerLat, centerLng]}
              zoom={14}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {locations.map((location, index) => (
                <Marker
                  key={index}
                  position={location.coordinates}
                  icon={customIcon}
                >
                  <Popup>
                    <div className="text-center">
                      <h3 className="font-semibold text-lg">{location.name}</h3>
                      <p className="text-gray-600">{location.description}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {location.coordinates[0].toFixed(6)}°N, {location.coordinates[1].toFixed(6)}°E
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </motion.div>

        {/* Location List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {locations.map((location, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-primary mb-2">{location.name}</h3>
              <p className="text-gray-600 mb-4">{location.description}</p>
              <p className="text-sm text-gray-500">
                Coordinates: {location.coordinates[0].toFixed(6)}°N, {location.coordinates[1].toFixed(6)}°E
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-white rounded-lg shadow-lg p-6 text-center"
        >
          <h2 className="text-2xl font-bold text-primary mb-4">Contact Information</h2>
          <p className="text-lg">Phone: 6204624983 / 7060624324</p>
          <p className="text-gray-600 mt-2">We serve with Love ❤️</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Locations; 