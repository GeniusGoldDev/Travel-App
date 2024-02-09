import React, {Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {TEXTS, COLORS, ICONS, FONTS} from '../../common';
import CheckBox from '../../components/CheckBox';
import {LGButton} from '../../components/Button';
import StyleConfig from '../../assets/style';
import {navigateToSearch} from '../../navigation/Navigator';
import {AppText} from '../../components/AppText';

const SORTING_ITEMS = [
    {name: TEXTS.most_recent},
    {name: TEXTS.highest_first},
    {name: TEXTS.lowest_first},
    {name: TEXTS.distance},
    {name: TEXTS.top_reated} //,
    // {name: TEXTS.least_rated},
];

class Sorting extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title : TEXTS.sort_results,
            titleStyle:{ ...FONTS.bold, fontSize: 17 },
            headerLeft:   <AppText
                onPress={navigation.getParam('setClear')}
                style={{color:COLORS.textColor, paddingHorizontal:8}}>{TEXTS.survey}</AppText>
        };
    };

    setInitialState=()=>{
        let selected = this.props.navigation.getParam('sortBy');
        this.setState ({
            selected
        });

    }

    constructor(props) {
        super(props);
        let selected = props.navigation.getParam('sortBy'); //filterObj
        this.state={
            selected
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({setClear: this.setInitialState});
    }
    onCheckedChanged=(name, val)=> {
        if(val){
            this.setState({selected:name})
        }else{
            this.setState({selected:''})
        }

    }

    onSaveSortBy=()=>{
        let {selected }= this.state ;
        selected = selected == '' ? TEXTS.most_recent : selected ;
        const {navigation} = this.props;
        let submitSorting = navigation.getParam('saveSortBy'); //filterObj
        let filterObj = navigation.getParam('filterObj'); //filterObj
        submitSorting({order:selected}, filterObj);
        navigateToSearch(navigation);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={SORTING_ITEMS}
                    extraData={this.state}
                    renderItem={({item})=>{
                        let isSelected = item.name === this.state.selected
                        return(
                            <View style={{marginHorizontal:16, marginVertical:4,  borderBottomWidth:0.5, borderColor:COLORS.devider}}>
                                <CheckBox
                                    isRadio={true}
                                    label={item.name}
                                    value={isSelected}
                                    onCheckedChange={(value)=> this.onCheckedChanged(item.name,value)}
                                />
                            </View>
                        )
                    }}
                />
                <View style={[styles.row, {justifyContent: 'center'}]}>
                    <LGButton
                         onPress={this.onSaveSortBy}
                        buttonStyle={styles.resultButton}
                        title={TEXTS.sort_results}/>
                </View>
            </View>
        );
    }
    renderCheckBox = (item, ind, name) => <CheckBox
        label={item.name}
        value={item.selected}
        onCheckedChange={(val) => this._onCheckedChanged(ind, val, name)}

    />;
}


export default Sorting;
const styles=StyleSheet.create({
    resultButton:{
        //width: StyleConfig.width - StyleConfig.countPixelRatio(40),
        shadowRadius: 10,
        shadowOpacity: 1,
        elevation: 1,
        marginBottom: StyleConfig.countPixelRatio(StyleConfig.isIphoneX ? 26 : 8)
    },
})


