import React, {Component} from 'react';
import {Image, PermissionsAndroid, TextInput, TouchableOpacity, View} from 'react-native';
import PlaceCardList from '../Search/PlaceCardList';
import {navigateToFilter, navigateToSorting, navigateFavorite} from './../../navigation/Navigator';
import {getFavorites} from '../../service/property';
import withLoader from '../../redux/actions/withLoader';
import {connect} from 'react-redux';


class Favorites extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            places: [],
        };
    }

    async componentDidMount() {
        this.getData();
    }

    getData = async () => {
        const {iUserId } = this.props.user;
        this.props.loader(true);
        console.log({iUserId})
        let res = await getFavorites({iUserId});
        console.log(res)

        this.props.loader(false);

        if(res.message.Output === 0 && res.property.length>0){
            this.setState({places:res.property});
        }

    };
    onPropertyClose=()=>{
        navigateFavorite(this.props.navigation)
    }

    render() {
        const {places, filterPlaces} = this.state;
        return (
            <View style={{flex: 1}}>
                <PlaceCardList
                    {...this.props}
                    style={{flex: 1}}
                    places={places}
                    handleBack={this.onPropertyClose}
                    />

            </View>
        );
    }
}

const mapStateToProps=(state)=>{
    return {user:state.auth.user }
}

export default withLoader(connect(mapStateToProps)(Favorites));


