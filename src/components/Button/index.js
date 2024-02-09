import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../common/Colors';
import { AppText } from '../AppText';
import { SCREEN, FONTS } from '../../common';

class Button extends Component {
    render() {
        const { title, style, titleStyle } = this.props;
        return (
            <TouchableOpacity {...this.props} style={[styles.buttonContainer, style]}>
                <AppText style={[styles.titleStyle, titleStyle]}>{title}</AppText>
            </TouchableOpacity>
        )
    }
}





class LGButton extends Component {
    render() {
        const { colors, buttonStyle } = this.props;
        return (
            <LinearGradient
                colors={colors || COLORS.main_button}
                style={[styles.buttonContainer, buttonStyle]}
                useAngle={true} angle={135} >
                <Button {...this.props} style={{ backgroundColor: null }}
                />
            </LinearGradient>
        )
    }
}



export { Button, LGButton };


const styles = StyleSheet.create({
    buttonContainer: {
        borderColor: COLORS.main,
        backgroundColor: COLORS.main,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        height: 45,
        width: SCREEN.WIDTH * 0.75,
        alignSelf: "center",
        shadowColor: "rgba(10, 10, 10, 0.2)",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 10,
        shadowOpacity: 1,
        elevation: 1
    },
    titleStyle: {
        ...FONTS.bold,
        color: "#FFF",
        fontSize: 18,
        textAlign: "center"
    }
});
