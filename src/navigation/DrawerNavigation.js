import {createDrawerNavigator} from "react-navigation";
import React from "react";
import TabNavigation from "./TabNavigation";
import { SCREEN } from "../common";
import Drawer from "../containers/Drawer"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
const DrawerNavigation = createDrawerNavigator({
    Drawer : TabNavigation
},{
    drawerPosition : "left",
    drawerWidth : SCREEN.WIDTH * 0.8,
    contentComponent : Drawer,
    defaultNavigationOptions:()=>{
        return{
            drawerIcon : <Icon name={"menu"} />
        }
    }
});


DrawerNavigation.navigationOptions = () => {
    return {
        header : null
    };
};

export default DrawerNavigation;
