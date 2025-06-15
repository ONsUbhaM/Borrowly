import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FormatResult } from "@/Shared/Services";
import { db } from "./../../configs";
import { ItemListing, ItemImages } from "./../../configs/schema";
import { desc, eq } from "drizzle-orm";
import { Skeleton } from "@/components/ui/skeleton";
import CycleItem2 from "./CycleItem2";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

function MostSearchedItem() {
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    GetPopularItemList();
  }, []);

  const GetPopularItemList = async () => {
    try {
      const result = await db
        .select()
        .from(ItemListing)
        .leftJoin(ItemImages, eq(ItemListing.id, ItemImages.itemListingId))
        .orderBy(desc(ItemListing.id))
        .limit(10);

      const resp = FormatResult(result);
      setItemList(resp);
    } catch (error) {
      console.error("Error fetching popular items:", error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "backOut"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="px-4 sm:px-8 md:px-16 lg:px-24"
    >
      <motion.h2 
        className="font-bold text-2xl sm:text-3xl text-center mb-6 text-black"
        variants={itemVariants}
      >
        Explore Some <span className="catagorySpan">Items</span> In Market.
      </motion.h2>
      
      {loading ? (
        <div className="grid grid-cols-2 grid-rows-1 gap-4">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <Carousel
          opts={{
            align: "center",
          }}
          className="w-full max-w-[80vw]"
        >
          <CarouselContent className="-ml-1">
            {itemList.map((car, index) => (
              <CarouselItem 
                key={index} 
                className="pl-1 sm:basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/4"
              >
                <div className="p-1">
                  {/* <CycleItem car={car} /> */}
                  {<CycleItem2 car={car}/>}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex !bg-white !border !border-gray-200 rounded-full" />
          <CarouselNext className="hidden sm:flex !bg-white !border !border-gray-200 rounded-full" />
        </Carousel>
      )}
    </motion.div>
  );
}

export default MostSearchedItem;