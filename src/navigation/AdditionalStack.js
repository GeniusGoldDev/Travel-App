import {
    createStackNavigator
} from "react-navigation";
import Filter from './../containers/Filter';
import {COLORS, FONTS, TEXTS} from '../common';
import MatrialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {navigateToSearch} from './../navigation/Navigator';
import {AppText} from '../components/AppText';
import Sorting from '../containers/Sorting';
import EstrahaDetails from '../containers/EstrahaDetails';
import ViewPropertyPhoto from '../containers/EstrahaDetails/ViewPopertyPhoto';
import ViewPropertyPhotoAnim from '../containers/EstrahaDetails/ViewPropertyPhotoAnim';
import AddComment from '../containers/EstrahaDetails/AddComment';
import AddEstraha from '../containers/AddEstraha';
const AdditionalStack = createStackNavigator({
    AddEstrahaScreen:AddEstraha,
    EstrahaDetailsScreen:EstrahaDetails,
    FilterScreen : Filter,
    SortingScreen: Sorting,
    ViewPropertyPhotoScreen:ViewPropertyPhoto,
    ViewPropertyPhotoAnimScreen:ViewPropertyPhotoAnim,
    AddComment: AddComment

  },{
    // cardShadowEnabled : true,
    // cardOverlayEnabled: true,
    // headerBackTitleVisible : false,
    defaultNavigationOptions : ({ navigation })=>{
        return{
            // headerStyle : {borderBottomWidth:0, shadowColor:null, shadowOpacity:null,elevation:null},
            title : TEXTS.filter_results,
            titleStyle:{ ...FONTS.bold, fontSize: 17 },
            headerTintColor : COLORS.main,
            headerRight:  <MatrialIcon
                name={"close"}
                size={25}
                color={COLORS.main}
                style={{marginHorizontal:8}}
                onPress={() => navigateToSearch(navigation)}
            /> ,
            headerLeft:   <AppText
                onPress={() => navigateToSearch(navigation)}
                style={{color:COLORS.textColor, paddingHorizontal:8}}>{TEXTS.survey}</AppText>

             ,
        }
    }
});


export default AdditionalStack;
