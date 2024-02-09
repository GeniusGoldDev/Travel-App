import {createAppContainer, createSwitchNavigator} from "react-navigation";
import AuthStack from "./AuthStack";
import Splash from "../containers/Splash";
import Tour from "../containers/Tour";
import Main from "./MainStack";
import AdditionalStack from './AdditionalStack'


const SwitchNavigator = createSwitchNavigator({
    
    SplashScreen : Splash,
    TourScreen : Tour,
    AuthScreen : AuthStack,
    MainScreen : Main ,
    AdditionalStack: AdditionalStack,

});



const AppNavigation = createAppContainer(SwitchNavigator)
export default AppNavigation;
