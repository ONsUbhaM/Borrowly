import React, { useEffect, useState, useUser } from "react";
import App  from "@sendbird/uikit-react/App";
import "@sendbird/uikit-react/dist/index.css";
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";

function Inbox() {
  const { user } = useUser();
  const [userId, setUserId] = useState();
  useEffect(() => {
    if (user) {
      const id = (user.primaryEmailAddress?.emailAddres).split("@")[0];
      setUserId(id);
    }
  }, [user]);
  return (
    <div>
      <div style={{ width: "100vw", height: "100vh" }}>

        <SendbirdProvider
          appId={import.meta.env.VITE_SENDBIRD_APP_ID}
          userId={userId}
          nickname={userId?.fullName}
          profileUrl={userId?.imageUrl}
          allowProfileEdit={true}
        ></SendbirdProvider>

        <App
          appId={import.meta.env.VITE_SENDBIRD_APP_ID}
          userId={"Debapan8670"}
        />
      </div>
    </div>
  );
}

export default Inbox;
