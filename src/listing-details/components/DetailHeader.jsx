import React from "react";
import { HiCalendarDateRange } from "react-icons/hi2";

function DetailHeader({ itemDetails }) {
  return (
    <div className="bg-[#8e52ff] rounded-lg 
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
    hover:before:opacity-100 w-fit p-10 mb-10">
      {itemDetails?.listingTitle ? (
        <div className="text-white">
          <h2 className="font-bold text-3xl mb-2">{itemDetails?.listingTitle}</h2>
          <p className="mb-2 font-bold">{itemDetails?.tagline}</p>
          <div className="flex gap-2 items-center w-fit mb-6 ">
            <HiCalendarDateRange className="h-7 w-7" />
            <h2 className=" text-sm font-bold">{itemDetails?.postedOn}</h2>
          </div>
        </div>
      ) : (
        <div className="w-[300px] rounded-xl h-[100px] bg-slate-200 animate-pulse"></div>
      )}
    </div>
  );
}

export default DetailHeader;
