import {createStackNavigator} from "react-navigation";
import DrawerNavigation from "./DrawerNavigation";
import AddEstraha from "../containers/AddEstraha";
import Offers from "../containers/Offers";
import Help from "../containers/Help";
import AdditionalStack from './AdditionalStack';



export default createStackNavigator({
    // AdditionalStack: AdditionalStack,
    MainScreen : DrawerNavigation,
    OffersScreen : Offers,
    HelpScreen : Help,

},{
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});
