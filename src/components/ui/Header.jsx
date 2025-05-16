import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { Button } from "./button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  const handleInputChange = (menuItem)=> {
    switch(menuItem){
      case 'home': navigate('/');
      break;
      case 'search': navigate('/search');
      break;
      case 'all_items': navigate('/AllItems');
      break;
      default: navigate('/');
    }
  }

  return (
    <div className="flex justify-between items-center p-2">
      <img src='/logo.png' alt="" width={120} height={40} />

      <ul className="hidden md:flex gap-16">
        <li onClick={()=>handleInputChange('home')} className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary ">
          Home
        </li>
        <li onClick={()=> handleInputChange('search')} className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary ">
          Search
        </li>
        <li onClick={()=> handleInputChange('all_items')} className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary ">
          Items
        </li>
      </ul>

      {isSignedIn ? (
        <div className="flex gap-5 mr-3">
          <UserButton />
          <Link to={'/profile'}>
          <Button className="text-white !bg-[#1AB6B4]">Submit Listing</Button>
          </Link>
        </div>
      ) : (
        <div className="flex gap-5 mr-3">
          <SignInButton>
            <Button className="text-white !bg-[#1AB6B4]">Sign In</Button>
          </SignInButton>
          <Link to={'/profile'}>
          <Button className="text-white !bg-[#1AB6B4]">Submit Listing</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
