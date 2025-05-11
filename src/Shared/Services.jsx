import axios from "axios";

const SendBirdApplicationID = import.meta.env.VITE_SENDBIRD_APP_ID;
const SendBirdApiToken = import.meta.env.VITE_SENDBIRD_API_TOKEN;

export const FormatResult = (resp) => {
  let result = [];
  let finalResult = [];

  resp.forEach((element) => {
    const listingId = element.itemListing?.id;
    if (!result[listingId]) {
      result[listingId] = {
        item: element.itemListing,
        images: [],
      };
    }
    if (element.itemImages) {
      result[listingId].images.push(element.itemImages);
    }
  });

  result.forEach((element) => {
    finalResult.push({
      ...element.item,
      images: element.images,
    });
  });

  return finalResult;
};

export const CreateSendBirdUser = async (userId, nickName, profileUrl) => {
  return axios.post(
    "https://api-" + SendBirdApplicationID + ".sendbird.com/v3/users",
    {
      user_id: userId,
      nickname: nickName,
      profile_url: profileUrl,
      issue_access_token: false,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": SendBirdApiToken,
      },
    }
  );
};

export const CreateSendBirdChannel = (users,title)=>{
    return axios.post(
        "https://api-" + SendBirdApplicationID + ".sendbird.com/v3/group_channels",
        {
            user_ids: users,
            is_distinct: true,
            name: title,
            channel_url:`${users.sort().join('-')}-${Date.now()}`
        },{
            headers: {
                "Content-Type": "application/json",
                "Api-Token": SendBirdApiToken,
              }, 
        })
}


