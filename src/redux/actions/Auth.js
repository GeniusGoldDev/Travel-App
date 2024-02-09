
import { navigateToOtp, navigateToRegister, navigateToHome } from '../../navigation/Navigator';
import { login, checkPhoneNumber, checkOtpNumber, register, forgetPassword } from "../../service/auth";
import { START_OVERLAY_LOADING, STOP_OVERLAY_LOADING, AUTH_SUCCESS, AUTH_FAIL, LOGOUT } from "./actionTypes";
import AsyncStorage from '@react-native-community/async-storage';
import { TEXTS } from '../../common';
import { Alert } from 'react-native';


export const onLogin = ({ phone, password, navigation }) => {
    return async (dispatch) => {
        dispatch({ type: START_OVERLAY_LOADING })
        const result = await login({ vMobile: phone, vPassword: password });
        dispatch({ type: STOP_OVERLAY_LOADING });
        if (result.message.Output == 0) {
            console.log('result.user--', JSON.stringify(result.user))
            navigateToHome(navigation);
            dispatch({ type: AUTH_SUCCESS, payload: result.user })
        } else {
            dispatch({ type: AUTH_FAIL });
            showAlert(TEXTS.login, TEXTS.login_error, () => console.log("login error"))
        }

    }
}

export const onCheckPhone = ({ phone, navigation }) => {
    return async (dispatch) => {
        dispatch({ type: START_OVERLAY_LOADING })
        const result = await checkPhoneNumber({ vMobile: phone })
        dispatch({ type: STOP_OVERLAY_LOADING });
        if (result.message.Output == 0) {
            await setUserId({ user_id: result.iUserId });
            await navigateToOtp(navigation)
        }
        else {
            showAlert(TEXTS.register, TEXTS.exist_number, () => console.log("exist phone number"))
        }
    }
}

export const onCheckOtp = ({ otp, navigation }) => {
    return async (dispatch) => {
        dispatch({ type: START_OVERLAY_LOADING })

        const result = await checkOtpNumber({ vOTP: otp })
        dispatch({ type: STOP_OVERLAY_LOADING });
        if (result.message.Output == 0) {
            navigateToRegister(navigation)
        }
        else {
            showAlert(null, TEXTS.code_error)

        }

    }
}

export const onRegister = ({ name, email, password, navigation }) => {
    return async (dispatch) => {
        dispatch({ type: START_OVERLAY_LOADING });
        const iUserId = await getUserId();
        const data = await register({ vName: name, vEmail: email, vPassword: password, iUserId: await getUserId() })
        if (data.message.Output == 0) {
            dispatch({ type: AUTH_SUCCESS, payload: data.user })
            navigateToHome(navigation)
        }
        else {
            showAlert(TEXTS.register, TEXTS.error, console.log("ERROR"))
            dispatch({ type: AUTH_FAIL })
        }

    }
}


export const logout = () => {
    return { type: LOGOUT }
}


const setUserId = async ({ user_id }) => {
    await AsyncStorage.setItem("@USER_ID", JSON.stringify(user_id))
}

const getUserId = async () => {
    const user_id = await AsyncStorage.getItem("@USER_ID");
    return user_id ? JSON.parse(user_id) : null;
}

export const sendEmailToResetPassword = ({ email, navigation }) => {
    return async (dispatch) => {
        dispatch({ type: START_OVERLAY_LOADING })
        const result = await forgetPassword({ vEmail: email })
        dispatch({ type: STOP_OVERLAY_LOADING });
        if (result.message.Output == 0) {
            showAlert(TEXTS.get_password, TEXTS.enter_password_text, () => navigation.goBack())
        }
        else {
            showAlert(TEXTS.get_password, TEXTS.email_not_exist, () => console.log("email not exist"))
        }
    }
}



const showAlert = (title, msg, onPress) => {
    setTimeout(() => {
        Alert.alert(title ? title : "", msg,
            [
                { text: 'موافق', onPress },
            ],
            { cancelable: false }
        );
    }, 200);
}
