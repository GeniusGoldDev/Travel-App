import React, {Component} from 'react';
import {
    TextInput,
    View,FlatList, TouchableOpacity,
    ScrollView
} from 'react-native';

import {AppText} from '../../components/AppText';
import styles from './styles';
import {LGButton} from '../../components/Button';
import {COLORS, TEXTS, SCREEN} from '../../common';
import {Switch } from '../../components/Switch';
import StyleConfig from '../../assets/style';
import DatePicker from 'react-native-datepicker';
import APP_IMAGES from '../../assets/images';
const TIME_ARRAY = ["12:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"];

class AdditionalInfo extends Component{

    constructor(props){
        super(props);
        this.state={
            eSwimmingPool:false,
            eFootballYard:false,
            eDivided: false,
            eShow:false,
            vArea:'' ,
            iDiscount:'',
            eShow:false,
            vEntryTime:'',
            vExitTime:'',
            vWeekdayPrice:'',
            vThursdayPrice:'',
            vFridayPrice:'',
            vSaturdayPrice:'',
            iDiscount:'',
            vOfferStart:'',
            vOfferEnd:'',
            error:{},
            enableError:false
        }
    }

    onSaveNext=()=>{
        if(this.isValid(true)){
            const {eSwimmingPool, eFootballYard, eDivided, vEntryTime, vExitTime, vArea,eShow,
                iDiscount, vOfferStart, vOfferEnd, vWeekdayPrice, vThursdayPrice, vFridayPrice, vSaturdayPrice,
            } = this.state;
            const data = {eSwimmingPool, eFootballYard, eDivided, vEntryTime, vExitTime, vArea, eShow,
                iDiscount, vOfferStart, vOfferEnd, vWeekdayPrice, vThursdayPrice, vFridayPrice, vSaturdayPrice
            }
            this.props.setCurrentPos(2, data)
        }
    }

    isValid = (enableError = false)=>{
        const {eSwimmingPool, eFootballYard, eDivided, vEntryTime, vExitTime, vArea,eShow,
            iDiscount, vOfferStart, vOfferEnd, vWeekdayPrice, vThursdayPrice, vFridayPrice, vSaturdayPrice,
        } = this.state;
        let error={}
        if(vArea == '' || vArea.trim().length == 0){
            console.log('TEXTS.enter_the_area');
            error={vArea : TEXTS.enter_the_area}
            // return TEXTS.enter_the_area;
        }else if(isNaN(Number(vArea))){
            error={vArea : "Please enter valid Area."}
            // return "Please enter valid Area."
        }else if(isNaN(Number(iDiscount))){
            error={iDiscount : "Please enter valid Discount."}
            // return "Please enter valid Discount."
        }else if(vWeekdayPrice == ''|| vWeekdayPrice.trim().length == 0){
            console.log('TEXTS.enter_weekday_price');
            error={vWeekdayPrice : TEXTS.enter_weekday_price}
            // return TEXTS.enter_weekday_price;
        }else if(isNaN(Number(vWeekdayPrice))){
            error={vWeekdayPrice : "Please enter valid Weekday Price."}
           // return "Please enter valid Weekday Price."
        } else if(vThursdayPrice == '' || vThursdayPrice.trim().length == 0){
            error={vThursdayPrice : TEXTS.enter_thursday_price}
            console.log('TEXTS.enter_thursday_price');
            // return TEXTS.enter_thursday_price;
        }else if(isNaN(Number(vThursdayPrice))){
            error={vThursdayPrice : "Please enter valid Thursday Price."}
            // return "Please enter valid Thursday Price."
        } else if(vFridayPrice == ''|| vFridayPrice.trim().length == 0){
            error={vFridayPrice : TEXTS.enter_friday_price}
            console.log('TEXTS.enter_friday_price');
           // return TEXTS.enter_friday_price
        }else if(isNaN(Number(vFridayPrice))){
            error={vFridayPrice : "Please enter valid Friday Price."}
           // return "Please enter valid Friday Price."
        } else if(vSaturdayPrice == ''|| vSaturdayPrice.trim().length == 0){
            console.log('TEXTS.enter_saturday_price');
            error={vSaturdayPrice : TEXTS.enter_saturday_price}
            //return TEXTS.enter_saturday_price;
        }else if(isNaN(Number(vSaturdayPrice))){
            error={vSaturdayPrice : "Please enter valid Saturday Price."}
            //return "Please enter valid Saturday Price."
        }else{
            this.setState({error,enableError})
            return true ;
        }
        this.setState({error,enableError})
    }
    
    render(){
        let {error, enableError} =this.state;
        error = enableError ? error : {};
        console.log(error)
        return(<ScrollView>
            {this.renderSwitch(TEXTS.swimmingpool,"eSwimmingPool" )}
            {this.renderSwitch(TEXTS.football_court,"eFootballYard" )}
            {this.renderSwitch(TEXTS.two_parts,"eDivided" )}
            {this.renderDevider()}
            {this.renderInput(TEXTS.space,TEXTS.placeholder_space,"vArea","numeric",false, error.vArea)}
            {this.renderDevider()}
            {this.renderTimePicker(TEXTS.entry_time, "vEntryTime")}
            {this.renderTimePicker(TEXTS.exit_time, "vExitTime")}
            {this.renderDevider()}
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <View>
            {this.renderSwitch(TEXTS.is_there_show,"eShow")}
            </View>
            <View>
            {this.renderInput(TEXTS.dicount_percentage,TEXTS.dicount_percentage,"iDiscount","numeric", true,error.iDiscount)}
            </View>
            </View>
            {this.renderDevider()}
            <View style={{flexDirection:'row'}}>
            {this.renderDatePiccker(TEXTS.start_of_the_show , "____/__/__" ,"vOfferStart",true)}
            {this.renderDatePiccker(TEXTS.end_of_the_show , "____/__/__","vOfferEnd",true)}
            
            </View>
            
            {this.renderDevider()}
            {this.renderInput(TEXTS.all_day_of_week,TEXTS.all_day_of_week,"vWeekdayPrice","numeric", false, error.vWeekdayPrice)}
            {this.renderInput(TEXTS.thursday_price,TEXTS.thursday_price,"vThursdayPrice","numeric", false, error.vThursdayPrice)}
            {this.renderInput(TEXTS.friday_price,TEXTS.friday_price,"vFridayPrice","numeric", false, error.vFridayPrice)}
            {this.renderInput(TEXTS.saturday_price,TEXTS.saturday_price,"vSaturdayPrice","numeric", false, error.vSaturdayPrice)}
            
            


            <View style={[styles.row, {justifyContent: 'center'}]}>
                <LGButton
                    onPress={this.onSaveNext}
                    buttonStyle={styles.resultButton}
                    title={TEXTS.save_and_next}/>
            </View>
        </ScrollView>)
    }

    renderSwitch=(label, val)=><View style={styles.row}>
        <AppText>{label}</AppText>
        <Switch
            value={this.state[val]}
            onValueChange={(value)=>this.setState({[val]:value})}/>
    </View>

    renderInput=(label, placeholder, val, keyboardType="default", isHalf=false, isError)=><View style={styles.row}>
        <View>
        <View style={isError == undefined ? isHalf ? [styles.inputContainer,{width: SCREEN.WIDTH * 0.45, marginLeft:-10}] : styles.inputContainer :isHalf ? [styles.errorInputContainer,{width: SCREEN.WIDTH * 0.45, marginLeft:-10}] : styles.errorInputContainer}>
            <TextInput
                contextMenuHidden={true}
                style={styles.inputStyle}
                value={this.state[val]}
                placeholder={placeholder}
                onChangeText={(value) =>{
                     this.setState({[val]:value})
                    this.isValid()
                    }}
                underlineColorAndroid="transparent"
                keyboardType={keyboardType}
            />
        </View>
        {isError && <AppText style={styles.errorText}>{isError}</AppText>}
        </View>
        <View style={{flexDirection: 'row', zIndex: 99, position:'absolute', marginTop:StyleConfig.countPixelRatio(-10), marginHorizontal:StyleConfig.countPixelRatio(16) }}>
            <AppText
                style={{
                    marginLeft: isHalf ? -10: 0,
                    fontSize: StyleConfig.countPixelRatio(14),
                    paddingHorizontal: StyleConfig.countPixelRatio(4),
                    backgroundColor: 'white',
                    color: COLORS.textColor,
                    fontWeight: 'bold',
                    marginHorizontal:StyleConfig.countPixelRatio(4)
                }}
            >{label}</AppText>
        </View>
    </View>

    renderDevider=()=><View style={styles.devider}/>

    renderTimePicker=(label, selected)=><View style={[styles.row,{flexDirection:'column'}]}>
        <AppText style={styles.labelText}>{label}</AppText>
        <FlatList
            data={TIME_ARRAY}
            extraData={this.state[selected]}
            renderItem={({item})=>{
                let isSelected = item ==  this.state[selected]
                return(
                    <TouchableOpacity style={isSelected ? styles.timeItemSelected :styles.timeItem} onPress={()=>this.setState({[selected]:item})} >
                        <AppText style={styles.itemText} >{item}</AppText>
                    </TouchableOpacity>
                )
            }}
            horizontal
        />

    </View>


renderDatePiccker=(label, placeholder,val, isHalf=false)=><View style={styles.row}>
<TouchableOpacity style={isHalf ? [styles.inputContainer,{width: SCREEN.WIDTH * 0.45, marginLeft:-10, alignItems: "flex-end",
        justifyContent: "flex-end"}] : styles.inputContainer}>
<DatePicker
        date={this.state[val]}
        mode="date"
        placeholder={placeholder}
        format="YYYY/MM/DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            height:StyleConfig.countPixelRatio(28),
            width:StyleConfig.countPixelRatio(28),    
        },
          dateInput: {
            borderWidth:0,
            fontSize:18, marginLeft:10
          },
          // ... You can check the source to find the other keys.
        }}
        iconSource={APP_IMAGES.ic_calendar}
        onDateChange={(date) => {this.setState({[val]: date})}}
      />
    
</TouchableOpacity>

<View style={{flexDirection: 'row', zIndex: 99, position:'absolute', marginTop:StyleConfig.countPixelRatio(-10), marginHorizontal:StyleConfig.countPixelRatio(16) }}>
    <AppText
        style={{
            marginLeft: isHalf ? -10: 0,
            fontSize: StyleConfig.countPixelRatio(14),
            paddingHorizontal: StyleConfig.countPixelRatio(4),
            backgroundColor: 'white',
            color: COLORS.textColor,
            fontWeight: 'bold',
            marginHorizontal:StyleConfig.countPixelRatio(4)
        }}
    >{label}</AppText>
</View>
</View>
}

export  default AdditionalInfo;
