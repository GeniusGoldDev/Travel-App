import { StyleSheet } from 'react-native';
import StyleConfig from '../../assets/style';
import {COLORS} from '../../common';
const modalHeight= 425 ;
 export default  StyleSheet.create({
    container:{
        backgroundColor: 'rgba(0,0,0,0.3)',
        flex:1
    },
     content:{
        height:  StyleConfig.countPixelRatio(modalHeight),
         marginTop:StyleConfig.height - StyleConfig.countPixelRatio(modalHeight),
         backgroundColor: '#fff',
         paddingHorizontal:StyleConfig.countPixelRatio(20),
         paddingTop:StyleConfig.countPixelRatio(8),
     },
     row:{
        paddingVertical: StyleConfig.countPixelRatio(6),
        flexDirection:'row',
         borderBottomWidth:1,
         borderColor:COLORS.borderColor
     },
     resultButton:{
         //width: StyleConfig.width - StyleConfig.countPixelRatio(40),
         shadowRadius: 10,
         shadowOpacity: 1,
         elevation: 4,
         // marginBottom: StyleConfig.countPixelRatio(StyleConfig.isIphoneX ? 26 : 8)
     },
})
