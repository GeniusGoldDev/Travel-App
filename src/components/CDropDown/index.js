import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {COLORS, SCREEN, TEXTS} from '../../common';
import {AppText} from '../AppText';
import Dropdown from './Dropdown';
import StyleConfig from '../../assets/style';

class CDropDown extends Component {
    render() {
        const {title, value, isError,...restProps} = this.props;
        return (

            <View style={isError == undefined ? styles.container : styles.errContainer}>
                    <View>
                        <Dropdown
                            // data={data}
                            // labelExtractor={({ name } = {}, index) => name}
                            value={value}
                            containerStyle={{height: StyleConfig.countPixelRatio(50), margin:0, justifyContent:'center'}}
                            fontSize={StyleConfig.countPixelRatio(16)}
                            {...restProps}
                        />
                    </View>
                    {isError && <AppText style={styles.errorText}>{isError}</AppText>}
                    <View style={{flexDirection: 'row', zIndex: 99, position:'absolute', marginTop:StyleConfig.countPixelRatio(-14), marginHorizontal:StyleConfig.countPixelRatio(16) }}>
                        <AppText
                            style={{
                                fontSize: StyleConfig.countPixelRatio(14),
                                paddingHorizontal: StyleConfig.countPixelRatio(4),
                                backgroundColor: 'white',
                                color: COLORS.textColor,
                                fontWeight: 'bold',
                                marginHorizontal:StyleConfig.countPixelRatio(4)
                            }}
                        >{title}</AppText>
                    </View>

            </View>
        );
    }
}

export {CDropDown};

const styles = StyleSheet.create({
    container: {
        height: StyleConfig.countPixelRatio(50),
        borderWidth: 1,
        borderColor:  '#e4e4e4',//COLORS.red
        // paddingVertical: StyleConfig.countPixelRatio(8),
        paddingHorizontal: StyleConfig.countPixelRatio(12),
        width: SCREEN.WIDTH - StyleConfig.countPixelRatio(40),
        borderRadius: StyleConfig.countPixelRatio(4),

    },
    errorText:{
        fontSize: 12,
        color: COLORS.red,
        marginTop:2
    },
  
    errContainer: {
        height: StyleConfig.countPixelRatio(64),
        borderWidth: 1,
        borderColor: COLORS.red,
        // paddingVertical: StyleConfig.countPixelRatio(8),
        paddingHorizontal: StyleConfig.countPixelRatio(12),
        width: SCREEN.WIDTH - StyleConfig.countPixelRatio(40),
        borderRadius: StyleConfig.countPixelRatio(4),

    },
});
