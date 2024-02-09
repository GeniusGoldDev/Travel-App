import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';

import {styles} from './styles';
import {AppText, CDropDown, LGButton} from '../../components/index';
import {COLORS, FONTS, TEXTS} from '../../common';
import CheckBox from '../../components/CheckBox';
import {navigateToSearch} from '../../navigation/Navigator';
import {filterSearchResult} from '../../common/Utils';
import withLoader from '../../redux/actions/withLoader';
import {city} from '../../service/search';
import MultiSliderView from '../../components/MultiSliderView';

const DIRECTION_ITEMS = [
    {name: TEXTS.north, id: 1},
    {name: TEXTS.east, id: 3},
    {name: TEXTS.west, id: 4},
    {name: TEXTS.south, id: 2},
];
// {name: TEXTS.a_break, selected: false},
// {name: TEXTS.chalet_for_sale, selected: false},
// {name: TEXTS.camp, selected: false},
// {name: TEXTS.stadium, selected: false},
// {name: TEXTS.occasions, selected: false},
let PROPERTY_TYPE_ITEMS = [];

const ADDITIONAL_OPTIONS = [
    {name: TEXTS.swimmingpool, selected: false},
    {name: TEXTS.football_court, selected: false},
    {name: TEXTS.two_parts, selected: false},
];

class Filter extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            gestureResponseDistance: { horizontal: 15 },
            title: TEXTS.filter_results,
            titleStyle: {...FONTS.bold, fontSize: 17},
            headerLeft: <AppText
                onPress={navigation.getParam('setClear')}
                style={{color: COLORS.textColor, paddingHorizontal: 8}}>{TEXTS.survey}</AppText>,
        };
    };

    setInitialState = async () => {
        let {places, min, max, additional_option} = this.state;
        for(let ind in additional_option){
            additional_option[ind]["selected"] = false ;
        }
        await this.setState({
            filterPlaces: places,
            priceRange: [min, max],
            selectedCity: {},
            selectedDirection: {},
            additional_option,
            selectedPropertyType: '',

        });

    };

    constructor(props) {
        super(props);
        const {navigation} = this.props;
        let filterObj = navigation.getParam('filterObj'); //filterObj
        let places = navigation.getParam('places');
        let city = navigation.getParam('city');
        let PROPERTY_TYPE_ITEMS = navigation.getParam('categoryList');
        let min = 400, max = 0;
        for (let ind in places) {
            if (Number(places[ind].vWeekdayPrice) < min) {
                min = Number(places[ind].vWeekdayPrice);
            }
            if (Number(places[ind].vWeekdayPrice) > max) {
                max = Number(places[ind].vWeekdayPrice);
            }
        }
        // if(filterObj == null){
        this.state = {
            loading: true,
            places,
            filterPlaces: places,
            city,
            property_types: PROPERTY_TYPE_ITEMS,
            additional_option: ADDITIONAL_OPTIONS,
            selectedPropertyType: {},
            priceRange: [min, max],
            selectedCity: {},
            selectedDirection: {},
            min,
            max,
        };

    }

    async componentDidMount() {
        this.props.navigation.setParams({setClear: this.setInitialState});
    }
    componentWillUnmount=()=>{
        this.setInitialState();
    }
    onSearch = () => {
        const {searchText} = this.state;
        const {places} = this.props;
        let search = places[1].vCategory;
        let filteredData = places.filter((item) => (item.vCategory.search(searchText) != (-1) || item.iCategoryId == searchText));
        this.setState({places: filteredData});
    };
    onSave = () => {
        const {places, additional_option, priceRange, selectedCity, selectedDirection, min, max, selectedPropertyType} = this.state;
        // let data = {property_types, additional_option, priceRange, selectedCity, selectedDirection};
        let mObj = {};
        if (priceRange[0] != min || priceRange[1] != max) {
            let orginalDevider = 10/11  ;
            let mMin = parseInt(priceRange[0] * orginalDevider);
            let mMax = parseInt(priceRange[1] * orginalDevider);
            mObj['vWeekdayPrice'] = mMin + '-' + mMax;
        }
        for (let ind in places) {
            if (Object.keys(selectedDirection).length > 0 && places[ind].iRegionId == selectedDirection.id && !mObj.hasOwnProperty('iRegionId')) {
                mObj['iRegionId'] = parseInt(places[ind].iRegionId);
            }
            if (mObj.hasOwnProperty('iRegionId')) {
                break;
            }
        }
        if (selectedPropertyType.hasOwnProperty('iCategoryId')) {
            mObj['iCategoryId'] = parseInt(selectedPropertyType.iCategoryId);
        }
        if (selectedDirection.hasOwnProperty('id')) {
            mObj['iRegionId'] = parseInt(selectedDirection.id);
        }

        if (selectedCity.hasOwnProperty('iCityId')) {
            mObj['iCityId'] = parseInt(selectedCity.iCityId);
        }

        if (additional_option[0].selected) {
            mObj['eSwimmingPool'] = 'Yes';
        }

        if (additional_option[1].selected) {
            mObj['eFootballYard'] = 'Yes';
        }

        if (additional_option[2].selected) {
            mObj['eDivided'] = 'Yes';
        }
        const {navigation} = this.props;
        let submitFilterData = navigation.getParam('filterData'); //filterObj
        submitFilterData(mObj);
        navigateToSearch(navigation);
    };
    _multiSliderValuesChange = values => {
        this.setState({
            priceRange: values,
        });
        this.updateFilterResult();
    };
    _multiSliderValuesChange2 = (low, high, fromUser) => {
        const priceRange = [low, high];
        this.setState({priceRange});
        this.updateFilterResult();
    };
    _onChangeTextDirection = (value, index, data) => {
        this.setState({selectedDirection: {value, index, id: data[index]['id']}});
        this.updateFilterResult();
    };
    _onChangeTextCity = (value, index, data) => {
        this.setState({selectedCity: data[index]});
        this.updateFilterResult();
    };
    _onCheckedChanged = async (ind, val, name) => {
        const obj = this.state[name];

        if (name == 'property_types') {
            let selectedPropertyType = this.state.property_types[ind];
            await this.setState({selectedPropertyType});
        } else {
            obj[ind]['selected'] = val;
            await this.setState({[name]: obj});
        }
        this.updateFilterResult();
    };
    updateFilterResult = async () => {
        const {places, additional_option, priceRange, selectedCity, selectedDirection, selectedPropertyType} = this.state;
        let filterPlaces = await filterSearchResult(places, {
            selectedPropertyType,
            additional_option,
            priceRange,
            selectedCity,
            selectedDirection,
        });
        this.setState({filterPlaces});
    };


    render() {
        return (
            <ScrollView style={styles.container}>
                <View>
                    <View style={styles.row}>
                        {this.renderDropDownCity(TEXTS.city, this.state.city, TEXTS.city)}
                    </View>

                    <View style={styles.row}>
                        {this.renderDropDownDirection(TEXTS.direction, DIRECTION_ITEMS, TEXTS.direction)}
                    </View>

                    <View style={[styles.row, {borderBottomWidth: 2, borderColor: '#e5e5e5'}]}>
                        {this.renderCheckBoxBTI(this.state.property_types)}
                        {this.renderCheckBoxAdditionalOption(this.state.additional_option)}
                    </View>

                    <View style={styles.row}>
                        <View style={styles.checkboxContainer}>
                            <AppText style={styles.titleText}>{TEXTS.price} </AppText>
                            <AppText
                                style={styles.subTitleText}>{TEXTS.price_range_msg(this.state.priceRange)} </AppText>
                            <MultiSliderView
                                min={this.state.min}
                                max={this.state.max}

                                multiSliderValuesChange={this._multiSliderValuesChange2}
                            />

                        </View>
                    </View>
                    <View style={[styles.row, {justifyContent: 'center'}]}>
                        <LGButton
                            onPress={this.onSave}
                            buttonStyle={styles.resultButton}
                            title={TEXTS.filter_results_with_params(this.state.filterPlaces ? this.state.filterPlaces.length : 0)}/>
                    </View>
                </View>
            </ScrollView>
        );
    }

    renderDropDownCity = (title, items, selectedItem) => <CDropDown
        title={title}
        data={items}
        value={this.state.selectedCity.hasOwnProperty('vCity') ? this.state.selectedCity.vCity : TEXTS.city}
        labelExtractor={({vCity} = {}, index) => vCity}
        onChangeText={this._onChangeTextCity}
        selectedItem={selectedItem}/>;


    renderDropDownDirection = (title, items, selectedItem) => <CDropDown
        title={title}
        data={items}
        value={this.state.selectedDirection.hasOwnProperty('name') ? this.state.selectedCity.name : TEXTS.direction}

        labelExtractor={({name} = {}, index) => name}
        onChangeText={this._onChangeTextDirection}
        selectedItem={selectedItem}/>;

    renderCheckBoxBTI = (items) => {
        return (
            <View style={styles.checkboxContainer}>
                <AppText style={styles.titleText}>{TEXTS.breack_type} </AppText>
                {items && items.length > 0 && items.map((item, ind) => {
                    return this.renderCheckBox(item, ind, 'property_types');
                })}
            </View>
        );
    };

    renderCheckBoxAdditionalOption = (items) => {
        return (
            <View style={styles.checkboxContainer}>
                <AppText style={styles.titleText}>{TEXTS.additional_option} </AppText>

                {items && items.length > 0 && items.map((item, ind) => {
                    return this.renderCheckBox(item, ind, 'additional_option');
                })}
            </View>
        );
    };


    renderCheckBox = (item, ind, name) => <CheckBox
        label={name == 'property_types' ? item.vCategory : item.name}
        isRadio={name == 'property_types'}
        value={name == 'property_types' ? this.state.selectedPropertyType.hasOwnProperty('vCategory') && item.vCategory == this.state.selectedPropertyType.vCategory : item.selected}
        onCheckedChange={(val) => this._onCheckedChanged(ind, val, name)}

    />;
}

export default withLoader(Filter);


