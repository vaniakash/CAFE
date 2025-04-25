import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaHeart } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05,
      }
    }
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const iconVariants = {
    closed: {
      rotate: 0,
    },
    open: {
      rotate: 180,
    }
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">Cafe Tea</span>
              <FaHeart className="text-red-500 mx-1" />
              <span className="text-2xl font-bold text-primary">AMO</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-secondary transition-colors duration-300">Home</Link>
            <Link to="/menu" className="text-gray-700 hover:text-secondary transition-colors duration-300">Menu</Link>
            <Link to="/locations" className="text-gray-700 hover:text-secondary transition-colors duration-300">Locations</Link>
            <Link to="/about" className="text-gray-700 hover:text-secondary transition-colors duration-300">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-secondary transition-colors duration-300">Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-secondary focus:outline-none"
              animate={isOpen ? "open" : "closed"}
              variants={iconVariants}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden bg-white overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <motion.div variants={itemVariants}>
                <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-secondary transition-colors duration-300">Home</Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link to="/menu" className="block px-3 py-2 text-gray-700 hover:text-secondary transition-colors duration-300">Menu</Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link to="/locations" className="block px-3 py-2 text-gray-700 hover:text-secondary transition-colors duration-300">Locations</Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-secondary transition-colors duration-300">About</Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:text-secondary transition-colors duration-300">Contact</Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 