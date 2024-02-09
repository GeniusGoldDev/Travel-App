import React, {Component} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {CardTitle} from '../Titles/';
import {COLORS, TEXTS, FONTS} from '../../common';
import {Rating} from '../Rating';
import {Price} from './Price';
import {Discount} from './Discount';
import {DeleteButton} from './DeleteButton';
import LinearGradient from 'react-native-linear-gradient';
import StyleConfig from '../../assets/style';
import {navigateToEstrahaDetails} from '../../navigation/Navigator';
import { getImageUrl } from '../../common/Utils'
class PlaceCard extends Component {

    showDeleteOrDiscount(show) {
        switch (show) {
            case 'discount':
                return (
                    <Discount/>
                );
            case 'delete':
                return (
                    <DeleteButton title={TEXTS.delete}/>
                );
            default:
                break;
        }
    }

    _onCardPress=()=>{
        const {iPropertyId, handleBack} = this.props
        navigateToEstrahaDetails(this.props.navigation,{iPropertyId,handleBack});
    }
    

    render() {
        const {image, vCategory, vProperty, isSearchCard, vAverageRating, vTotalRating, vOfferPrice, vWeekdayPrice, iPropertyId, cardStyle} = this.props;
        const ImageURL = getImageUrl(iPropertyId, image[0].vImage) ;
        const numAvgRating = vAverageRating == "" || vAverageRating == null || vAverageRating == "null" ? 0 : Number(vAverageRating).toFixed(1);
        const label = numAvgRating > 4.5 ? TEXTS.fabulous : numAvgRating > 4.0 ? TEXTS.exellent: numAvgRating > 3.5 ? TEXTS.good : '';
        return (
            <TouchableOpacity disabled={this.props.user === undefined} onPress={this._onCardPress} style={[styles.cardContainer, cardStyle]}>
                <Image style={styles.imageStyle} source={ImageURL}/>
                <View style={styles.cardDetails}>
                    <View style={styles.subDetails}>
                        <CardTitle style={{...FONTS.regular, color: COLORS.headerCard_color}}>{vCategory}</CardTitle>
                        <CardTitle>{vProperty}</CardTitle>
                        <View style={{flexDirection: 'row', marginVertical: 4}}>
                            <Rating disabled starCount={parseInt(vAverageRating)}/>
                        </View>
                        <CardTitle style={{color: COLORS.textColor, ...FONTS.regular}}>{TEXTS.start_from}</CardTitle>
                        <Price isSearchCard vOfferPrice={parseInt(vOfferPrice)}
                               vWeekdayPrice={parseInt(vWeekdayPrice)}/>
                    </View>
                    <View style={{alignItems: 'space-between'}}>
                        {numAvgRating > 0 &&
                                <View style={{flexDirection: 'row'}}>

                                    <View style={{justifyContent:'center'}}>
                                        <CardTitle style={{
                                            ...FONTS.regular,
                                            fontSize:10,
                                            color: COLORS.grey,
                                        }}>{`${vTotalRating} ${TEXTS.comments} `}</CardTitle>
                                    </View>
                                    <View style={{
                                        borderWidth: 0,
                                        borderRadius: 4,
                                        alignSelf: 'center',
                                        backgroundColor: COLORS.ratingBack,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginVertical: 8,
                                        marginRight: 4,
                                        paddingHorizontal:6
                                    }}>
                                        <CardTitle style={{
                                            ...FONTS.bold,
                                            color: COLORS.code_color,
                                        }}>{label}</CardTitle>
                                        <CardTitle style={{
                                            ...FONTS.bold,
                                            marginTop:-2,
                                            color: COLORS.code_color
                                        }}>{numAvgRating}</CardTitle>
                                    </View>

                                </View>

                        }

                        <View style={styles.codeContainer}>
                            {/* <View style={styles.deleteOrDiscount}>{this.showDeleteOrDiscount(show)}</View> */}
                            <LinearGradient
                                colors={COLORS.gradient2}
                                style={styles.code}
                                useAngle={true} angle={135}
                            >
                                <View>
                                    <CardTitle
                                        style={{...FONTS.bold, color: COLORS.code_color}}>{TEXTS.code}</CardTitle>
                                    <CardTitle
                                        style={{...FONTS.bold, color: COLORS.code_color}}>{iPropertyId}</CardTitle>
                                </View>
                            </LinearGradient>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        );
    }
}


export {PlaceCard};

const styles = StyleSheet.create({

    cardContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderWidth: 0.4,
        borderRadius: 15,
        borderBottomLeftRadius: 0,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#333',
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 4,
        margin: 8,
    },
    imageStyle: {
        flex: 1,
        resizeMode: 'cover',
        borderWidth: 0,
        borderTopLeftRadius: StyleConfig.isIphone ? 15 : 0,
        borderTopRightRadius: StyleConfig.isIphone ? 0 : 15,

        width: '100%',
        height: '100%',
    },
    cardDetails: {
        flexDirection: 'row',
        flex: 2,
    },
    subDetails: {
        padding: 7,
        paddingBottom: 0,
        alignItems: 'flex-start',
        flex: 2,
    },
    codeContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flex: 1,
    },
    code: {
        borderTopLeftRadius: StyleConfig.isIphone ? 0 : 15,
        borderTopRightRadius: StyleConfig.isIphone ? 15 : 0,

        borderBottomRightRadius: StyleConfig.isIphone ? 0 : 15,
        borderBottomLeftRadius: StyleConfig.isIphone ? 15 : 0,

        paddingHorizontal: 5,
    },
    codeContainer2: {
        flex: 1,
    },
    code2: {
        borderTopLeftRadius: StyleConfig.isIphone ? 15 : 0,
        borderTopRightRadius: StyleConfig.isIphone ? 0 : 15,

        borderBottomRightRadius: StyleConfig.isIphone ? 15 : 0,
        borderBottomLeftRadius: StyleConfig.isIphone ? 0 : 15,

        paddingHorizontal: 5,
    },
    deleteOrDiscount: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 2,
    },
});


