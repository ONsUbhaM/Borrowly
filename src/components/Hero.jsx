import React from "react";
import { motion } from "framer-motion";
import Search from "./Search";
import Headersecond from "./ui/Headersecond";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const imageVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "anticipate"
    }
  }
};

function Hero() {
  return (
    <div>
      <div
        className="flex flex-col items-center p-10 py-15 gap-6 w-full 
        bg-[url(/banner-bg.jpg)] bg-cover bg-center bg-no-repeat bg-blend-overlay relative"
      >
        <Headersecond />
        <motion.div
          className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between min-h-[400px] py-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            className="text-white max-w-xl md:max-w-lg lg:max-w-xl"
            variants={containerVariants}
          >
            <motion.p className="text-xl font-semibold mb-2" variants={itemVariants}>
              Borrowly market place
            </motion.p>
            
            <motion.h1 
              className="font-extrabold text-2xl sm:text-4xl md:text-5xl leading-tight mb-6"
              variants={itemVariants}
            >
              Submit, Rent, Biggest rental
              <br />
              market place.
            </motion.h1>
            
            <motion.div 
              className="bg-[#1a0e3a69] p-2 rounded-xl mb-2"
              variants={itemVariants}
            >
              <motion.p className="text-sm sm:text-base text-white" variants={itemVariants}>
                Renting with Borrowly is safe, secure, and hassle-free. Enjoy
                24/7 customer support and peace of mind on every rental. With
                Borrowly, your trust is our top priority. Secure payments,
                verified listings, and round-the-clock support. Borrow
                confidently — our platform ensures safety for both renters and
                owners. From electronics to equipment, rent anything worry-free
                with Borrowly. Fast, reliable, and protected rentals — only on
                Borrowly.
              </motion.p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Search/>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mt-10 md:mt-0 md:ml-12 flex-shrink-0 rounded-xl overflow-hidden max-w-[320px] sm:max-w-[400px] md:max-w-[480px]"
            variants={imageVariants}
          >
            <motion.img
              alt="Man wearing VR headset with purple smoke background, rounded corners"
              className="w-full h-auto rounded-xl object-cover"
              src="https://storage.googleapis.com/a1aa/image/6a1c817f-8733-4fd8-4780-8c44769bf03c.jpg"
              width={480}
              height={320}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;