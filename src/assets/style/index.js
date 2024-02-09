import {Dimensions, Platform, NativeModules, PixelRatio} from 'react-native';

const {width,height} = Dimensions.get('window');
const isIphone = Platform.OS === "ios"
const widthPer = width /100 ;
const heightPer = height /100 ;
const pixelDensity = PixelRatio.get();
const iPhoneX = (Platform.OS === 'ios' && (height === 812 || height === 896));
const iPhone5 = (Platform.OS === 'ios' && height === 568);
const BASE_HEIGHT = 812 ;
const mHeight = Platform.OS === 'ios' ? iPhoneX ? height - 78 : height : height - 24
const smartScale = (value) => (value * mHeight) / BASE_HEIGHT;
const isTablet=()=> {
    if ( isIphone ){
        return Platform.isPad ;
    }else {
        return (height/width) <= 1.6
    }
}
export default {
    countPixelRatio: (defaultValue) => {
        return smartScale(defaultValue);
    },
    responsiveHeight: (size) => size * heightPer ,
    responsiveWidth: (size) => size * widthPer ,
    width,
    height,
    isPhone: !isTablet(),
    isTab: isTablet(),
    isIphone,
    isIphoneX:iPhoneX
}


