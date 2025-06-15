import Header from "@/components/ui/Header";
import { Button } from "@/components/ui/button";
import React from "react";
import { Separator } from "@radix-ui/react-select";

import MyListing from "./components/MyListing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Inbox from "./components/Inbox";
import Headersecond from "@/components/ui/Headersecond";

function Profile() {  
  return (
    <div>
      <div className="w-full 
      bg-[url(/main-bg.jpg)] bg-cover bg-center bg-no-repeat bg-blend-overlay relative py-15"><Headersecond />
      </div>
      <div className="px-10 md:px-20 my-10">
        {/* tabs */}
        <Tabs defaultValue="My-listing" className="w-full">
          <TabsList className='bg-white'>
            <TabsTrigger className="!bg-[#7453fc] text-white rounded-full" value="My-listing">My Listing</TabsTrigger>
            <TabsTrigger className="!bg-[#7453fc]  text-white mx-3 rounded-full" value="inbox">Inbox</TabsTrigger>
          </TabsList>
          <Separator className="w-full h-1 !bg-[#7453fc] border rounded-full" />
          <TabsContent value="My-listing"><MyListing/></TabsContent>
          <TabsContent value="inbox"><Inbox/></TabsContent>
          <TabsContent value="profile">profile</TabsContent>
        </Tabs>


      </div>
    </div>
  );
}

export default Profile;
