import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FormatResult } from "@/Shared/Services";
import { db } from "./../../configs";
import { ItemListing, ItemImages } from "./../../configs/schema";
import { desc, asc, eq } from "drizzle-orm";
import { Skeleton } from "@/components/ui/skeleton";
import CycleItem2 from "./CycleItem2";

function MoreItems() {
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetPopularItemList();
  }, []);

  const GetPopularItemList = async () => {
    try {
      const result = await db
        .select()
        .from(ItemListing)
        .leftJoin(ItemImages, eq(ItemListing.id, ItemImages.itemListingId))
        .orderBy(asc(ItemListing.id))
        .limit(10);

      const resp = FormatResult(result);
      setItemList(resp);
    } catch (error) {
      console.error("Error fetching popular items:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full !bg-white bg-cover bg-center bg-no-repeat bg-blend-overlay relative p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col gap-2 md:gap-5">
          <div className="bg-[#7553fc] h-[2px] w-[90px]"></div>
          <div className="font-bold text-xl md:text-3xl text-black">
            Create Your Own Listing and Put It On The Market.
          </div>
        </div>
        <div>
          <div className="text-white font-bold !bg-[#7553fc] !rounded-full p-2 md:p-3 text-sm md:text-base">
            Old Listings
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 p-2 md:p-3 mt-6 md:mt-10">
        {itemList.map((item) => (
          <div key={item.id}>
            <CycleItem2 car={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoreItems;