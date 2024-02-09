
import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../common';

export default styles = StyleSheet.create({
    container:{
        flex:1
    },
    forgetPasswordText:{
        fontSize:14,
    },
    rowTextContainer :{
        flexDirection:"row", 
        marginVertical:20, 
        alignItems:"center",
        justifyContent:"center"
    },
    visitorButton:{
        borderRadius:5,
        borderWidth:2,
        borderColor:COLORS.visitor_button_border,
        backgroundColor:"#fff",
        marginTop:20
    },
    registerNowText:{
        fontSize:16,
        ...FONTS.bold
    }
})