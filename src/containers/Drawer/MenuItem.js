import React from 'react';
import { TouchableOpacity, StyleSheet } from "react-native";
import { Icon, AppText } from '../../components';
import { COLORS } from '../../common';

const MenuItem = ({ item, navigation, onPress }) => {

    const onPressItem = () => {
        item.screen(navigation);
        navigation.closeDrawer()
    }

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onPressItem} >
            <Icon name={item.icon} size={25} color={COLORS.main} style={styles.icon} />
            <AppText style={styles.titleText} >{item.title}</AppText>
        </TouchableOpacity>
    );
}

export default MenuItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#f9f9f9",
        height: 50,
        marginBottom: 10,
        alignItems: "center"
    },
    titleText: {
        flex: 1,
        color: COLORS.main,
        fontSize: 16,
        marginLeft: 10
    },
    icon: {
        width: "25%",
        textAlign: "center"
    }
})