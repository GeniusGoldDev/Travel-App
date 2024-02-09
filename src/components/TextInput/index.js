import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../../common/Colors';
import { AppText } from '../AppText';
import { SCREEN, FONTS } from '../../common';
import { Icon } from '../Icon';

import StyleConfig from '../../assets/style'
class FormInput extends Component {

    render() {
        const { title, error, iconName, style, containerStyle } = this.props;
        return (
            <View style={[styles.container, containerStyle]}>
                <AppText style={styles.titleStyle} >{title}</AppText>
                <View style={[styles.inputContainer, { borderBottomColor: error ? "red" : COLORS.input_border }]}>
                    <TextInput
                        {...this.props}
                        style={[styles.inputStyle, style]}
                        underlineColorAndroid="transparent"
                        autoCapitalize={"none"}
                        autoCorrect={false}
                    />
                    <View style={styles.iconStyle}>
                        <Icon name={iconName} size={25} color={COLORS.main}
                        />
                    </View>

                </View>
                {error && <AppText style={styles.errorText} >{error}</AppText>}
            </View>
        );
    }
}


class FormInputComment extends Component {

    render() {
        const { error, style, containerStyle } = this.props;
        return (
            <View style={[styles.containerComment, containerStyle]}>
                <View style={[styles.inputContainer, { alignItems:'flex-start', height: StyleConfig.countPixelRatio(140), borderBottomColor: error ? "red" : COLORS.input_border, borderWidth:1, borderRadius:5 }]}>
                    <TextInput
                        {...this.props}
                        style={[styles.inputStyle, style]}
                        underlineColorAndroid="transparent"
                        autoCapitalize={"none"}
                        autoCorrect={false}
                        multiline={true}
                    />
                </View>
                {error && <AppText style={styles.errorText} >{error}</AppText>}
            </View>
        );
    }
}


export { FormInput, FormInputComment };

const styles = StyleSheet.create({
    container: {
        width: SCREEN.WIDTH * 0.75,
        alignSelf: "center",
        marginBottom: 10,

    },
    containerComment: {
        width: SCREEN.WIDTH * 0.75,
        marginBottom: 10,

    },
    titleStyle: {
        color: COLORS.textColor,
        fontSize: 16,
        fontStyle: "normal",
        // textAlign: "left",
    },
    inputContainer: {
        // borderBottomColor: COLORS.inputColor,
        height: 45,
        borderBottomWidth: 1,
        borderColor: COLORS.input_border,
        flexDirection: "row",
        alignItems: "center",
    },
    inputStyle: {
        flex: 1,
        height: 45,
        ...FONTS.bold,
        fontSize: 16,
        textAlign : "right",
        color: COLORS.text_input,
        textAlignVertical: "center",
        marginRight: 10,
        paddingVertical:2
    },
    iconStyle: {
        height: 45,
        justifyContent: "center",
        alignItems: "center"
    },
    errorText: {
        color: "red",
        fontSize: 10,
        textAlign: "right"
    }

})

