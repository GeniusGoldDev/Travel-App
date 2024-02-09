import {StyleSheet} from 'react-native';
import { COLORS, SCREEN, FONTS } from '../../common';



export default StyleSheet.create({
    container:{
        flex: 1
    },
    sliderDotStyle: {
        backgroundColor: "#FFF",
        width:16,
        height : 16,
        borderRadius : 8

    },
    paginationStyle : {
        justifyContent:"center",
        padding :5
    },
    doneButton:{
        width : SCREEN.WIDTH*0.75,
        alignSelf:"center",
        height:45,
        opacity:0.9,
        borderRadius:5,
        backgroundColor:"#FFF",
        shadowColor: "rgba(10, 10, 10, 0.2)",
        shadowOffset: {
          width: 0,
          height: 5
        },
        shadowRadius: 10,
        shadowOpacity: 1,
        elevation : 1
    },
    doneButtonText:{
        ...FONTS.bold,
        padding:0,
        color : COLORS.main_text,
        fontSize:18,
    }

    
});