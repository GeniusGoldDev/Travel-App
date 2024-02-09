import {get_request, post_request} from './request';
export const postFavorites = async (body) =>{
    return await post_request({target : "favourite", body});
}

export const postPropertyDetail= async (body)=>{
    return await post_request({target: "property_detail", body})
}

export const postPropertyAdd = async (body) => {
    return await post_request({target: "property_add", body})
} 

export const postComment= async (body)=>{
    return await post_request({target: "comment", body})
}

export const postReviewComment= async (body)=>{
    return await post_request({target: "comment_action", body})
}


export const getFavorites= async (body)=>{
    body={
        ...body,
        eStatus:"Favourite"
    }
    return await post_request({target: "owner_listing", body})
}
