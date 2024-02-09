
// import { BASE_URL } from '../Config';
const BASE_URL = "https://www.estraha.com/api";
// const BASE_URL = "http://estraha.tech/api";


export const get_request = async (target) => {
    try {
        const URL = `${BASE_URL}/${target}`;
        const response = await fetch(URL);
        const json = await response.json();
        console.log('get_request req-> ', URL ,'\nres->',JSON.stringify(json))
        return json;
    } catch (error) {
        console.log(error);
    }
}
export const post_request = async ({ target, body }) => {
    try {
        const URL = `${BASE_URL}/${target}`;
        console.log( URL, JSON.stringify(body))
        let bodyData = await createFormData(body)
        console.log('multipart', JSON.stringify(bodyData))
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body:bodyData
        });
        const json = await response.json();
        console.log('post_request req->', URL ,'\nres->',JSON.stringify(json))
        return json
    } catch (error) {
        console.log(error);
    }
}





// const refactor_output = ({ message = null, data = null }) => {
//     try {
//         if (message && message.Output == 0) {
//             return { success: true, message: message.Message, data }
//         } else {
//             return { success: false, message: message.Message }
//         }
//     } catch (error) {
//         return { success: false }
//     }

// }



const createFormData = (data)=>{
    let form_data = new FormData();
    for( let key in data ){
        form_data.append(key, data[key]);
    }
    return  form_data;
}
