import React from 'react';
import {StyleSheet} from 'react-native';
import StyleConfig from './../../assets/style';
import {COLORS} from '../../common';
import RangeSlider from 'rn-range-slider';

const MultiSliderView = (props) =>
    <RangeSlider
        style={styles.rangeSlider}
        gravity={'center'}
        min={props.min}
        max={props.max}
        step={10}
        selectionColor={COLORS.main}
        blankColor={COLORS.devider}
        labelBackgroundColor={COLORS.main}
        labelTextColor={'#fff'}
        labelBorderColor={COLORS.grey}
        onValueChanged={props.multiSliderValuesChange}/>;
export default MultiSliderView;
const styles = StyleSheet.create({
    rangeSlider:{
        height:StyleConfig.countPixelRatio(80),
        width: StyleConfig.width*0.9,
    },
});
