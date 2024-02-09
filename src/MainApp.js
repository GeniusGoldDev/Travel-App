


import React, { Component } from 'react'
import { Text, StatusBar, View, RNRestart } from 'react-native'
import {connect} from "react-redux";
import AppNavigation from './navigation';
import { LoadingModal } from './components/LoadingModal';
import withLoader from './redux/actions/withLoader';

class MainApp extends Component {
    constructor(props){
        super(props);
        console.disableYellowBox = true;

    }
    render() {
        return (
            <View style={{ flex: 1 }} >
                <StatusBar barStyle="dark-content" />
                <AppNavigation />
                <LoadingModal visible={this.props.loading || this.props.loader} />
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        loading : state.loading,
        loader: state.loader
    }
}
export default connect(mapStateToProps)(MainApp)

