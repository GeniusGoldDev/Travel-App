import React, {Component} from 'react';
import {
    View, Modal
} from 'react-native';
import styles from './styles'
import {COLORS, FONTS, TEXTS} from '../../common';
import {AppText} from '../AppText';
import StyleConfig from '../../assets/style';
import {LGButton} from '../Button';
import Icon from 'react-native-vector-icons/Ionicons'
let data = [
    { id:1, name: TEXTS.saturday, price:100 },
    { id:2, name: TEXTS.sunday, price:100 },
    { id:3, name: TEXTS.monday, price:100 },
    { id:4, name: TEXTS.tuesday, price:100 },
    { id:5, name: TEXTS.wednesday, price:100 },
    { id:6, name: TEXTS.thurday, price:100 },
    { id:7, name: TEXTS.friday, price:100 },
]
export class PriceModal extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const { prices }= this.props ;
        for(let ind in data){
            //const price = {vWeekdayPrice, vThursdayPrice, vFridayPrice, vSaturdayPrice } ;

            switch (data[ind].id) {
                case 1:
                    data[ind].price = prices.vSaturdayPrice ;
                    break;
                case 2:
                    data[ind].price = prices.vWeekdayPrice ;
                    break;
                case 3:
                    data[ind].price = prices.vWeekdayPrice ;
                    break;
                case 4:
                    data[ind].price = prices.vWeekdayPrice ;
                    break;
                case 5:
                    data[ind].price = prices.vWeekdayPrice ;
                    break;
                case 6:
                    data[ind].price = prices.vThursdayPrice ;
                    break;
                case 7:
                    data[ind].price = prices.vFridayPrice ;
                    break;

            }
        }
        return(

            <Modal
            visible={this.props.visible}
            animationType="fade"
            transparent={true}
            onRequestClose={ this.props.onClose }

            >
                <View style={styles.container}>
                    <View style={styles.content}>
                        <AppText style={{ ...FONTS.bold, fontSize:StyleConfig.countPixelRatio(14), color:COLORS.textColor}}>{TEXTS.all_prices}</AppText>

                        {data.map((item)=><View style={styles.row}>
                            <AppText style={{ width: StyleConfig.responsiveWidth(25) }}>{item.name}</AppText>
                            <AppText style={{
                                ...FONTS.bold,
                                fontSize: StyleConfig.countPixelRatio(14),
                                color: COLORS.red,
                            }}>{item.price+' '+TEXTS.riyal}</AppText>
                            <AppText>{TEXTS.day}</AppText>

                        </View>)}
                        <View style={[styles.row, {
                            justifyContent: 'center',
                            marginTop: StyleConfig.countPixelRatio(8),
                            marginBottom: StyleConfig.countPixelRatio(StyleConfig.isIphoneX? 24 :8),

                        }]}>
                            <LGButton
                                colors={COLORS.contact_button}
                                onPress={this.props.onSubmit}
                                buttonStyle={styles.resultButton}
                                title={TEXTS.contact_the_advertieser}/>
                        </View>
                    </View>
                </View>

            </Modal>
        )
    }
}
