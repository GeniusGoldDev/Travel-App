import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { COLORS } from '../../common';

class DropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
    }

    render() {
        const { label, data } = this.props
        return (
            <Dropdown
                label={label}
                data={data}
                containerStyle={styles.containerStyle}
                inputContainerStyle={{ alignItems: 'flex-start' }}

            />

        );
    }
}

export { DropDown }

const styles = StyleSheet.create({
    container: {
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        width: '75%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    containerStyle: {
        width: '75%',
        alignSelf: 'center',
    }
})