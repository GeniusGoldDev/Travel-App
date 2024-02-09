import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

import { AppText, Icon } from '../index';
import { TEXTS, COLORS, ICONS, SCREEN } from '../../common';


class SearchInput extends Component {

    render()
    {
        return(
            <TouchableOpacity style={styles.inputContainer} {...this.props}>
                <AppText style={styles.inputStyle}>{TEXTS.search_Text}</AppText>
                <View style={styles.iconStyle}>
                    <Icon name= {ICONS.search} size={25} color={COLORS.text_input}/>
                </View>
            </TouchableOpacity>
        );
    }
}

export default SearchInput;

const styles = StyleSheet.create({
    inputContainer : {
        borderColor:COLORS.main,
        borderWidth:1,
        borderRadius : 5,
        width : SCREEN.WIDTH * 0.9,
        marginVertical:10,
        alignSelf : "center",
        paddingHorizontal:10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent : "center",
        height : 50
    },
    inputStyle : {
        color:COLORS.text_input,
        flex: 1,
        fontSize: 16,
        textAlignVertical: "center",
        marginRight: 10
    },
    iconStyle: {
        justifyContent: "center",
        alignItems: "center"
    }
})