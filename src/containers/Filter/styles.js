import {StyleSheet, I18nManager} from 'react-native';
import {FONTS, COLORS, SCREEN} from '../../common';
import StyleConfig from './../../assets/style';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StyleConfig.countPixelRatio(20),
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        marginHorizontal: StyleConfig.countPixelRatio(20),
        marginVertical: StyleConfig.countPixelRatio(15),
        justifyContent: 'space-between',
    },
    titleText: {
        ...FONTS.bold,
        fontSize: StyleConfig.countPixelRatio(16),
        color: COLORS.main,
    },
    subTitleText: {
        ...FONTS.bold,
        fontSize: StyleConfig.countPixelRatio(12)
    },
    checkboxContainer: {
        flex:1
    },
    resultButton:{
       //width: StyleConfig.width - StyleConfig.countPixelRatio(40),
        shadowRadius: 10,
        shadowOpacity: 1,
        elevation: 1,
       marginBottom: StyleConfig.countPixelRatio(StyleConfig.isIphoneX ? 26 : 8)
    },


});
