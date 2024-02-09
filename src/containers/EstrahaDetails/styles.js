import {StyleSheet} from 'react-native';
import StyleConfig from '../../assets/style';
import {COLORS, FONTS} from '../../common';

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    propertyImage:{
        width:StyleConfig.width,
        height: StyleConfig.isIphone ?  StyleConfig.width*1.05 :StyleConfig.width * 0.9
    },
    row:{
        flexDirection: 'row',
        paddingHorizontal:StyleConfig.countPixelRatio(8),
    },
    topPadding:{
      marginTop: StyleConfig.isIphoneX ? StyleConfig.countPixelRatio(44) :StyleConfig.countPixelRatio(20)
    },
    flex1:{
        flex:1,
    },
    touchable:{
      padding:StyleConfig.countPixelRatio(6)
    },
    headerImage:{
        height:StyleConfig.countPixelRatio(20),
        width: StyleConfig.countPixelRatio(20),
        tintColor: '#fff'
    },
    gelleryButton:{
        marginBottom: StyleConfig.countPixelRatio(44),
        marginHorizontal: StyleConfig.countPixelRatio(20),
        borderRadius: StyleConfig.countPixelRatio(4),
        backgroundColor: '#ffffff88',
        borderColor: '#fff',
        flexDirection: 'row',
        alignItems:'center',
        padding: StyleConfig.countPixelRatio(4),

    },
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderWidth: 0.4,
        borderRadius: StyleConfig.countPixelRatio(16),
        borderColor: '#ddd',
        shadowColor: '#333',
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: StyleConfig.countPixelRatio(4),
        margin: StyleConfig.countPixelRatio(8),
        padding:StyleConfig.countPixelRatio(8)
    },
    sectionTitle:{
        color: COLORS.textColor,
        paddingVertical:StyleConfig.countPixelRatio(4),
        fontSize:StyleConfig.countPixelRatio(24),
        ...FONTS.bold
    },
    textTermsCond:{
        color: COLORS.textColor,
        fontSize:StyleConfig.countPixelRatio(18),
        ...FONTS.regular
    },
    properyGradient:{
        borderColor:'#00000000',
        borderRadius: StyleConfig.countPixelRatio(20),
        borderWidth: 0.5,
        paddingHorizontal:StyleConfig.countPixelRatio(10),
        paddingVertical: StyleConfig.countPixelRatio(4),
        minWidth:StyleConfig.countPixelRatio(60),
        alignItems: 'center',
        justifyContent:'center'

    },
    locationImage:{
        height:StyleConfig.countPixelRatio(16),
        width: StyleConfig.countPixelRatio(16)
    },
    detailImg:{
        height:StyleConfig.countPixelRatio(20),
        width: StyleConfig.countPixelRatio(20),
        marginHorizontal: StyleConfig.countPixelRatio(8)
    },
    warningImg:{
        height:StyleConfig.countPixelRatio(28),
        width: StyleConfig.countPixelRatio(28),
        marginHorizontal: StyleConfig.countPixelRatio(8)
    },
    detailsContent:{
        flexDirection: 'row',
        padding:StyleConfig.countPixelRatio(8),
        borderBottomWidth:1,
        borderColor:COLORS.borderColor,
        alignItems:'center'
    },
    resultButton:{
        //width: StyleConfig.width - StyleConfig.countPixelRatio(40),
        shadowRadius: 10,
        shadowOpacity: 1,
        elevation: 1,
        // marginBottom: StyleConfig.countPixelRatio(StyleConfig.isIphoneX ? 26 : 8)
    },


});

