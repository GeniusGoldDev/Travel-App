import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { COLORS, FONTS } from '../../common';
import { AppText } from '../AppText';

class CardTitle extends Component {
    render() {
        const { style, children } = this.props;
        return (
            <AppText {...this.props} style={[styles.text, style]} >{children}</AppText>
        )
    }
}


export { CardTitle };

const styles = StyleSheet.create({
    text: {
        color: COLORS.textColor,
        ...FONTS.bold
    }
})
