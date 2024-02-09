import React, { Component } from 'react'
import { Text, StyleSheet, I18nManager } from 'react-native'
import { COLORS } from '../../common/Colors';
import { FONTS } from '../../common';

class AppText extends Component {
    render() {
        const { style, children } = this.props;
        return (
            <Text {...this.props} style={[styles.text, style]} >{children}</Text>
        )
    }
}


export { AppText };

const styles = StyleSheet.create({
    text: {
        ...FONTS.regular,
        color: COLORS.text,
        textAlign : I18nManager.isRTL ? "left" : null
    }
})
