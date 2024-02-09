import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { COLORS, ICONS, FONTS,  } from '../../common';
import { CardTitle } from '../Titles';

import LinearGradient from "react-native-linear-gradient"

class Discount extends Component {

    render() {
        return (
            <View >
                <LinearGradient
                    style={styles.container}
                    colors={COLORS.gradient1}
                    useAngle={true} angle={135}
                >
                    <CardTitle style={styles.precentage} > %</CardTitle>
                </LinearGradient>
            </View >
        )
    }
}


export { Discount };

const styles = StyleSheet.create({
    container: {
        marginRight: 12,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
    },
    precentage: {
        color:"#fff",
        paddingHorizontal: 12,
        paddingVertical:5
    }
})
