import { TEXTS, ICONS } from "../../common";
import { navigateToAddEstraha, navigateToLogin, navigateToProfile, navigateToOffers, navigateToHelp, } from "../../navigation/Navigator";

export default (user) => {
    return user ?
    [
        { id: 0, title: TEXTS.add_estraha, icon: ICONS.menu_add_estraha, screen: navigateToAddEstraha },
        { id: 1, title: TEXTS.my_profile, icon: ICONS.menu_profile, screen: user ? navigateToProfile : navigateToLogin },
        { id: 2, title: TEXTS.offers, icon: ICONS.menu_offers, screen: navigateToOffers },
        { id: 3, title: TEXTS.help, icon: ICONS.menu_help, screen: navigateToHelp },
    ]
        :
    [
        { id: 0, title: TEXTS.add_estraha, icon: ICONS.menu_add_estraha, screen: navigateToLogin },
        { id: 1, title: TEXTS.my_profile, icon: ICONS.menu_profile, screen: navigateToLogin },
        { id: 2, title: TEXTS.offers, icon: ICONS.menu_offers, screen: navigateToOffers },
        { id: 3, title: TEXTS.help, icon: ICONS.menu_help, screen: navigateToHelp },

    ]

}