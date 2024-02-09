import { post_request } from "./request";

export const login =async ({vMobile , vPassword})=>{
    return await post_request({target : "login", body : {vMobile,vPassword}});
}

/* check phone number */

export const checkPhoneNumber = async ({vMobile}) => {
    return await post_request({target:"register", body:{vMobile}});
}

/* check otp */

export const checkOtpNumber = async ({vOTP}) => {
    return await post_request({target:"register_verify_otp", body:{vOTP}});
}

/* registeration  */
export const register = async ({vName , vEmail , vPassword, iUserId}) => {
    return await post_request({target:"register_account" , body:{vName,vEmail,vPassword,iUserId}});
}

/* forget password */
export const forgetPassword = async ({ vEmail }) => {
    return await post_request({target:"forgot_password" , body:{vEmail}});
}

/* change password  */
export const changePassword = async ({iUserId,vPassword,vConfirmPassword}) => {
    return await post_request({target:"change_password" , body:{iUserId,vPassword,vConfirmPassword}});
}