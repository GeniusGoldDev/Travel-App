import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';

import { COLORS } from '../../common/Colors';
import { AppText } from '../AppText';
import { SCREEN, FONTS } from '../../common';
import AppImages from '../../assets/images';
import StyleConfig from '../../assets/style';

export default class CheckBox extends Component {

    render() {
        const { label, value, onCheckedChange, style, titleStyle } = this.props;
        let checked = this.props.isRadio ?AppImages.ic_radio_checked : AppImages.ic_checked ;
        let unchecked = this.props.isRadio ?AppImages.ic_radio_unchecked : AppImages.ic_unchecked ;

        return (
            <TouchableOpacity onPress={()=> onCheckedChange(!value)} style={[styles.container, style]}>
                <Image
                source={value ? checked : unchecked}
                style={styles.checkboxImg}
                resizeMode={'contain'}
                />
                <AppText style={[styles.titleStyle, titleStyle]}>{label}</AppText>
            </TouchableOpacity>
        )
    }
}

const styles= StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:StyleConfig.countPixelRatio(10)
    },
    checkboxImg:{
        width:StyleConfig.countPixelRatio(24),
        height: StyleConfig.countPixelRatio(24)
    },
    titleStyle: {
        ...FONTS.regular,
        fontSize: StyleConfig.countPixelRatio(14),
        textAlign: "center",
        marginHorizontal:StyleConfig.countPixelRatio(16)
    }
});
