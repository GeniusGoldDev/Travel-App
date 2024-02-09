import React, { Component } from 'react';
import {
    TextInput,
    View,
    ScrollView
} from 'react-native';
import { AppText } from '../../components/AppText';
import styles from './styles';
import { COLORS, TEXTS } from '../../common';
import { CDropDown } from '../../components/CDropDown';
import { category, city } from '../../service/search';
import { LGButton } from '../../components/Button';
import StyleConfig from '../../assets/style';
import MapView, { Marker } from 'react-native-maps';
import AppImages from '../../assets/images';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const DIRECTION_ITEMS = [
    { name: TEXTS.north, id: 1 },
    { name: TEXTS.east, id: 3 },
    { name: TEXTS.west, id: 4 },
    { name: TEXTS.south, id: 2 },
];

class BasicInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vLatitude: props.latitude,
            vLongitude: props.longitude,
            cityList: [],
            categoryList: [],
            selectedCity: {},
            selectedDirection: {},
            vProperty: '',
            tDescription: '',
            vAddress: '',
            iRegionId: -1,
            iCityId: -1,
            iCategoryId: -1,
            error: {},
            enableError: false

        };
        props.onUpdateMap(this.onUpdateLatLong)
    }

    componentDidMount = async () => {
        let { categoryList, cityList } = this.state;
        let responseCity = await city();
        if (responseCity.message.Output === 0) {
            cityList = responseCity.data;
        }
        let responseCategory = await category();
        if (responseCategory.message.Output === 0) {
            categoryList = responseCategory.data;
        }
        this.setState({ cityList, categoryList });
        this.props.loader(false);
    };
   
 onSaveNext = () => {
        if (this.isValid(true) == true) {
            const { vLatitude, vLongitude, vProperty, tDescription, iRegionId,
                iCityId,
                iCategoryId, vAddress } = this.state;

            const data = {
                vLongitude, vLatitude, vProperty, tDescription,
                iRegionId,
                iCityId,
                iCategoryId,
                vAddress
            };
            this.props.setCurrentPos(1, data)
        }
    }

    isValid = (enableError = false) => {
        const { vProperty, tDescription, iRegionId,
            iCityId,
            iCategoryId, vAddress } = this.state;
        let error = {}
        if (vProperty == undefined || vProperty.trim().length == 0) {
            console.log('TEXTS.enter_name_of_property');
            error = { vProperty: TEXTS.enter_name_of_property }
            //return TEXTS.enter_name_of_property;
        } else if (iCategoryId == -1) {
            console.log('TEXTS.choose_a_category');
            error = { iCategoryId: TEXTS.choose_a_category }
            //return TEXTS.choose_a_category;
        } else if (iCityId == -1) {
            console.log('TEXTS.choose_a_city');
            error = { iCityId: TEXTS.choose_a_city }
            //return TEXTS.choose_a_city;
        } else if (iRegionId == -1) {
            console.log('TEXTS.choose_the_name_of_region');
            error = { iRegionId: TEXTS.choose_the_name_of_region }
            //return TEXTS.choose_the_name_of_region;
        } else if (vAddress == undefined || vAddress.trim().length == 0) {
            console.log('TEXTS.enter_the_address');
            error = { vAddress: TEXTS.enter_the_address }
            //return TEXTS.enter_the_address;
        } else if (tDescription == undefined || tDescription.trim().length == 0) {
            console.log('TEXTS.enter_the_description');
            error = { tDescription: TEXTS.enter_the_description }
            //return TEXTS.enter_the_description;
        } else {
            this.setState({ error, enableError })
            return true;
        }
        this.setState({ error, enableError })


    }

    //https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJ9etEWz6GdUgRj1IstQhhYt4&key=AIzaSyAgyMwNN0Pyv5nilrWoHH0rFP8St2WFOis

    getPlacesFromPlaceId = async (placeId) => {
        const mKey = 'AIzaSyAgyMwNN0Pyv5nilrWoHH0rFP8St2WFOis';
        // const placeId =  'ChIJ9etEWz6GdUgRj1IstQhhYt4';
        const URL = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${mKey}`
        const response = await fetch(URL);
        const json = await response.json();
        console.log('get_request req-> ', URL, '\nres->', JSON.stringify(json))
        const { lat, lng } = json.result.geometry.location
        const vAddress = json.result.formatted_address;
        this.setState({ vLatitude: lat, vLongitude: lng, vAddress })
        this.isValid()
    }


    render() {
        let { vProperty, tDescription, vAddress, error, enableError } = this.state;
        error = enableError ? error : {}
        console.log(error)
        return (<ScrollView>

            <View style={styles.row}>
                <View>
                    <View style={error['vProperty'] == undefined ? styles.inputContainer : styles.errorInputContainer}>
                        <TextInput
                            style={styles.inputStyle}
                            value={vProperty}
                            placeholder={TEXTS.name_placeholder}
                            onChangeText={(vProperty) => {
                                this.setState({ vProperty })
                                this.isValid()
                            }}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    {error['vProperty'] && <AppText style={styles.errorText}>{error['vProperty']}</AppText>}
                </View>
                <View style={{ flexDirection: 'row', zIndex: 99, position: 'absolute', marginTop: StyleConfig.countPixelRatio(-10), marginHorizontal: StyleConfig.countPixelRatio(16) }}>
                    <AppText
                        style={{
                            fontSize: StyleConfig.countPixelRatio(14),
                            paddingHorizontal: StyleConfig.countPixelRatio(4),
                            backgroundColor: 'white',
                            color: COLORS.textColor,
                            fontWeight: 'bold',
                            marginHorizontal: StyleConfig.countPixelRatio(4)
                        }}
                    >{TEXTS.break_name}</AppText>
                </View>
            </View>



            <View style={styles.row}>
                {this.renderDropDownBreakName(TEXTS.type_of_break, this.state.categoryList, error.iCategoryId)}
            </View>
            <View style={styles.row}>
                {this.renderDropDownCity(TEXTS.city, this.state.cityList, error.iCityId)}
            </View>
            <View style={styles.row}>
                {this.renderDropDownDirection(TEXTS.direction, DIRECTION_ITEMS, error.iRegionId)}
            </View>
            {/* {this.renderGooglePlace(error.vAddress)} */}
            
            <View style={styles.row}>
                <View>
                    <View style={error['vAddress'] == undefined ? styles.inputContainer : styles.errorInputContainer}>
                        <TextInput
                            style={styles.inputStyle}
                            value={vAddress}
                            placeholder={TEXTS.add_placeholder_text}
                            onChangeText={(vAddress) => {
                                this.setState({ vAddress })
                                this.isValid()
                            }}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    {error['vAddress'] && <AppText style={styles.errorText}>{error['vAddress']}</AppText>}
                </View>
                <View style={{ flexDirection: 'row', zIndex: 99, position: 'absolute', marginTop: StyleConfig.countPixelRatio(-10), marginHorizontal: StyleConfig.countPixelRatio(16) }}>
                    <AppText
                        style={{
                            fontSize: StyleConfig.countPixelRatio(14),
                            paddingHorizontal: StyleConfig.countPixelRatio(4),
                            backgroundColor: 'white',
                            color: COLORS.textColor,
                            fontWeight: 'bold',
                            marginHorizontal: StyleConfig.countPixelRatio(4)
                        }}
                    >{TEXTS.title}</AppText>
                </View>
            </View>
            {this.renderMap()}



            <View style={[styles.row, { flexDirection: 'column' }]}>
                <AppText>{TEXTS.describe_break}</AppText>
                <View style={error['tDescription'] == undefined ? styles.inputContainer : styles.errorInputContainer}>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        style={[styles.inputStyle, { height: 100 }]}
                        value={tDescription}
                        onChangeText={(tDescription) => {
                            this.setState({ tDescription })
                            this.isValid()
                        }}
                        underlineColorAndroid="transparent"
                    />
                </View>
                {error['tDescription'] && <AppText style={styles.errorText}>{error['tDescription']}</AppText>}
            </View>



            <View style={[styles.row, { justifyContent: 'center' }]}>
                <LGButton
                    onPress={this.onSaveNext}
                    buttonStyle={styles.resultButton}
                    title={TEXTS.save_and_next} />
            </View>
        </ScrollView>);
    }

    _onChangeTextCategory = (data) => {
        const { categoryList } = this.state
        let filterCat = categoryList.filter((item) => item.vCategory == data)
        const { iCategoryId } = filterCat[0]
        console.log('_onChangeTextCategory', { data, iCategoryId, filterCat })
        this.setState({ iCategoryId })
        this.isValid()
    }
    _onChangeTextCity = (data) => {
        const { cityList } = this.state
        const filterCity = cityList.filter((item) => item.vCity == data)
        const { iCityId } = filterCity[0]
        console.log('_onChangeTextCity', { data, iCityId, filterCity })
        this.setState({ iCityId })
        this.isValid()
    }
    _onChangeTextDirection = (data) => {
        const filterDir = DIRECTION_ITEMS.filter((item) => item.name == data)
        const { id } = filterDir[0]
        console.log('_onChangeTextCity', { data, iRegionId: id, DIRECTION_ITEMS })
        this.setState({ iRegionId: id })
        this.isValid()
    }
    renderDropDownBreakName = (title, items, isError) => <CDropDown
        title={title}
        data={items}
        value={title}
        isError={isError}
        labelExtractor={({ vCategory } = {}, index) => vCategory}
        onChangeText={this._onChangeTextCategory} />;

    renderDropDownCity = (title, items, isError) => <CDropDown
        title={title}
        data={items}
        value={title}
        isError={isError}
        labelExtractor={({ vCity } = {}, index) => vCity}
        onChangeText={this._onChangeTextCity}
    />;

    renderDropDownDirection = (title, items, isError) => <CDropDown
        title={title}
        data={items}
        value={title}
        isError={isError}
        labelExtractor={({ name } = {}, index) => name}
        onChangeText={this._onChangeTextDirection} />;


    renderGooglePlace = (isError) => <View style={styles.row}>
        <View>
            <View style={isError == undefined ? [styles.inputContainer, { paddingVertical: 0 }] : [styles.errorInputContainer, { paddingVertical: 0 }]}>
                <GooglePlacesAutocomplete
                    placeholder={TEXTS.add_placeholder_text}
                    minLength={3} // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                    listViewDisplayed='auto'    // true/false/undefined
                    fetchDetails={true}
                    renderDescription={row => row.description} // custom description render
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                        this.getPlacesFromPlaceId(data.place_id)
                    }}
                    getDefaultValue={() => ''}
                    query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: 'AIzaSyAgyMwNN0Pyv5nilrWoHH0rFP8St2WFOis',
                        language: 'ar-AE', // language of the results  
                    }}
                    styles={{
                        textInputContainer: {
                            width: '100%',
                            backgroundColor: '#FFFFFF',
                            borderTopWidth: 0,
                            borderBottomWidth: 0,
                            //borderBottomColor:COLORS.input_border,
                            flexDirection: 'row',
                        },
                        container: {
                            padding: 0,
                        },
                        description: {
                            fontWeight: 'bold'
                        },
                        predefinedPlacesDescription: {
                            color: '#1faadb'
                        }
                    }}

                    currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                    currentLocationLabel="Current location"
                    nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    GoogleReverseGeocodingQuery={{
                        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro

                    }}
                    GooglePlacesSearchQuery={{
                        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                        rankby: 'distance',
                        type: 'cafe'
                    }}

                    GooglePlacesDetailsQuery={{
                        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                        fields: 'formatted_address',
                    }}

                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

                    debounce={0} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.

                />
            </View>
            {isError && <AppText style={styles.errorText}>{isError}</AppText>}

        </View>
        <View style={{ flexDirection: 'row', zIndex: 99, position: 'absolute', marginTop: StyleConfig.countPixelRatio(-10), marginHorizontal: StyleConfig.countPixelRatio(16) }}>
            <AppText
                style={{
                    fontSize: StyleConfig.countPixelRatio(14),
                    paddingHorizontal: StyleConfig.countPixelRatio(4),
                    backgroundColor: 'white',
                    color: COLORS.textColor,
                    fontWeight: 'bold',
                    marginHorizontal: StyleConfig.countPixelRatio(4)
                }}
            >{TEXTS.title}</AppText>
        </View>
    </View>
    onUpdateLatLong=(vLatitude, vLongitude)=> this.setState({vLatitude, vLongitude})
    renderMap = () => {
        const { vLatitude, vLongitude } = this.state;
        console.log("renderMap",{vLatitude,vLongitude})
        const region = {
            latitude: Number(vLatitude),
            longitude: Number(vLongitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
        if (vLatitude == 0 && vLongitude == 0) {
            return null;
        } else {
            return (
                <View style={{
                    marginTop: StyleConfig.countPixelRatio(20),
                    paddingHorizontal: StyleConfig.countPixelRatio(12),
                }}>
                    <View style={{ height: StyleConfig.countPixelRatio(120), borderRadius: 4 }}>
                    <MapView
                        region={region}
                        onRegionChange={ region => console.log({region}) }
                    />
                        {/* <MapView
                            initialRegion={region}
                            style={{
                                flex: 1,
                                ...StyleSheet.absoluteFillObject,
                            }}
                        >
                            <Marker coordinate={{
                                latitude: Number(vLatitude),
                                longitude: Number(vLongitude),
                            }}>
                                <Image
                                    source={AppImages.ic_map_loc_pin}
                                    resizeMode={'contain'}
                                    style={{
                                        width: StyleConfig.countPixelRatio(24),
                                        height: StyleConfig.countPixelRatio(24)
                                    }}
                                />
                            </Marker>

                        </MapView> */}
                    </View>

                </View>);
        }
    }
}

export default BasicInfo;
