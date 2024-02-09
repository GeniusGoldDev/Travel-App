import {StyleSheet} from "react-native";
import { FONTS } from '../../../common';

export default StyleSheet.create({
    container : {
        flex:1
    },
    contentStyle : {
        flex : 1,
    },
    rowTextContainer :{
        flexDirection:"row", 
        marginVertical:20, 
        alignItems:"center",
        justifyContent:"center"
    },
    registerNowText:{
        fontSize:16,
        ...FONTS.bold
    },
    registerTextStyle:{
        fontSize:14,
        alignSelf:"center",
        textAlign:"center",
        marginVertical:20
    }
})