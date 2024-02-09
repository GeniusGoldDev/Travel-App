import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { COLORS, FONTS, SCREEN } from "../../common";
import { AppText } from "../../components";
import LinearGradient from "react-native-linear-gradient";


class OnBoardItem extends Component {
    render() {
        const { slide } = this.props;
        return (
            <LinearGradient
                colors={COLORS.onboard_gradient}
                style={[styles.mainContent,
                {
                    paddingTop: slide.topSpacer,
                    paddingBottom: slide.bottomSpacer,
                    width: slide.width,
                },
                ]}
            >
                <Image style={styles.image} source={slide.item.image} />
                <View style={styles.textContainer} >
                    <View style={{ flexDirection: "row", justifyContent: "center" }} >
                        <AppText style={styles.text} >{slide.item.title}</AppText>
                    </View>
                </View>
            </LinearGradient>
        )
    }
}

export default OnBoardItem;


const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
    },
    textContainer: {
        marginTop: 30,
        width : SCREEN.WIDTH*0.7,
    },
    text: {
        ...FONTS.bold,
        color: "#FFF",
        lineHeight: 42,
        fontSize: 28,
        textAlign: "center",
        textShadowColor: "rgba(0, 0, 0, 0.2)",
        textShadowOffset: {
            width: 0,
            height: 10
        },
        textShadowRadius: 20
    }
});