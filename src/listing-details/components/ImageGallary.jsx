import React from "react";

function ImageGallery({ itemDetails }) {
  return (
    <div className="rounded-lg 
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
            hover:before:opacity-100">
      {itemDetails?.images[0].imageUrl ? (
        <img
          src={itemDetails?.images[0].imageUrl}
          alt="Item Images"
          className="shadow-md w-full h-[500px] object-cover rounded-xl"
        />
      ) : (
        <div className="w-full h-[350px] bg-slate-200 animate-pulse rounded-xl mt-1"></div>
      )}
    </div>
  );
}

export default ImageGallery;
