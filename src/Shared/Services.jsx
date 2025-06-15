import axios from "axios";

const SendBirdApplicationID = import.meta.env.VITE_SENDBIRD_APP_ID;
const SendBirdApiToken = import.meta.env.VITE_SENDBIRD_API_TOKEN;

export const FormatResult = (resp) => {
  // Use object for grouping instead of array
  const groupedItems = {};

  resp.forEach((element) => {
    // Safely get listing ID with null checks
    const listingId = element?.itemListing?.id;
    if (!listingId) return; // Skip if no listing ID

    // Initialize entry if not exists
    if (!groupedItems[listingId]) {
      groupedItems[listingId] = {
        ...element.itemListing, // Spread all listing properties
        images: [] // Initialize empty images array
      };
    }

    // Add image if exists
    if (element?.itemImages?.imageUrl) {
      groupedItems[listingId].images.push(element.itemImages);
    }
  });

  // Convert to array and sort by ID descending (newest first)
  return Object.values(groupedItems).sort((a, b) => b.id - a.id);
};

export const CreateSendBirdUser = async (userId, nickName, profileUrl) => {
  if (!userId || typeof userId !== "string") {
    throw new Error("Invalid user ID");
  }

  try {
    const response = await axios.put(
      `https://api-${SendBirdApplicationID}.sendbird.com/v3/users/${userId}`,
      {
        nickname: nickName || userId,
        profile_url: profileUrl || "",
        issue_access_token: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Api-Token": SendBirdApiToken,
        },
      }
    );
    console.log("user creation response:", response.data);
    return response;
  } catch (error) {
    if (error.response?.status === 409) {
      // User already exists - this is fine
      return { data: { user_id: userId } };
    }
    throw error;
  }
};

export const CreateSendBirdChannel = (users,channelName)=>{
    return axios.post(
        "https://api-" + SendBirdApplicationID + ".sendbird.com/v3/group_channels",
        {
            user_ids: users,
            is_distinct: true,
            name: channelName,
            channel_url:`${users.sort().join('-')}-${Date.now()}`
        },{
            headers: {
                "Content-Type": "application/json",
                "Api-Token": SendBirdApiToken,
              }, 
        })
}


