import React, {Component} from 'react';
import {Text,
    FlatList, View, Image, TouchableOpacity,Modal
} from 'react-native';
import {COLORS, FONTS, TEXTS} from '../../common';
import {AppText} from '../../components/AppText';
import {navigateViewPropertyPhoto} from '../../navigation/Navigator';
import MatrialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import StyleConfig from './../../assets/style';
import {getImageUrl} from './../../common/Utils';
import AppImages from './../../assets/images';
import ImageZoom from 'react-native-image-pan-zoom';
import GallerySwiper from "react-native-gallery-swiper";
export default class ViewPropertyPhotoAnim extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: TEXTS.all_photos,
            titleStyle: {...FONTS.bold, fontSize: 17},
            headerLeft: null,
            headerRight: <MatrialIcon
                name={'close'}
                size={25}
                color={COLORS.main}
                style={{marginHorizontal: 8}}
                onPress={navigation.getParam('close')}
            />,

        };
    };
    componentDidMount() {
        this.props.navigation.setParams({close: this.onClose});
    }
    onClose=()=>{
        let all_images = this.props.navigation.getParam('all_images');
        navigateViewPropertyPhoto(this.props.navigation,{all_images})
    }
    constructor(props) {
        super(props);
        let allImages = this.props.navigation.getParam('all_images');
        let initialPage = Number(this.props.navigation.getParam('initialPage'));
        let allImagesSrc = [];
        for (let ind in allImages) {
            let imageUrl = getImageUrl(allImages[ind].iPropertyId, allImages[ind].vImage);
            allImagesSrc.push({url:imageUrl.uri})
        }

        this.state = { allImagesSrc, initialPage,curr:0};
    }

    render() {
        const { allImagesSrc,initialPage,curr} = this.state;

        console.log({initialPage,allImagesSrc,curr})
        return (
            <View style={{flex: 1}}>

                <ImageZoom cropWidth={StyleConfig.width}
                           cropHeight={StyleConfig.height}
                           imageWidth={StyleConfig.width}
                           imageHeight={StyleConfig.width*0.8}>
                    <Image style={{width:StyleConfig.width, height:StyleConfig.width*0.8}}
                           source={{uri:allImagesSrc[initialPage].url}}/>
                </ImageZoom>
            </View>
        );
    }

}


//  <GallerySwiper
//                       enableScale={true}
//                       initialPage={0}
//                       initialNumToRender={allImagesSrc.length}
//                       loadMinimal={true}
//                       loadMinimalSize={2}
//                       onPageSelected={(curr)=>this.setState({curr})}
//                       images={allImagesSrc}/>
