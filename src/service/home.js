import { get_request } from "./request";

export const home = async ()=>{
    return await get_request("home_page");
}

export const city= async ()=>{
    return await get_request("city");
}
