import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../AppText';
import { SCREEN, FONTS, COLORS,  } from '../../common';

import LinearGradient from "react-native-linear-gradient";
import { Icon } from '../Icon';


class CategoryCard extends React.Component {

    render() {
        const { name, iconName, cardStyle, colors } = this.props;
        return (
            <LinearGradient
                colors={colors}
                style={[styles.card, cardStyle]}
                useAngle={true} angle={135}
            >
                <View>
                    <View style={styles.iconStyle}>
                        <Icon name={iconName} size={35} color="#fff" />
                        {/* <Ionicons name={iconName} size={35} color="#fff" /> */}
                    </View>
                    <AppText style={styles.nameStyle} >{name}</AppText>
                </View>

            </LinearGradient>
        );
    }
}


export { CategoryCard };

const styles = StyleSheet.create({
    card: {
        width:( SCREEN.WIDTH)/ 3,
        height : 100,
        marginLeft:10,
        alignItems: 'center',
        justifyContent:"center",
        borderRadius: 10,
        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowOffset: {
          width: 0,
          height: 5
        },
        shadowRadius: 10,
        shadowOpacity: 1,
        elevation: 1,
    },
    nameStyle: {
        color: '#fff',
        fontSize: 18,
        textAlign: "center",
        backgroundColor: 'transparent',
        ...FONTS.bold
    },
    iconStyle: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }

})


