export const filterSearchResult = async (filterPlaces, data) => {
    const { additional_option, priceRange, selectedCity, selectedDirection, selectedPropertyType} = data;
    let filteredData = [];

    let LOG = false ;
    console.log('filterSearchResult', data);

    for (let item of filterPlaces) {
        let passed = true;

        if (selectedDirection.hasOwnProperty('value') && item.vRegion != selectedDirection.value) {
            LOG && console.log('filterSearchResult ...1')
            passed = false;
        } else if (selectedCity.hasOwnProperty('iCityId') && item.iCityId != selectedCity.iCityId) {
            LOG && console.log('filterSearchResult ...2')
            passed = false;
        }
        else if (!(item.vWeekdayPrice >= priceRange[0] && item.vWeekdayPrice <= priceRange[1])) {
            LOG && console.log('filterSearchResult ...3')
            passed = false;
        }
        else if (additional_option[0].selected && item.eSwimmingPool.toUpperCase() != 'YES') {
            LOG && console.log('filterSearchResult ...4')
            passed = false;
        } else if (additional_option[1].selected && item.eFootballYard.toUpperCase() != 'YES') {
            LOG && console.log('filterSearchResult ...5')
            passed = false;
        } else if (additional_option[2].selected && item.eDivided.toUpperCase() != 'YES') {
            LOG && console.log('filterSearchResult ...6')
            passed = false;
        } else if ( selectedPropertyType != undefined && selectedPropertyType.hasOwnProperty('iCategoryId') && selectedPropertyType.iCategoryId != item.iCategoryId) {
            LOG && console.log('filterSearchResult ...7')
            passed = false;
        } else {
            LOG && console.log('filterSearchResult ...PUSHED')
            filteredData.push(item);
        }
    }
    return filteredData;
};


export const filterPrice = (filterPlaces, data) => {
    const {priceRange} = data;
    console.log(priceRange)
    filterPlaces = filterPlaces.filter((item) => item.vWeekdayPrice >= priceRange[0] && item.vWeekdayPrice <= priceRange[1]);
    return filterPlaces;
};

export const getImageUrl = (iPropertyId, vImage) => {
    return {uri:'https://www.estraha.com/assets/uploads/property_image/' + iPropertyId + '/' + vImage};
}
