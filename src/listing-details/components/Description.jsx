import React from "react";

function Description({ itemDetails }) {

  return (
    <div>
      {itemDetails?.listingDescription ? (
        <div className="p-5 rounded-xl bg-white mt-7 
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
          <h2 className="my-2 font-medium text-2xl">Description</h2>
          <p>{itemDetails?.listingDescription}</p>
        </div>
      ) : (
        <div className="w-full h-[150px] bg-slate-200 animate-pulse rounded-xl"></div>
      )}
    </div>
  );
}

export default Description;
