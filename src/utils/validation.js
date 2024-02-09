import {
    isMobilePhone, isEmail } from "validator";
import { TEXTS } from "../common";


export const isEmpty = (value)=>{
    return value.trim().length == 0
}

export const loginValidation = ({ phone, password }) => {
    if (isEmpty(phone) || isEmpty(password)) {
        return {
            valid: false,
            errors: { phone: isEmpty(phone) ? TEXTS.empty_phone : null , password: isEmpty(password) ? TEXTS.empty_password : "" }
        }
    }
    else if (!isMobilePhone(phone, 'ar-SA')) {
        return {
            valid: false,
            errors: { phone: TEXTS.invalid_phone }
        }
    }
    else if (password.trim().length  < 4) { //6
        return {
            valid: false,
            errors: { password: TEXTS.invalid_password }
        }
    }
    else{
        return { valid : true, errors : null  }
    }
}

export const checkPhoneValidation = ({phone}) => {
    if (isEmpty(phone)) {
        return {
            valid: false,
            errors: { phone: isEmpty(phone) ? TEXTS.empty_phone : null}
        }
    }
    else if (!isMobilePhone(phone, 'ar-SA')) {
        return {
            valid: false,
            errors: { phone: TEXTS.invalid_phone }
        }
    }
    else{
        return { valid : true, errors : null  }
    }
}

export const checkEmailValidation = ({email}) => {
    if (isEmpty(email)) {
        return {
            valid: false,
            errors: { email: isEmpty(email) ? TEXTS.empty_email : null}
        }
    }
    else if (!isEmail(email)) {
        return {
            valid: false,
            errors: { email: TEXTS.invalid_email }
        }
    }
    else{
        return { valid : true, errors : null  }
    }
}

export const registerValidation = ({ name, email, password }) => {
    if (isEmpty(name) || isEmpty(email) || isEmpty(password)) {
        return {
            valid: false,
            errors: { name: isEmpty(name) ? TEXTS.empty_name : null , email: isEmpty(email) ? TEXTS.empty_email : null, password: isEmpty(password) ? TEXTS.empty_password : null }
        }
    }
    if (!isEmail(email)) {
        return {
            valid: false,
            errors: { email: TEXTS.invalid_email }
        }
    }
    if (password.trim().length  < 6) {
        return {
            valid: false,
            errors: { password: TEXTS.invalid_password }
        }
    }
    else{
        return { valid : true, errors : null  }
    }
}

export const profileValidation = ({ email, password }) => {
    if (isEmpty(email) || isEmpty(password)) {
        return {
            valid: false,
            errors: { email: isEmpty(email) ? TEXTS.empty_email : null, password: isEmpty(password) ? TEXTS.empty_password : null }
        }
    }
    if (!isEmail(email)) {
        return {
            valid: false,
            errors: { email: TEXTS.invalid_email }
        }
    }
    if (password.trim().length  < 6) {
        return {
            valid: false,
            errors: { password: TEXTS.invalid_password }
        }
    }
    else{
        return { valid : true, errors : null  }
    }
}