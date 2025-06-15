import React from "react";
import { Link } from "react-router-dom";

// border border-[#8e52ff]  

function CycleItem2({ car }) {
  return (
    <Link to={"/listing-details/" + car?.id}>
    <div className="max-w-xs w-full rounded-xl overflow-hidden bg-[#7453fc]
    shadow-[0_30px_60px_rgba(0,0,0,0.15)]
            border border-gray-100
            transform transition-all duration-300
            hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]
            hover:-translate-y-1.5
            relative
            before:content-[''] before:absolute before:inset-0 
            before:rounded-lg before:pointer-events-none
            before:shadow-[0_10px_30px_rgba(0,0,0,0.2)] 
            before:opacity-0 before:transition-opacity before:duration-300
            hover:before:opacity-100
    ">
    <img
      src={car?.images[0]?.imageUrl}
      alt="Product Image"
      className="w-full object-cover"
      width="600"
      height="400"
    />
    <div className="p-5 text-white">
      <h2 className="font-bold text-lg mb-3 border-b border-[#444455] pb-3">
        {car?.listingTitle}
      </h2>
      <div className="flex justify-between text-sm mb-5">
        <div>
          <p>Posted on</p>
          <p className="font-bold text-base">{car?.postedOn}</p>
        </div>
        <div className="text-right">
          <p>price</p>
          <p className="font-bold text-base">{car?.rentalprice}₹</p>
        </div>
      </div>
      <button className=" hover:!bg-[#8e52ff] hover:!scale-105 hover:!shadow-lg transition-all duration-300 cursor-pointer !rounded-full py-2 text-white font-semibold !border-2 !border-[#8e52ff]">
        Explore
      </button>
    </div>
  </div>
  </Link>
  );
}

export default CycleItem2;
