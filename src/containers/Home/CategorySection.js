import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { AppText } from '../../components/AppText';

import {
    CategoryCard
} from '../../components/CategoryCard'

import { ICONS, COLORS, FONTS, TEXTS } from '../../common';


const data = [
    { category_id: 1, name: "استراحة", colors: COLORS.gradient1, iconName: ICONS.estraha },
    { category_id: 4, name: "شالية", colors: COLORS.gradient2, iconName: ICONS.chale },
    { category_id: 5, name: "مخيم", colors: COLORS.gradient3, iconName: ICONS.tent },
    { category_id: 6, name: "استاد", colors: COLORS.gradient1, iconName: ICONS.stadium },
    { category_id: 6, name: "حفلات", colors: COLORS.gradient2, iconName: ICONS.events },

]

export default class CategorySection extends React.Component {

    render() {
        return (
            <View style={styles.container} >
                <AppText style={styles.titleStyle} >{TEXTS.discover}</AppText>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <CategoryCard  {...item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, i) => `item--${i}`}
                />
            </View>

        );
    }
}

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
