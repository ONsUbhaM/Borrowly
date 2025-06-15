import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import React, { useState } from "react";
import { Button } from "./button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Headersecond() {
    const { user, isSignedIn } = useUser();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const handleInputChange = (menuItem) => {
      setIsMenuOpen(false); // Close menu when an item is selected
      switch (menuItem) {
        case "home":
          navigate("/");
          break;
        case "search":
          navigate("/search");
          break;
        case "all_items":
          navigate("/AllItems");
          break;
        case "contact":
          navigate("/contact");
          break;
        default:
          navigate("/");
      }
    };
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    return (
      <div className="sticky top-0 z-50 flex justify-center items-center w-[90%] md:w-[95%] py-1 bg-[url('/background-stars.jpg')] bg-cover">
        <div className="flex items-center justify-between w-[90%] max-w-7xl px-4 md:px-10 py-4 bg-white rounded-full shadow-md relative">
          {/* Logo */}
          <div>
            <img src="/logo.png" alt="logo" className="h-10" />
          </div>
  
          {/* Hamburger Menu Button (Mobile Only) */}
          <button 
            className="md:hidden p-2 rounded-full focus:outline-none !bg-violet-500"
            onClick={toggleMenu}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
  
          {/* Navigation */}
          <ul className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:static top-full left-0 right-0 bg-white md:bg-transparent rounded-2xl md:rounded-full shadow-lg md:shadow-none mt-2 md:mt-0 py-4 md:py-0 px-4 md:px-0 z-50 gap-4 md:gap-10 items-center`}>
            <li
              onClick={() => handleInputChange("home")}
              className="font-medium text-gray-800 hover:text-white hover:bg-violet-500 w-full md:w-auto text-center px-4 py-2 md:rounded-full rounded-lg cursor-pointer transition-all"
            >
              Home
            </li>
            <li
              onClick={() => handleInputChange("search")}
              className="font-medium text-gray-800 hover:text-white hover:bg-violet-500 w-full md:w-auto text-center px-4 py-2 md:rounded-full rounded-lg cursor-pointer transition-all"
            >
              Search
            </li>
            <li
              onClick={() => handleInputChange("all_items")}
              className="font-medium text-gray-800 hover:text-white hover:bg-violet-500 w-full md:w-auto text-center px-4 py-2 md:rounded-full rounded-lg cursor-pointer transition-all"
            >
              Items
            </li>
            <li
              onClick={() => handleInputChange("contact")}
              className="font-medium text-gray-800 hover:text-white hover:bg-violet-500 w-full md:w-auto text-center px-4 py-2 md:rounded-full rounded-lg cursor-pointer transition-all"
            >
              Contact
            </li>
            
            {/* Mobile User Buttons */}
            <div className="md:hidden flex flex-col w-full gap-2 mt-2">
              {isSignedIn ? (
                <>
                  <div className="flex justify-center">
                    <UserButton />
                  </div>
                  <Link to={"/profile"} className="w-full">
                    <Button className="text-white !bg-violet-500 !rounded-full w-full">Submit Listing</Button>
                  </Link>
                </>
              ) : (
                <>
                  <SignInButton>
                    <Button className="text-white !bg-violet-500 !rounded-full w-full">Sign In</Button>
                  </SignInButton>
                  <Link to={"/profile"} className="w-full">
                    <Button className="text-white !bg-violet-500 !rounded-full w-full">Submit Listing</Button>
                  </Link>
                </>
              )}
            </div>
          </ul>
  
          {/* Desktop User Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isSignedIn ? (
              <>
                <UserButton />
                <Link to={"/profile"}>
                  <Button className="text-white !bg-violet-500 !rounded-full">Submit Listing</Button>
                </Link>
              </>
            ) : (
              <>
                <SignInButton>
                  <Button className="text-white !bg-violet-500 !rounded-full">Sign In</Button>
                </SignInButton>
                <Link to={"/profile"}>
                  <Button className="text-white !bg-violet-500 !rounded-full">Submit Listing</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
  
export default Headersecond;