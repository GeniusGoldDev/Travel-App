import {get_request, post_request} from './request';

export const city= async ()=>{
    return await get_request("city");
}

export const category= async ()=>{
    return await get_request("category");
}

export const searchResult= async (data)=>{
    return await post_request({target : "property_listing", body : data});
}


