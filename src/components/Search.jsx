import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CiSearch } from "react-icons/ci";
import Data from "@/Shared/Data";
import { Link } from "react-router-dom";

function Search() {
  const [condition, setCondition] = useState();
  const [itemName, setItemName] = useState();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
  };

  return (
    <div className="relative">
      {/* Mobile search trigger button (only visible on mobile) */}
      <button 
        className="md:hidden p-2 rounded-full !bg-white text-white"
        onClick={toggleMobileSearch}
      >
        <CiSearch className="text-2xl text-black" />
      </button>

      {/* Search container - hidden on mobile unless activated */}
      <div className={`${isMobileSearchOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center justify-between !bg-white rounded-2xl md:rounded-full px-4 py-3 md:px-2 md:py-0 gap-3 md:gap-4 w-full md:w-full absolute md:static top-full right-0 mt-2 z-50 shadow-lg md:shadow-none`}>
        <Select onValueChange={(value) => setCondition(value)}>
          <SelectTrigger className="text-black !bg-white outline-none border md:border-none w-full shadow-none text-base">
            <SelectValue placeholder="Condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Used">Used</SelectItem>
            <SelectItem value="Certified-Pre-owned">
              Certified Pre-owned
            </SelectItem>
          </SelectContent>
        </Select>

        <Separator className="md:hidden" />

        <Select onValueChange={(condition) => setItemName(condition)}>
          <SelectTrigger className="text-black !bg-white outline-none border md:border-none w-full shadow-none text-base md:text-lg">
            <SelectValue placeholder="Item" />
          </SelectTrigger>
          <SelectContent>
            {Data.Item.map((item) => (
              <SelectItem key={item.id} value={item.name}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Link 
          to={"/search?condition=" + condition + "&item=" + itemName}
          onClick={() => setIsMobileSearchOpen(false)}
          className="w-full md:w-auto"
        >
          <div className="rounded-full bg-violet-800 h-12 w-full md:h-[60px] md:w-[60px] flex justify-center items-center mt-2 md:mt-0">
            <CiSearch className="text-2xl md:text-[50px] p-1 md:p-3 text-white hover:scale-105 transition-all cursor-pointer" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Search;