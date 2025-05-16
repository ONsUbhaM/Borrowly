import React, { useEffect } from 'react'
import Header from '@/components/ui/Header'
import { useState } from 'react'
import { db } from '../../configs'
import { eq, asc, desc } from 'drizzle-orm'
import { FormatResult } from '@/Shared/Services'
import { ItemListing, ItemImages } from '../../configs/schema'
import CycleItem from '@/components/CycleItem'

function AllItems() {

    const [itemList, setItemList] = useState([]);
    useEffect(()=>{
        GetListinngDetails();
    },[])
    
    const GetListinngDetails = async ()=> {
        const result = await db.select().from(ItemListing)
        .leftJoin(ItemImages, eq(ItemImages.itemListingId, ItemListing.id))
        .orderBy(desc(ItemListing.id));

        let resp = FormatResult(result);
        resp = resp.sort((a, b) => b.id - a.id);
        
        setItemList(resp);
        console.log(resp);
    }
  return (
    <div>
        {/* header */}
        <Header/>
        {/* all items */}
        <div className='grid grid-cols-3 grid-rows-3 gap-2 p-3'>
            {
                itemList.map((item) => (
                    <div key={item.id}>
                        <CycleItem car={item}/>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default AllItems