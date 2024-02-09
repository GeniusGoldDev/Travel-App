import {
    createStackNavigator
} from "react-navigation";
import Login from "../containers/Auth/Login";
import CheckPhone from "../containers/Auth/Register/CheckPhone";
import Otp from "../containers/Auth/Register/Otp";
import Register from "../containers/Auth/Register/Register";
import CheckMail from "../containers/Auth/Forget/CheckMail";
import { COLORS } from "../common";

const AuthStack = createStackNavigator({
    LoginScreen : Login,
    CheckPhoneScreen : CheckPhone,
    OtpScreen : Otp,
    RegisterScreen : Register,
    CheckMailScreen : CheckMail,
},{
    cardShadowEnabled : false,
    cardOverlayEnabled:false,
    headerBackTitleVisible : false,
    defaultNavigationOptions : ()=>{
        return{
            headerStyle : {borderBottomWidth:0, shadowColor:null, shadowOpacity:null,elevation:null},
            title : null,
            headerTintColor : COLORS.main,

        }
    }
    
});


export default AuthStack;