import axios from "axios";

const SendBirdApplicationID = import.meta.env.VITE_SENDBIRD_APP_ID
const FormatResult = (resp) => {
    let result = [];
    let finalResult = [];

    resp.forEach((element) => {
        const listingId = element.itemListing?.id;
        if(!result[listingId]){
            result[listingId] = {
                item: element.itemListing,
                images:[]
            }
        }
        if(element.itemImages){
            result[listingId].images.push(element.itemImages)
        }
    });

    result.forEach((element) => {
        finalResult.push({
            ...element.item,
            images: element.images
        })
    })

    return finalResult;
}

const CreateSendBirdUserId = async() => {
    return axios.post('https://api-'+SendBirdApplicationID+'.sendbird.com/v3/users')
}

export default {
    FormatResult
}
