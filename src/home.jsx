import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import Catagory from './components/Catagory';
import InfoSection from './components/infoSection';
import Footer from './components/Footer';
import Trust from './components/Trust';
import MoreItems from './components/MoreItems';

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (replace with your actual loading logic)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-gray-900"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: [0.8, 1, 0.8],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity
              }}
              className="w-20 h-20 bg-violet-500 rounded-full"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-lg font-medium text-gray-800 dark:text-white"
            >
              Loading Borrowly...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <Hero/>
          <Catagory/>
          <Trust/>
          <MoreItems/>
          <Footer/>
        </>
      )}
    </div>
  );
}

export default Home;