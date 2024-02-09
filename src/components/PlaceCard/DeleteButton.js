import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AppText } from '../AppText';
// import { Icon } from '../Icon';
import { COLORS, FONTS } from '../../common';
import Icon from 'react-native-vector-icons/AntDesign';



class DeleteButton extends Component {
    render() {
        const { title, style, iconName , titleStyle } = this.props;
        return (
            <TouchableOpacity {...this.props} style={[styles.buttonContainer, style]}>
                <AppText style={[styles.titleStyle, titleStyle]}>{title}</AppText>
                <Icon name="delete" size={23} color={COLORS.price_color} style={{marginRight:5}} />
            </TouchableOpacity>
        )
    }
}

export { DeleteButton };


const styles = StyleSheet.create({
    buttonContainer: {
        borderColor: COLORS.price_color,
        borderRadius: 17,
        borderStyle: "solid",
        borderWidth: 1,
        justifyContent: "space-between",
        alignItems: "center",
        marginTop:12,
        marginLeft:12,
        flexDirection: 'row-reverse',
        paddingHorizontal:10,
        paddingVertical:4
    },
    titleStyle: {
        color: COLORS.price_color,
        ...FONTS.bold,
    }
});