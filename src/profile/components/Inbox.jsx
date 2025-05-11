import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import "@sendbird/uikit-react/dist/index.css";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import { GroupChannelList } from "@sendbird/uikit-react/GroupChannelList";
import { GroupChannel } from "@sendbird/uikit-react/GroupChannel";

function Inbox() {
  const { user } = useUser();
  const [userId, setUserId] = useState();
  const [channelUrl, setChannelUrl] = useState();

  useEffect(() => {
    if (user) {
      const id = (user?.primaryEmailAddress.emailAddress).split("@")[0] || "";
      setUserId(id);
    }
  }, [user]);
  return (
<div className="flex flex-col h-screen">
      <div className="flex-grow flex flex-col">
        <SendbirdProvider
          appId={import.meta.env.VITE_SENDBIRD_APP_ID}
          userId={userId}
          nickname={user?.fullName || userId}
          profileUrl={user?.imageUrl}
          allowProfileEdit={true}
        >
          <div className="flex flex-col md:flex-row h-full">
            {/* Channel List - takes full width on mobile, 1/3 on desktop */}
            <div className="w-full md:w-1/3 border-r border-gray-200">
              <GroupChannelList
                onChannelSelect={(channel) => {
                  setChannelUrl(channel?.url);
                }}
                channelListQueryParams={{
                  includeEmpty: true
                }}
              />
            </div>
            
            {/* Channel/Message Area - hidden on mobile when no channel selected */}
            <div className={`flex-grow ${!channelUrl ? 'hidden md:block' : ''}`}>
              {channelUrl ? (
                <GroupChannel 
                  channelUrl={channelUrl}
                  showSearchIcon={true}
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-50 border shadow-lg">
                  <div className="text-center p-6">
                    <h3 className="text-lg font-medium text-gray-900">No channel selected</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Select a conversation from the list to start chatting
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </SendbirdProvider>
      </div>
    </div>
  );
}

export default Inbox;
