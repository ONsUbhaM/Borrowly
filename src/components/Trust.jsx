import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Trust() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

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
    hidden: { y: 30, opacity: 0 },
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

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="w-full !bg-[url(/main-bg.jpg)] bg-cover bg-center bg-no-repeat bg-blend-overlay relative p-30"
    >
      {/* Header Section */}
      <motion.div 
        variants={itemVariants}
        className="flex justify-between"
      >
        <div className="flex flex-col gap-5">
          <motion.div 
            variants={itemVariants}
            className="bg-white h-[2px] w-[90px]"
          ></motion.div>
          <motion.div 
            variants={itemVariants}
            className="font-bold text-3xl text-white"
          >
            Create Your Own Listing and Put It On The Market.
          </motion.div>
        </div>
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to={"/profile"}>
            <Button className="text-white !bg-[#7553fc] !rounded-full hover:!bg-[#6347d8] transition-colors">
              Submit Listing
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        variants={containerVariants}
        className="flex mt-20 flex-wrap justify-center gap-8 md:flex-nowrap md:gap-4"
      >
        {/* Feature 1 */}
        <motion.div 
          variants={itemVariants}
          className="flex-1 min-w-[250px]"
        >
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="flex justify-center items-center h-[50px] w-[50px] !bg-white !rounded-full mx-auto"
          >
            <img src="/icon-01.png" alt="Safety icon" className="h-[40px] w-[40px]"/>
          </motion.div>
          <h3 className="text-white font-bold text-xl mt-3 text-center">Safety</h3>
          <p className="text-white mt-3 text-center">
            Enjoy secure rentals, trusted transactions, and round-the-clock customer care.
          </p>
        </motion.div>

        {/* Divider 1 */}
        <motion.div 
          variants={lineVariants}
          className="hidden md:flex flex-col !text-white items-center justify-center mx-4 gap-3"
        >
          <p>1</p>
          <div className="h-[180px] w-[1px] !bg-white origin-top"></div>
        </motion.div>

        {/* Feature 2 */}
        <motion.div 
          variants={itemVariants}
          className="flex-1 min-w-[250px]"
        >
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="flex justify-center items-center h-[50px] w-[50px] !bg-white !rounded-full mx-auto"
          >
            <img src="/icon-04.png" alt="Secure icon" className="h-[40px] w-[40px]"/>
          </motion.div>
          <h3 className="text-white font-bold text-xl mt-3 text-center">Secure</h3>
          <p className="text-white mt-3 text-center">
            We use encrypted messages, verified user profiles, and constant monitoring to keep you safe.
          </p>
        </motion.div>

        {/* Divider 2 */}
        <motion.div 
          variants={lineVariants}
          className="hidden md:flex flex-col !text-white items-center justify-center mx-4 gap-3"
        >
          <p>2</p>
          <div className="h-[180px] w-[1px] !bg-white origin-top"></div>
        </motion.div>

        {/* Feature 3 */}
        <motion.div 
          variants={itemVariants}
          className="flex-1 min-w-[250px]"
        >
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="flex justify-center items-center h-[50px] w-[50px] !bg-white !rounded-full mx-auto"
          >
            <img src="/icon-06.png" alt="Support icon" className="h-[40px] w-[40px]"/>
          </motion.div>
          <h3 className="text-white font-bold text-xl mt-3 text-center">Support</h3>
          <p className="text-white mt-3 text-center">
            All users and listings are verified, with 24/7 support always ready to help.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Trust;