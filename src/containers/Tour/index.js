import React, { Component } from 'react'
import { StatusBar, View } from 'react-native'
import { navigateToAuth } from '../../navigation/Navigator';

import AppIntroSlider from "react-native-app-intro-slider"
import onboard_slides from './onboard_slides';
import styles from './styles';
import OnBoardItem from './OnboardItem';
import { COLORS, TEXTS } from '../../common';

class Tour extends Component {


    renderItem = (slide) => {
        return <OnBoardItem slide={slide} />
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container} >
                <StatusBar barStyle={"light-content"} />
                <AppIntroSlider
                    slides={onboard_slides}
                    renderItem={this.renderItem}
                    activeDotStyle={[styles.sliderDotStyle, { backgroundColor: COLORS.active_dot }]}
                    dotStyle={styles.sliderDotStyle}
                    paginationStyle={styles.paginationStyle}
                    bottomButton={true}
                    buttonStyle={styles.doneButton}
                    buttonTextStyle={styles.doneButtonText}
                    showNextButton={true}
                    doneLabel={TEXTS.done}
                    nextLabel={TEXTS.next}
                    onDone={()=> navigateToAuth(navigation) }
                />
            </View>


        )
    }
}


export default Tour