import React, { Component } from 'react'
import { StyleSheet, ImageBackground, StatusBar } from 'react-native'
import {connect} from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';
import { navigateToTour, navigateToAuth, navigateToHome } from '../../navigation/Navigator';
import { IMAGES } from '../../common';
import withLoader from '../../redux/actions/withLoader';

class Splash extends Component {
    componentDidMount() {
        this.startup()
    }
    startup = async () => {
        const { navigation,user, loader } = this.props;
        loader(false);
        try {
            const isFirstTime = await AsyncStorage.getItem("@IS_FIRST_TIME");
            setTimeout(async () => {
                if(user){
                    return navigateToHome(navigation)
                }
                if (!isFirstTime) {
                    await AsyncStorage.setItem("@IS_FIRST_TIME", "true").then(() => {
                        navigateToTour(navigation)
                    })
                } else {
                    navigateToAuth(navigation)
                    // navigateToHome(navigation)
                }
            }, 2000);


        } catch (error) {
            console.log(error)
        }
    }
    render() {
        return (
            <ImageBackground source={IMAGES.splash} style={styles.container} >
                <StatusBar barStyle={"light-content"} />
            </ImageBackground>
        )
    }
}

const mapStateToProps = state =>{
    return{
        user : state.auth.user
    }
}

export default withLoader(connect(mapStateToProps)(Splash))
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
