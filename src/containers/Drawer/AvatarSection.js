import React from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import { navigateToProfile, navigateToLogin } from "../../navigation/Navigator"
import { AppText } from "../../components";
import { SCREEN, IMAGES, TEXTS, FONTS, COLORS } from "../../common"
const AvatarSection = ({ user, navigation }) => {


    const onPress = () => {
        if (user) {
            navigateToProfile(navigation)
        } else {
            navigateToLogin(navigation)
        }
    }
    return (
        <TouchableWithoutFeedback onPress={onPress} >
            <View style={styles.container}>
                <Image source={IMAGES.avatar} style={styles.avatar} />
                <View style={styles.userInfo} >
                    <AppText style={styles.nameOrHelloText} >{user ? user.vName : TEXTS.hello}</AppText>
                    <AppText style={styles.loginOrprofileText} >{user ? TEXTS.visit_profile : TEXTS.login}</AppText>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default AvatarSection;



const styles = StyleSheet.create({
    container: {
        height: SCREEN.HEIGHT * 0.3,
        flexDirection: "row",
        alignItems: "center",
        padding: 10
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 10,
        shadowOpacity: 1,
        borderWidth: 1,
        borderColor: "#ffffff"
    },
    userInfo: {
        flex: 1,
        marginLeft: 10,
    },
    nameOrHelloText: {
        ...FONTS.bold,
        fontSize: 24,
        color: COLORS.main,
    },
    loginOrprofileText: {
        fontSize: 16,
        color: COLORS.main_text,

    }
})