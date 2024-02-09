import React, {Component} from 'react';
import {Text,
    FlatList, View, Image, TouchableOpacity,Modal
} from 'react-native';
import {COLORS, FONTS, TEXTS} from '../../common';
import {AppText} from '../../components/AppText';
import {navigateToEstrahaDetails, navigateViewPropertyAnimPhoto} from '../../navigation/Navigator';
import MatrialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import StyleConfig from './../../assets/style';
import {getImageUrl} from './../../common/Utils';
import AppImages from './../../assets/images';

import GallerySwiper from "react-native-gallery-swiper";
export default class ViewPropertyPhoto extends Component {

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
                onPress={() => navigateToEstrahaDetails(navigation)}
            />,

        };
    };

    constructor(props) {
        super(props);
        let allImages = this.props.navigation.getParam('all_images');
        let allImagesSrc = [];
        let slides = [];
        for (let ind in allImages) {
            let imageUrl = getImageUrl(allImages[ind].iPropertyId, allImages[ind].vImage);
            slides.push({
                ...allImages[ind],
                imageUrl,
                index:ind
            });
            allImagesSrc.push({url:imageUrl.uri})
        }

        this.state = {allImages, slides, allImagesSrc, showImageViewer:false};
    }
    _onItemPress=(item)=>{
        const {navigation} = this.props;
        let all_images = this.props.navigation.getParam('all_images');
        let initialPage = 0 ;
        for (let ind in all_images) {
           if(all_images[ind].vImage == item.vImage){
               initialPage = ind;
               break;
           }
        }
        navigateViewPropertyAnimPhoto(navigation,{all_images, initialPage})
    }
    render() {
        const {allImages, slides, allImagesSrc} = this.state;
        return (
            <View style={{flex: 1}}>

                <FlatList
                    data={allImages}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={()=> this._onItemPress(item)}
                            style={{flexDirection: 'column',flex:1, justifyContent:'center', marginTop: 4}}>
                            <Image style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: StyleConfig.width,
                                height: StyleConfig.height*0.35,
                            }}
                           resizeMode={'stretch'}
                           source={getImageUrl(item.iPropertyId, item.vImage)}/>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                <Modal visible={this.state.showImageViewer}
                       transparent={true}>
                    <GallerySwiper
                        images={allImagesSrc}/>
                </Modal>
            </View>
        );
    }


    _renderItem = ({item}) => <Image
        source={getImageUrl(item.iPropertyId, item.vImage)}
        style={{height:StyleConfig.height, width: StyleConfig.width}}/>



}

//                 <AppIntroSlider slides={allImages} renderItem={this._renderItem} showNextButton={false} showDoneButton={false}/>
// <AppIntroSlider slides={slides} renderItem={this._renderItem}/>;

