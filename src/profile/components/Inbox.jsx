import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";
import "@sendbird/uikit-react/dist/index.css";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import { GroupChannelList } from "@sendbird/uikit-react/GroupChannelList";
import { GroupChannel } from "@sendbird/uikit-react/GroupChannel";

function Inbox() {
  const { user, isLoaded } = useUser();
  const location = useLocation();
  const [userId, setUserId] = useState("");
  const [channelUrl, setChannelUrl] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
      const id = user.primaryEmailAddress.emailAddress.split("@")[0];
      setUserId(id);
      setIsInitialized(true);
      
      // Checking for channel URL in navigation state
      if (location.state?.channelUrl) {
        setChannelUrl(location.state.channelUrl);
      }
    }
  }, [user, isLoaded, location.state]);

  if (!isInitialized) {
    return <div className="flex items-center justify-center h-screen">Loading chat...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow flex flex-col">
        <SendbirdProvider
          appId={import.meta.env.VITE_SENDBIRD_APP_ID}
          userId={userId}
          nickname={user?.fullName || userId}
          profileUrl={user?.imageUrl}
          allowProfileEdit={false}
          theme="light"
          breakpoint={/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)}
        >
          <div className="flex flex-col md:flex-row h-full">
            {/* Channel List - always visible */}
            <div className="w-full md:w-1/3 border-r border-gray-200">
              <GroupChannelList
                onChannelSelect={(channel) => setChannelUrl(channel?.url)}
                renderPlaceholderEmpty={() => (
                  <div className="flex items-center justify-center h-full bg-gray-50">
                    <div className="text-center p-6">
                      <h3 className="text-lg font-medium text-gray-900">
                        No messages yet
                      </h3>
                    </div>
                  </div>
                )}
                channelListQueryParams={{
                  includeEmpty: true,
                  order: "latest_last_message",
                }}
              />
            </div>

            {/* Channel/Message Area */}
            <div className={`flex-grow ${!channelUrl ? "hidden md:flex md:items-center md:justify-center" : ""}`}>
              {channelUrl ? (
                <GroupChannel 
                  channelUrl={channelUrl} 
                  showSearchIcon={true}
                  onChatHeaderActionClick={() => setChannelUrl("")}
                />
              ) : (
                <div className="p-6 text-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    {window.innerWidth > 768 ? "No channel selected" : "Select a conversation"}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {window.innerWidth > 768 
                      ? "Choose a conversation from the list to start chatting" 
                      : "Choose a chat from the list"}
                  </p>
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