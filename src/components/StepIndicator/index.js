import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { COLORS } from '../../common';

class MyStepIndicator extends Component {
  render() {
    const labels = ["معلومات اساسية","خيارات إضافية","الصور والفديو"];
    return (
      <StepIndicator
        currentPosition={this.props.currentPosition}
        labels={labels}
        stepCount={3}
        onPress={this.props.onPress}
        customStyles={{
            labelColor: "#ccc",
            currentStepLabelColor: COLORS.main,
            stepStrokeCurrentColor: COLORS.main,
            separatorUnFinishedColor: "#ccc",
            stepIndicatorLabelCurrentColor: COLORS.main,
             stepIndicatorFinishedColor: COLORS.green,
            stepIndicatorUnFinishedColor: "#ccc",
            stepIndicatorSize: 20,
            currentStepIndicatorSize: 25,
            stepIndicatorCurrentColor:COLORS.main,

            stepIndicatorLabelFinishedColor: COLORS.green,
            stepIndicatorLabelUnFinishedColor: "#ccc",
            separatorFinishedColor:COLORS.green,
            // stepStrokeFinishedColor: COLORS.main,
        }}
      />
    );
  }
}


export { MyStepIndicator as StepIndicator }


