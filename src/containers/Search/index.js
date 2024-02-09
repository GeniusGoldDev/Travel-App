import React, {Component} from 'react';
import {Image, PermissionsAndroid, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {AppText, Icon} from '../../components/index';
import PlaceCardList from '../Search/PlaceCardList';
import {COLORS, ICONS, TEXTS} from '../../common';
import APP_IMAGES from '../../assets/images';
import {navigateToFilter, navigateToSorting, navigateToSearch} from './../../navigation/Navigator';
import Geolocation from '@react-native-community/geolocation';
import StyleConfig from '../../assets/style';
import MatrialIcon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {category, city, searchResult} from '../../service/search';
import withLoader from '../../redux/actions/withLoader';
import _ from 'lodash';
import {connect} from 'react-redux';


//1- Default sort is (top rated) -Done
// 2 highest price sort is not correct - API bug
// 3- filters are not working correctly
// 4- slider used to be smooth, now it is breaking
// 5- searching box is not working keep refreshing the page !

let filterObj = {order: TEXTS.top_reated, paging: true, pages: 1};
let total_pages = 1, scrollToInd = null;

export async function request_device_location_runtime_permission() {

    try {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    } catch (err) {
        console.warn(err);
    }
}

class Search extends Component {

    constructor(props) {
        super(props);
        console.log(props.user);
        this.state = {
            loading: true,
            searchText: '',
            filterPlaces: [],
            places: [],
            page: 1,
            latitude: 0.0, longitude: 0.0,
            sortBy: TEXTS.top_reated,
            cityList: [],
            categoryList: [],
        };
    }

    async componentDidMount() {
        // this.props.getHomeData();
        if (!StyleConfig.isIphone) {
            await request_device_location_runtime_permission();
        }
        Geolocation.getCurrentPosition(info => {
            const {latitude, longitude} = info.coords;
            this.setState({latitude, longitude});
        },{
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 10000
        });
        this.performAdvanceSearch(1);
    }

    getSearchResultFromAPI = async (body) => {
        let res = [];
        this.props.loader(true);
        console.log(JSON.stringify({body}));
        let response = await searchResult(body);//{message:{Output:1}} // await searchResult(data);
        console.log(JSON.stringify({response}));

        this.props.loader(false);
        if (response.message.Output === 0) {
            res = response.data;
            total_pages = response.message.total_pages;
            res = res.map((item) => {
                item.vWeekdayPrice = parseInt(Number(item.vWeekdayPrice) * 1.1);
                item.vTotalRating = item.vTotalRating == null || item.vTotalRating == '' ? 0 : item.vTotalRating;
                return item;
            });
        }
        return res;
    };

    onSearch = () => {
        const {searchText} = this.state;
        if (searchText.length > 0) {
            this.performAdvanceSearch(1);
        }
    };

    // onChangeTextSearch = (searchText) => {
    //     this.setState({ searchText});
    // };

    onFilterData = async (data) => {
        //let temp = {...filterObj, ...data};
        const {order, paging, page, ...rest} = filterObj
        if (!_.isEqual(data, rest)) {
            filterObj = {...data, order,paging};
            this.performAdvanceSearch(1);
        }

    };
    onSortingData = async (data, filterData) => {
        filterObj = {...filterObj, ...filterData, ...data};
        this.performAdvanceSearch(1);
    };
    performAdvanceSearch = async (pages) => {
        let {filterPlaces, places, searchText} = this.state;
        let req = {};
        let {vKeyword, ...mFilterObj} = filterObj
        if (searchText.length > 0) {
            req = {paging: true, pages, ...mFilterObj, vKeyword: searchText};
        } else {
            req = {paging: true, pages, ...mFilterObj};
        }

        let res = [];
        switch (filterObj.order) {
            case TEXTS.most_recent:
                req = {...req, order: 'recent'};
                // res = await this.getSearchResultFromAPI(req);
                break;
            case TEXTS.lowest_first:
                req = {...req, order: 'price'};
                // res = await this.getSearchResultFromAPI(req);
                break;
            case TEXTS.highest_first:
                req = {...req, order: 'price', vSort: 'DESC'};
                // res = await this.getSearchResultFromAPI(req);
                break;
            case TEXTS.distance:
                const {latitude, longitude} = this.state;
                req = {...req, order: 'nearest', vLatitude: latitude, vLongitude: longitude};
                // res = await this.getSearchResultFromAPI(req);
                break;
            case TEXTS.top_reated:
                req = {...req, order: 'review'};
                // res = await this.getSearchResultFromAPI(req);
                break;
            // case TEXTS.least_rated:
            //     req = {...req, order: 'review'};
            //     res = await this.getSearchResultFromAPI(req);
            //     res = _.reverse(res);
            //     break;
        }
        res = await this.getSearchResultFromAPI(req);
        if (pages > 1) {
            filterPlaces = filterPlaces.concat(res);
            places = places.concat(res);
        } else {
            filterPlaces = res;
        }
        this.setState({filterPlaces: filterPlaces, places, searchText: '', page: pages, sortBy: filterObj.order});
    };
    onAdvanceSearch = async () => {
        let {categoryList} = this.state;

        let places, cityList = [];
        this.props.loader(true);
        places = await this.getSearchResultFromAPI({order: 'recent'});
        let responseCity = await city();
        if (categoryList.length == 0) {
            let responseCategory = await category();
            if (responseCategory.message.Output === 0) {
                categoryList = responseCategory.data;
            }
        }
        this.props.loader(false);
        if (places.length > 0) {
            if (responseCity.message.Output === 0) {
                let city = responseCity.data;
                let cityInlist = places.map((item) => item.vCity);
                cityList = city.filter((item) => cityInlist.includes(item.vCity));
            }
        }
        this.setState({
            cityList,
            categoryList,
        });
        navigateToFilter(this.props.navigation, {
            filterData: this.onFilterData,
            city: cityList,
            categoryList,
            filterObj:{},
            places,
        });
    };
    onSorting = () => {
        const {sortBy} = this.state;
        navigateToSorting(this.props.navigation, {saveSortBy: this.onSortingData, sortBy, filterObj});
    };
    handleLoadMore = async () => {
        let {page} = this.state;
        if (page < total_pages) {
            await this.performAdvanceSearch(page + 1);
        }
    };
    onPropertyClose=()=>{
        navigateToSearch(this.props.navigation)
    }

    render() {
        const {searchText, filterPlaces} = this.state;
        return (
            <View style={{flex: 1}}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputStyle}
                        value={searchText}
                        placeholder={TEXTS.search_Text}
                        onChangeText={(searchText) => this.setState({searchText})}
                        underlineColorAndroid="transparent"
                    />
                    <TouchableOpacity style={styles.iconStyle} activeOpacity={0.5} onPress={this.onSearch}>
                        <Icon name={ICONS.search} size={22} color={COLORS.text_input}/>
                    </TouchableOpacity>

                </View>
                <LinearGradient
                    colors={COLORS.main_button}
                    //style={[styles.buttonContainer, buttonStyle]}
                    useAngle={true} angle={135}>

                    <View style={{flexDirection: 'row'}}>

                        <TouchableOpacity onPress={this.onSorting} style={styles.advancedSearchStyle}>
                            <MatrialIcon name={'sort'} size={25} color={'#fff'}/>
                            <AppText style={styles.searchText}>{this.state.sortBy}</AppText>
                        </TouchableOpacity>
                        <View>
                            <View style={{
                                width: 1.5,
                                flex: 1,
                                marginVertical: 10,
                                backgroundColor: COLORS.input_border,
                            }}></View>
                        </View>
                        <TouchableOpacity onPress={this.onAdvanceSearch} style={styles.advancedSearchStyle}>
                            <Image
                                source={APP_IMAGES.ic_filter}
                                style={{height: 18, width: 18, tintColor: 'white'}}
                            />
                            <AppText style={styles.searchText}>{TEXTS.advanced_search}</AppText>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

                <PlaceCardList
                    {...this.props}
                    style={{flex: 1}}
                    scrollToIndex={(ref) => this.scrollToInd = ref}
                    handleLoadMore={this.handleLoadMore}
                    places={filterPlaces}
                    handleBack={this.onPropertyClose}
                    />

            </View>
        );
    }
}

const mapStateToProps=(state)=>{
    return {user:state.auth.user }
}

export default withLoader(connect(mapStateToProps)(Search));


