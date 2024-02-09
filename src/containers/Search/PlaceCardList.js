import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { PlaceCard } from '../../components/PlaceCard'

import { COLORS, FONTS, SCREEN } from '../../common';
class PlaceCardList extends Component {
    componentDidMount(){
        this.props.scrollToIndex = this.scrlToIndex ;
    }
    scrlToIndex=(ind)=> this.flatListRef.scrollToIndex({animated: false, index: "" + ind});
    render() {
        const { places,handleLoadMore, style } = this.props;
        return (
            <View style={[styles.container, style ]} >
                <FlatList
                    {...this.props}
                    data={places}
                    extraData={places}
                    ref={(ref) => { this.flatListRef = ref; }}
                    keyExtractor={item => item.iPropertyId}
                    renderItem={({ item }) => <PlaceCard {...this.props} isSearchCard  {...item} cardStyle={ styles.cardStyle } />}
                    onEndReached={handleLoadMore}
                    onEndThreshold={0}
                />
            </View>
        );
    }
}
export default PlaceCardList

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
    },
    cardStyle : {
        marginVertical: 10,
        alignSelf: "center",
        width: SCREEN.WIDTH * .9
    }
})
