import React from "react";
import { Image } from "react-native"
import { createBottomTabNavigator, createStackNavigator, Header } from "react-navigation";
import Home from "../containers/Home";
import Search from "../containers/Search";
import Favorites from "../containers/Favorites";
import Profile from "../containers/Profile";
import { ICONS, TEXTS, COLORS, FONTS, IMAGES } from "../common";
import { Icon } from "../components";
import MatrialIcon from "react-native-vector-icons/MaterialCommunityIcons"


const TabNavigation = createBottomTabNavigator({
        HomeScreen: Home,
        SearchScreen: Search,
        FavoritesScreen: Favorites,
        ProfileScreen: Profile,

    },
    {
        initialRouteName: "HomeScreen",
        defaultNavigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state;
            let iconName = "", tabBarLabel = "";
            if (routeName === 'ProfileScreen') {
                iconName = ICONS.tabbar_profile_disabled;
                tabBarLabel = TEXTS.my_profile;
            }
            else if (routeName === "SearchScreen") {
                iconName = ICONS.search_disabled;
                tabBarLabel = TEXTS.search
            }
            else if (routeName === 'FavoritesScreen') {
                iconName = ICONS.tabbar_favorite_disabled;
                tabBarLabel = TEXTS.favorite
            }
            else if (routeName === "HomeScreen") {
                iconName = ICONS.tabbar_home_disabled;
                tabBarLabel = TEXTS.discover
            }
            return {
                tabBarIcon: ({ tintColor }) => <Icon name={iconName} size={16} color={tintColor} />,
                tabBarLabel
            }


        },
        tabBarOptions: {
            activeTintColor: COLORS.main,
            style: { padding: 5 },
            labelStyle: { ...FONTS.regular }
        },
        resetOnBlur: true

    }
);


TabNavigation.navigationOptions = ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    let headerTitle = routeName;
    if (routeName === 'ProfileScreen') {
        headerTitle = TEXTS.my_profile;
    }
    else if (routeName === "SearchScreen") {
        headerTitle = TEXTS.search
    }
    else if (routeName === 'FavoritesScreen') {
        headerTitle = TEXTS.favorite
    }
    else if (routeName === "HomeScreen") {
        headerTitle = () => <Image source={IMAGES.logo} resizeMode={"contain"} style={{ width: 100 }} />
    }
    return {
        headerTitle,
        headerTitleStyle: { ...FONTS.bold, fontSize: 17 },
        headerLeft: routeName == 'ProfileScreen' ?  <MatrialIcon
            name={"menu"}
            size={25}
            color={COLORS.main}
            onPress={() => navigation.openDrawer()}
        /> : null,
        // headerTintColor: COLORS.main,

    };
};





export default createStackNavigator({
    Tabs: TabNavigation
}, {
        headerBackTitleVisible: false,
        headerLayoutPreset: "center"
    });
