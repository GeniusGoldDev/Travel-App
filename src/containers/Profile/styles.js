import {StyleSheet} from "react-native";
import { COLORS, FONTS, SCREEN } from "../../common";


export default StyleSheet.create({
    container : {
        flex:1
    },
    avatarSection : {
        paddingVertical:20,
        alignItems:"center",
        justifyContent:"center",
    },
    imageContainerStyle:{
        height: 94,
        width: 94,
        borderRadius: 45,
        borderWidth: 2,
        overflow:"hidden",
        borderColor : "#fff",
        shadowColor: "#fff",
        shadowOffset: {width: 0,height: 1},
        shadowOpacity: 1,
        shadowRadius: 15,
        elevation: 1,
        borderColor: "#eee",
    },
    avatar : {
        width : 90,
        height : 90,
        borderRadius:40,
        borderColor : "#fff",
    },
    nameText : {
        color : COLORS.main,
        ...FONTS.bold,
        fontSize:20
    },
    cityContainer : {
        width: SCREEN.WIDTH * 0.75,
        alignSelf: "center",
        marginBottom: 10,
        borderBottomWidth:1,
        borderBottomColor:COLORS.input_border
    },
    cityStyle:{
        color: COLORS.main,
    },
    pickerStyle : {
        color: COLORS.main,
        height: 50, 
        width: SCREEN.WIDTH * 0.75,
        alignSelf:"center",
        height : 50
    }
})