import {I18nManager, StyleSheet} from 'react-native';
import {COLORS, FONTS, SCREEN} from '../../common';
import StyleConfig from '../../assets/style';
const styles = StyleSheet.create({
    headerText: {
        color: COLORS.main,
        marginBottom: 10,
        fontWeight: 'bold',
        marginHorizontal: 10
    },
    titleText:{
        ...FONTS.bold,
        fontSize: 32,
        color: COLORS.main,
    },
    labelText:{
        ...FONTS.bold,
        fontSize: 17,
        color: COLORS.main,
    },
    timeItem:{
        padding:StyleConfig.countPixelRatio(8),
        marginRight:StyleConfig.countPixelRatio(10),
        backgroundColor:'grey',
        borderRadius:StyleConfig.countPixelRatio(5),
        borderWidth:0
    },
    timeItemSelected:{
        padding:StyleConfig.countPixelRatio(8),
        marginRight:StyleConfig.countPixelRatio(10),
        backgroundColor: COLORS.green,
        borderRadius:StyleConfig.countPixelRatio(5),
        borderWidth:0
    },
    itemText:{
        ...FONTS.bold,
        fontSize: 14,
        color: '#fff',
    },
    errorText:{
        ...FONTS.regular,
        fontSize: 12,
        color: COLORS.red,
    },
    
    descripText: {
        fontSize: 17,
        marginHorizontal: 10,
        color: COLORS.main
    },
    descripInput: {
        height: 100,
        width: '70%',
        borderRadius:10,
        borderWidth:1,
        alignItems:'center',
        alignSelf:'center',
        borderColor:COLORS.main,
        marginBottom:10
    },
    row1: {
        flexDirection: 'row',
        paddingHorizontal: StyleConfig.countPixelRatio(20),
        paddingVertical: StyleConfig.countPixelRatio(4),
        borderBottomWidth:0.5,
        borderColor:'#aaa',
        justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row',
        marginHorizontal: StyleConfig.countPixelRatio(20),
        marginVertical: StyleConfig.countPixelRatio(15),
        justifyContent: 'space-between',
    },
    resultButton:{
        //width: StyleConfig.width - StyleConfig.countPixelRatio(40),
        shadowRadius: 10,
        shadowOpacity: 1,
        elevation: 1,
        marginBottom: StyleConfig.countPixelRatio(StyleConfig.isIphoneX ? 26 : 8)
    },
    inputContainer: {
        borderColor: "#e4e4e4",
        borderWidth: 1,
        borderRadius: 5,
        width: SCREEN.WIDTH * 0.9,
        // marginVertical: 10,
        alignSelf: "center",
        paddingHorizontal: 10,
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

    },
    errorInputContainer: {
        borderColor: COLORS.red,
        borderWidth: 1,
        borderRadius: 5,
        width: SCREEN.WIDTH * 0.9,
        // marginVertical: 10,
        alignSelf: "center",
        paddingHorizontal: 10,
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

    },
    inputStyle: {
        ...FONTS.bold,
        color: COLORS.text_input,
        flex: 1,
        textAlign: I18nManager.isRTL ? "right" : null
    },
    devider:{
        height:1,
        backgroundColor:COLORS.borderColor,
        marginHorizontal: StyleConfig.countPixelRatio(20),
        marginVertical:StyleConfig.countPixelRatio(8)
    },
    photoViewContainer:{
        marginHorizontal: StyleConfig.countPixelRatio(20),
        marginVertical: StyleConfig.countPixelRatio(15),
        borderWidth:2,
        borderRadius:StyleConfig.countPixelRatio(8),
        height:SCREEN.HEIGHT*0.35,
        borderColor:COLORS.borderColor
    },
    photoText1:{
        ...FONTS.bold,
        fontSize:18,
        color:COLORS.input_border

    },
    photoText2:{
        ...FONTS.regular,
        fontSize:12,
        color:COLORS.input_border

    },
    imageItem:{
        height:'100%',
        width: '100%',
        borderRadius:StyleConfig.countPixelRatio(4),
        borderColor: COLORS.input_border,
        borderWidth:0.5
    },
    blankImage:{  
        height:SCREEN.WIDTH*0.25,
        flex:0.33,
        marginTop:StyleConfig.countPixelRatio(12),
        marginHorizontal:StyleConfig.countPixelRatio(6),
        alignItems:'center', 
        justifyContent:'center',
        borderRadius:StyleConfig.countPixelRatio(4), 
        borderColor: COLORS.input_border, 
        borderWidth:0.5 
    }

})


export default styles;
