/**
 * This File used as ref Navigator to all App Screens
 * you just call navigator function and pass it "navigation" as param
 * EX: if you want to navigate to login screen
 * ---> navigateToLogin(navigation);
 */


 export const navigateToAuth = (navigation)=>{
     // navigation.navigate("AuthScreen")
    navigation.navigate({routeName: 'AuthScreen', transitionStyle: 'inverted'})
 }


 export const navigateToLogin = (navigation)=>{
    // navigation.navigate("LoginScreen")
     navigation.navigate({routeName: 'LoginScreen', transitionStyle: 'inverted'})
 }

 export const navigateToCheckPhone = (navigation)=>{
    // navigation.navigate("CheckPhoneScreen")
     navigation.navigate({routeName: 'LoginScreen', transitionStyle: 'inverted'})
 }

 export const navigateToOtp = (navigation)=>{
    // navigation.navigate("OtpScreen")
     navigation.navigate({routeName: 'OtpScreen', transitionStyle: 'inverted'})
 }

 export const navigateToRegister = (navigation)=>{
    // navigation.navigate("RegisterScreen")
     navigation.navigate({routeName: 'RegisterScreen', transitionStyle: 'inverted'})
 }

export const navigateToTour = (navigation)=>{
    // navigation.navigate("TourScreen")
    navigation.navigate({routeName: 'TourScreen', transitionStyle: 'inverted'})
}

export const navigateToAddEstraha = (navigation)=>{
   // navigation.navigate("AddEstrahaScreen")
    navigation.navigate({routeName: 'AddEstrahaScreen', transitionStyle: 'inverted'})
}

export const navigateToOffers = (navigation)=>{
   // navigation.navigate("OffersScreen")
    navigation.navigate({routeName: 'OffersScreen', transitionStyle: 'inverted'})
}


export const navigateToHelp = (navigation)=>{
   // navigation.navigate("HelpScreen")
    navigation.navigate({routeName: 'HelpScreen', transitionStyle: 'inverted'})
}



export const navigateToMain = (navigation)=>{
   // navigation.navigate("MainScreen")
    navigation.navigate({routeName: 'MainScreen', transitionStyle: 'inverted'})
}

export const navigateToHome = (navigation)=>{
   // navigation.navigate("HomeScreen")
    navigation.navigate({routeName: 'HomeScreen', transitionStyle: 'inverted'})
}


export const navigateToSearch = (navigation)=>{
   // navigation.navigate("SearchScreen")
    navigation.navigate({routeName: 'SearchScreen', transitionStyle: 'inverted'})
}

export const navigateToFavorites = (navigation)=>{
   // navigation.navigate("FavoritesScreen")
    navigation.navigate({routeName: 'FavoritesScreen', transitionStyle: 'inverted'})
}

export const navigateToProfile = (navigation)=>{
   // navigation.navigate("ProfileScreen")
    navigation.navigate({routeName: 'ProfileScreen', transitionStyle: 'inverted'})
}


export const navigateToCheckMail = (navigation)=>{
   // navigation.navigate("CheckMailScreen")
    navigation.navigate({routeName: 'CheckMailScreen', transitionStyle: 'inverted'})
}

export const navigateToFilter = (navigation, option)=>{
    // navigation.navigate("CheckMailScreen")
    navigation.navigate('FilterScreen',option, {transitionStyle: 'inverted'})
}


export const navigateToSorting = (navigation, option)=>{
    // navigation.navigate("CheckMailScreen")
    navigation.navigate('SortingScreen',option, {transitionStyle: 'inverted'})
}
export const navigateToEstrahaDetails = (navigation, option)=>{
    // navigation.navigate("CheckMailScreen")
    navigation.navigate('EstrahaDetailsScreen',option, {transitionStyle: 'inverted'})
}

export const navigateViewPropertyPhoto = (navigation, option)=>{
    // navigation.navigate("CheckMailScreen")
    navigation.navigate('ViewPropertyPhotoScreen',option, {transitionStyle: 'inverted'})
}


export const navigateViewPropertyAnimPhoto = (navigation, option)=>{
    // navigation.navigate("CheckMailScreen")
    navigation.navigate('ViewPropertyPhotoAnimScreen',option, {transitionStyle: 'inverted'})
}

export const navigateAddComment = (navigation, option)=>{
    // navigation.navigate("CheckMailScreen")
    navigation.navigate('AddComment',option, {transitionStyle: 'inverted'})
}

export const navigateFavorite = (navigation, option)=>{
    // navigation.navigate("CheckMailScreen")
    navigation.navigate('FavoritesScreen',option, {transitionStyle: 'inverted'})
}
