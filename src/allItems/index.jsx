import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/ui/Header'
import { db } from '../../configs'
import { eq, asc, desc } from 'drizzle-orm'
import { FormatResult } from '@/Shared/Services'
import { ItemListing, ItemImages } from '../../configs/schema'
import CycleItem2 from '@/components/CycleItem2'
import Headersecond from '@/components/ui/Headersecond'

function AllItems() {
    const [itemList, setItemList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        GetListinngDetails();
    }, [])
    
    const GetListinngDetails = async () => {
        try {
            const result = await db.select()
                .from(ItemListing)
                .leftJoin(ItemImages, eq(ItemImages.itemListingId, ItemListing.id))
                .orderBy(desc(ItemListing.id));

            const resp = FormatResult(result);
            setItemList(resp);
        } catch (error) {
            console.error("Error fetching items:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='w-full'>
            {/* header */}
            <div className="pt-10 p-10 w-full 
      bg-[url(/main-bg.jpg)] bg-cover bg-center bg-no-repeat bg-blend-overlay relative">
            <Headersecond/>
            </div>
            
            {/* all items */}
            <div className="w-[100px] h-[2px] bg-[#7453fc] mx-auto mt-14 mb-4"></div>

            {/* Preloader */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-5 gap-3 min-h-[300px]"
                    >
                        {[...Array(10)].map((_, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0.5, y: 20 }}
                                animate={{ 
                                    opacity: [0.5, 1, 0.5],
                                    y: 0
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: index * 0.1
                                }}
                                className="bg-[#7553fc] rounded-lg h-[200px]"
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Content */}
            {!isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 p-10 md:px-20'
                >
                    {itemList.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <CycleItem2 car={item}/>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    )
}

export default AllItems