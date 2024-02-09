import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { AppText } from '../../components/AppText';
import { PlaceCard } from '../../components/PlaceCard'

import { COLORS, FONTS, SCREEN } from '../../common';

class PlaceCardSection extends Component {
    render() {
        const { title, places } = this.props;
        return (
            <View style={styles.container} >
                <AppText style={styles.titleStyle} >{title}</AppText>
                <FlatList
                    data={places}
                    renderItem={({ item }) => <PlaceCard  {...this.props} {...item} cardStyle={{ width: SCREEN.WIDTH * .8, marginHorizontal:8 }} />}
                    style={{flexDirection:'row-reverse'}}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    automaticallyAdjustContentInsets={false}
                    {...this.props}
                />
            </View>

        );
    }
}

export default PlaceCardSection;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
    },
    titleStyle: {
        fontSize: 24,
        ...FONTS.bold,
        marginLeft: 10,
        color: COLORS.main,
        textAlign: "left"
    }
})
