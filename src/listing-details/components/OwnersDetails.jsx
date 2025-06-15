import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { CreateSendBirdUser } from "@/Shared/Services";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CreateSendBirdChannel } from "@/Shared/Services";


function OwnersDetails({ itemDetails }) {
  const { user } = useUser();
  const navigation = useNavigate();
  const [error, setError] = useState(null);

  const OnMessageOwnerButtonClick = async () => {
    setError(null);

    if (!user || !itemDetails) {
      setError("Please sign in to message the owner");
      setIsLoading(false);
      return;
    }
    
    const ownerUserId = itemDetails?.createdBy.split("@")[0];
    const userId = user?.primaryEmailAddress.emailAddress.split("@")[0];
    //create current user id
    try {
      await CreateSendBirdUser(userId, user?.fullName, user?.imageUrl).then(
        (resp) => {
          console.log(resp);
        }
      );
    } catch (e) {
      console.log("error creating sendBird user account: ", e);
    }
    // owner user id
    try {
      await CreateSendBirdUser(
        ownerUserId,
        itemDetails?.userName,
        itemDetails?.userImageUrl
      ).then((resp) => {
        console.log(resp);
      });
    } catch (e) {
      console.log("Error fetching details of owner sendbird accont: ", e);
    }

    // create channel
    try {
      await CreateSendBirdChannel(
        [userId, ownerUserId], 
        itemDetails?.userName // Use owner's name instead of listing title
      ).then((resp) => {
        console.log(resp);
        console.log("channel created");
        navigation('/profile');
      });
    } catch (e) {
      setError("Failed to start chat. Please try again.");
      console.log("Error creating Channel: ", e);
    }
  };

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
      <h2 className="font-medium text-2xl mb-3 ">Owner/ Deals</h2>
      <img
        src={itemDetails?.userImageUrl}
        alt="user Image"
        className="w-[70px] h-[70px] rounded-xl "
      />
      <h2 className="mt-2 font-bold text-xl">{itemDetails?.userName}</h2>
      <h2 className="mt-2 font-bold !text-gray-600 text-sm  break-all md:break-normal">
        {itemDetails?.createdBy}
      </h2>
      <h2 className="mt-2 font-bold">Address</h2>
      <h2 className="mt-2 font-bold !text-gray-600">{itemDetails?.address}</h2>

      <Button
        className="w-full mt-6 !bg-blue-700"
        onClick={OnMessageOwnerButtonClick}
      >
        Message Owner
      </Button>
      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export default OwnersDetails;
