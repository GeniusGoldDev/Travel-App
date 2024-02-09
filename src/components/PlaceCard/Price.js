import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { TEXTS, COLORS } from '../../common';
import { CardTitle } from '../Titles';

class Price extends Component {

    getPrice() {
        const { vWeekdayPrice, vOfferPrice, isSearchCard } = this.props;
        if (!vOfferPrice || isSearchCard) {
            return (
                <View style={styles.container}>
                    <CardTitle style={{color:COLORS.price_color}}>{vWeekdayPrice} {TEXTS.currency}</CardTitle>
                </View>
            );
        }
        return (
            <View style={styles.container} >
                <CardTitle style={styles.oldPrice} >{vWeekdayPrice} {TEXTS.currency} </CardTitle>
                <CardTitle style={{color:COLORS.price_color}} >{vOfferPrice} {TEXTS.currency} </CardTitle>
            </View>
        );

    }
    render() {
        return (
            <View>{this.getPrice()}</View>
        )
    }
}


export { Price };

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    oldPrice: {
        color: COLORS.oldPrice_color ,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
    }
})
