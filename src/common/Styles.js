import {Dimensions,StyleSheet} from "react-native";
import { COLORS } from "./Colors";


export const SCREEN = {
    WIDTH : Dimensions.get("window").width,
    HEIGHT : Dimensions.get("window").height
}

export const FONTS = {
    light :{
        fontFamily : Platform.OS === "ios" ?  "Cairo" : "Cairo-Light"
    } ,
    regular : {
        fontFamily : Platform.OS === "ios" ?  "Cairo" : "Cairo-Regular"
    } ,
    bold :{
        fontFamily : Platform.OS === "ios" ?  "Cairo" : "Cairo-Bold" ,
        fontWeight : Platform.OS === "ios" ?  "bold" : null 
    } ,
    t1 : {
        fontFamily : Platform.OS === "ios" ?  "Cairo" : "Cairo-Regular",
        fontSize : 30
    }
}


export const STYLES =StyleSheet.create({
    authContainer : {
        flex:1,
        width : SCREEN.WIDTH * 0.75,
        alignSelf : "center"
    },
    authHeaderTextStyle : {
        ...FONTS.bold,
        fontSize: 36,
        fontStyle: "normal",
        letterSpacing: 0,
        // textAlign: 
        color: COLORS.textColor,
        marginBottom : 40
    }
});