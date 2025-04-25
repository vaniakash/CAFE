import { motion } from 'framer-motion';
import { FaMedal, FaBicycle, FaMountain, FaHeart } from 'react-icons/fa';

const About = () => {
  const achievements = [
    {
      icon: <FaBicycle />,
      title: "World Record Holder",
      description: "First woman to complete Lukla to Everest Base Camp (5364m) in 64 hours"
    },
    {
      icon: <FaMountain />,
      title: "Mountain Conquerer",
      description: "Climbed Mount Trishul (23,359 feet) in Garhwal in 2019"
    },
    {
      icon: <FaBicycle />,
      title: "National Cycling Icon",
      description: "First woman to cycle across all 29 Indian states, covering 12,500 km"
    },
    {
      icon: <FaMedal />,
      title: "Adventure Pioneer",
      description: "First woman to reach Umling La (19,300 ft) - world's highest motorable road"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-primary mb-4">Our Story</h1>
          <p className="text-xl text-gray-600">Where Adventure Meets Culinary Excellence</p>
        </motion.div>

        {/* Founder's Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">Meet Our Founder</h2>
              <h3 className="text-xl font-semibold text-secondary mb-4">Sabita Mahato</h3>
              <p className="text-gray-600 mb-4">
                From selling fish in Bihar to conquering the world's highest roads, Sabita Mahato's journey is a testament to determination and breaking barriers. A national-level volleyball player turned mountaineer and cyclist, she has shattered records and inspired thousands.
              </p>
              <p className="text-gray-600 mb-4">
                After achieving numerous mountaineering and cycling records, Sabita chose the serene Harshil Valley to establish Cafe Tea ❤️ AMO, a place where adventure meets comfort, and where every cup of tea tells a story of determination.
              </p>
              <p className="text-gray-600">
                Her mission extends beyond serving delicious food - it's about empowering local communities and inspiring young women to chase their dreams, no matter how high they might seem.
              </p>
            </div>
            <div className="flex justify-center items-center">
              <div className="w-64 h-64 rounded-full overflow-hidden shadow-xl border-4 border-secondary">
                <img
                  src="/images/about/SABITA_MAHATO.jpeg"
                  alt="Sabita Mahato - Mountain Guide and Cafe Founder"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl text-secondary mb-4">{achievement.icon}</div>
              <h3 className="text-xl font-semibold text-primary mb-2">{achievement.title}</h3>
              <p className="text-gray-600">{achievement.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Cafe Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Vision</h2>
            <div className="flex justify-center text-secondary text-4xl mb-4">
              <FaHeart />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-primary mb-3">Community</h3>
              <p className="text-gray-600">
                Creating opportunities and empowering local communities in Harshil Valley through sustainable tourism and employment.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-primary mb-3">Quality</h3>
              <p className="text-gray-600">
                Serving the finest local ingredients with love and care, making every meal an experience to remember.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-primary mb-3">Adventure</h3>
              <p className="text-gray-600">
                Inspiring visitors to embrace the spirit of adventure while enjoying the beauty of the Himalayas.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <blockquote className="text-2xl italic text-gray-600">
            "If you have determination, you can conquer anything. Nothing in this world is impossible."
            <footer className="text-lg font-semibold mt-2">- Sabita Mahato</footer>
          </blockquote>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 