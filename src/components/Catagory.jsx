import React, { useEffect } from "react";
import Data from "@/Shared/Data";
import { Link } from "react-router-dom";
import MostSearchedItem from "./mostSearchedCycle";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Catagory() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="flex flex-col items-center p-4 sm:p-6 md:p-10 py-8 md:py-15 gap-4 md:gap-6 w-full 
      bg-white bg-cover bg-center bg-no-repeat bg-blend-overlay relative"
    >
      <motion.div 
        variants={itemVariants}
        className="w-[80px] md:w-[100px] h-[2px] bg-[#7453fc] mx-auto mt-8 md:mt-14 mb-2 md:mb-4"
      ></motion.div>
      
      <motion.h2 
        variants={itemVariants}
        className="font-bold text-xl sm:text-2xl md:text-3xl text-center mb-4 md:mb-6 text-black px-4"
      >
        Browse Through Our <span className="catagorySpan">Categories</span> Here.
      </motion.h2>
      
      <motion.div 
        variants={containerVariants}
        className="grid place-items-center grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3 sm:gap-4 md:gap-6 px-4 sm:px-6 md:px-20 w-full"
      >
        {Data.Catagory.map((cat) => (
          <motion.div
            key={cat.id}
            variants={itemVariants}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full"
          >
            <Link to={"search/" + cat.name} className="block w-full">
              <div className="border-[1px] bg-[#7453fc] rounded-md p-3 sm:p-4 md:p-6 items-center flex flex-col hover:bg-black transition-all duration-300 cursor-pointer">
                <div className="flex justify-center items-center bg-white p-1 sm:p-2 rounded-full">
                  <img 
                    src={cat.icon} 
                    alt={cat.name} 
                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-[35px] md:h-[35px]" 
                  />
                </div>
                <h2 className="text-white text-sm sm:text-base md:text-lg mt-1 md:mt-2 text-center">{cat.name}</h2>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="w-[80px] md:w-[100px] h-[2px] bg-[#7453fc] mx-auto mb-2 md:mb-4"
      ></motion.div>
      <div className="hidden md:block">
      <MostSearchedItem/>
      </div>
    </motion.div>
  );
}

export default Catagory;