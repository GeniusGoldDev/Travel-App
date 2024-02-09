import React,{Component} from 'react';
import {Switch} from 'react-native';
import {COLORS} from '../../common';

class MySwitch extends Component{
    render(){
        return(
            <Switch
                ios_backgroundColor={'white'}
                onValueChange={this.props.onValueChange}
                value={this.props.value}
                trackColor={{true: COLORS.main, false: 'grey'}}
            />
        )
    }
}

export { MySwitch as Switch }
