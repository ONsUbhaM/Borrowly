import ItemDetailsCard from "@/Shared/ItemDetailsCard";
import React from "react";
import IconField from "@/add-listing/components/IconField";

function ItemProperties({ itemDetails }) {
  return (
    <div className="p-10 rounded-xl mt-7
    
    shadow-[0_30px_60px_rgba(0,0,0,0.15)]
    border border-gray-100
    transform transition-all duration-300
    hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]
    hover:-translate-y-1.5
    before:opacity-0; before:transition-opacity; before:duration-300
    hover:before:opacity-100
    ">
      <h2 className="font-medium text-xl">Item Details</h2>
      {itemDetails ? (
        ItemDetailsCard.map((item, index) => (
          <div key={index} className="mt-5 flex items-center justify-between">
            <h2 className="flex gap-2">
              <IconField icon={item.icon} />
              {item.label}{" "}
            </h2>
            <h2>{itemDetails?.[item.name]}</h2>
          </div>
        ))
      ) : (
        <div className="w-full h-[500px] rounded-xl bg-slate-200 animate-pulse"></div>
      )}
    </div>
  );
}

export default ItemProperties;
