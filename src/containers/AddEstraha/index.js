import React, {Component} from 'react';
import {View, Text, TextInput, SafeAreaView, Platform, PermissionsAndroid} from 'react-native';
import {StepIndicator, Button, FormInput, DropDown, AppText} from '../../components';
import styles from './styles';
import {COLORS, FONTS, TEXTS} from '../../common';
import MatrialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {navigateToHome} from '../../navigation/Navigator';
import BasicInfo from './BasicInfo';
import AdditionalInfo from './AdditionalInfo';
import PhotosAndVideos from './PhotosAndVideos';
import { postPropertyAdd } from '../../service/property';
import withLoader from '../../redux/actions/withLoader';
import {connect} from 'react-redux';
const [BASIC_INFO, ADDITIONAL_INFO, PHOTOS_VIDEOS] = [0,1,2];
import Geolocation from '@react-native-community/geolocation';
import StyleConfig from '../../assets/style';
export async function request_device_location_runtime_permission() {
    try {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    } catch (err) {
        console.warn('request_device_location_runtime_permission',err);
    }
}
class AddEstraha extends Component {

    static navigationOptions = ({navigation}) => {
        const { params = {} } = navigation.state
        return {
            // headerStyle : {borderBottomWidth:0, shadowColor:null, shadowOpacity:null,elevation:null},
            title: '',
            titleStyle: {...FONTS.bold, fontSize: 17},
            headerTintColor: COLORS.main,
            headerRight: <MatrialIcon
                name={'chevron-left'}
                size={30}
                color={COLORS.main}
                style={{marginHorizontal: 8}}
                onPress={() => params.onRightPress(navigation)}
            />,
            headerLeft: null,

        };
    };  
    //this.onUpdateLatLong=()=>{}
    getCurrLocation=async ()=>{
        if (!StyleConfig.isIphone) {
            await request_device_location_runtime_permission();
        }
        Geolocation.getCurrentPosition(
            (position) => {
                const {longitude, latitude} = position.coords;
                this.setState({longitude, latitude})
                console.log(JSON.stringify({latitude,longitude}))
                this.onUpdateLatLong( latitude,longitude)
            },
            (error) => {
                // See error code charts below.
                console.log(JSON.stringify(error));
            },
            { enableHighAccuracy: true, timeout: 2000, maximumAge: 3600000 }
        );
    }
    componentDidMount= async ()=> {
        await this.getCurrLocation()
        this.props.navigation.setParams({ onRightPress: this.onRightPress })
        }

    onRightPress=(navigation)=>{
        const {currentPosition} = this.state ;
        if(currentPosition == BASIC_INFO){
            navigateToHome(navigation)
        }else if(currentPosition === ADDITIONAL_INFO){
            this.setState({currentPosition:BASIC_INFO})
        } else if(currentPosition === PHOTOS_VIDEOS){
            this.setState({currentPosition:ADDITIONAL_INFO})
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: BASIC_INFO,
            longitude:0, 
            latitude:0,
            mData:{}
        };

    }
    formDataImages = (img)=>{
          const data = new FormData()
          for(let ind in img){
            data.append('vImage', img[ind])
          }
          return data.vImage;
    
    }
    setCurrentPos = async (currentPosition, data={}) =>{
        let {mData} = this.state;
        mData = {...mData, ...data}
        if(currentPosition == 99){
              
            // let testObj = {
            //     "vLongitude": 81.59766719999999,
            //     "vLatitude": 27.5705152,
            //     "vProperty": "test pro",
            //     "tDescription": "dsdfsdfdsfd",
            //     "iRegionId": 4,
            //     "iCityId": 2,
            //     "iCategoryId": 2,
            //     "vAddress": "Bahraich, Uttar Pradesh, India",
            //     "eSwimmingPool": false,
            //     "eFootballYard": false,
            //     "eDivided": false,
            //     "vEntryTime": "01:00 AM",
            //     "vExitTime": "02:00 AM",
            //     "vArea": "122",
            //     "eShow": false,
            //     "vWeekdayPrice": 111,
            //     "vThursdayPrice": 111,
            //     "vFridayPrice": 111,
            //     "vSaturdayPrice": 111,
            //        "vImage":data.vImage,

                 
            //     "iUserId": 4025,
            //     "vMobileOne": "556877588"
            //   };
    //  const res = await postPropertyAdd(testObj);
    //             console.log( JSON.stringify(res))
           


            
            const {iUserId,vMobile } = this.props.user;
            

            mData = {...mData, iUserId,"vMobileOne":vMobile, "vImage": this.formDataImages(mData.vImage)  }
            console.log(JSON.stringify(mData))
            let isValid = this.checkValidation(mData)
            if(isValid == true){
                const res = await postPropertyAdd(mData);
                console.log( JSON.stringify(res))
            }else{
                alert(isValid);
            }
        }else{
            this.setState({currentPosition, mData});
        }
    } 
    checkValidation=(data)=>{
        if(data.vProperty && data.vProperty.trim().length == 0){
            console.log('TEXTS.enter_name_of_property');
            return TEXTS.enter_name_of_property;
        }else if(data.tDescription &&  data.tDescription.trim().length == 0){
            console.log('TEXTS.enter_the_description');
            return TEXTS.enter_the_description;
        }else if(data.iRegionId == -1){
            console.log('TEXTS.choose_the_name_of_region');
            return TEXTS.choose_the_name_of_region;
        }else if(data.iCityId == -1){
            console.log('TEXTS.choose_a_city');
            return TEXTS.choose_a_city;
        }else if(data.iCategoryId == -1){
            console.log('TEXTS.choose_a_category');
            return TEXTS.choose_a_category;
        }else if(data.vAddress &&  data.vAddress.trim().length == 0){
            console.log('TEXTS.enter_the_address');
            return TEXTS.enter_the_address;
        }else if(data.vArea && data.vArea.trim().length == 0){
            console.log('TEXTS.enter_the_area');
            return TEXTS.enter_the_area;
        }else if(isNaN(Number(data.vArea))){
            return "Please enter valid Area."
        }else if(isNaN(Number(data.iDiscount))){
            return "Please enter valid Discount."
        }else if(data.vWeekdayPrice && data.vWeekdayPrice.trim().length == 0){
            console.log('TEXTS.enter_weekday_price');
            return TEXTS.enter_weekday_price;
        }else if(isNaN(Number(data.vWeekdayPrice))){
            return "Please enter valid Weekday Price."
        } else if(data.vThursdayPrice && data.vThursdayPrice.trim().length == 0){
            console.log('TEXTS.enter_thursday_price');
            return TEXTS.enter_thursday_price;
        }else if(isNaN(Number(data.vThursdayPrice))){
            return "Please enter valid Thursday Price."
        } else if(data.vFridayPrice && data.vFridayPrice.trim().length == 0){
            console.log('TEXTS.enter_friday_price');
            return TEXTS.enter_friday_price
        }else if(isNaN(Number(data.vFridayPrice))){
            return "Please enter valid Friday Price."
        } else if(data.vSaturdayPrice && data.vSaturdayPrice.trim().length == 0){
            console.log('TEXTS.enter_saturday_price');
            return TEXTS.enter_saturday_price;
        }else if(isNaN(Number(data.vSaturdayPrice))){
            return "Please enter valid Saturday Price."
        }else{
            return true ;
        }
        
    }


    render() {
        const {currentPosition, longitude, latitude} = this.state;
        return (
            <View style={{flex: 1}}>

                <View style={styles.row1}>
                    <AppText style={styles.titleText}>{TEXTS.add_property}</AppText>
                </View>
                <View style={{marginVertical: 12}}>
                    <StepIndicator 
                    //onPress={(currentPosition)=>this.setState({currentPosition})}
                    currentPosition={currentPosition}/>
                </View>
                {currentPosition === BASIC_INFO && <BasicInfo {...this.props} onUpdateMap={(onUpdateLatLong)=> this.onUpdateLatLong = onUpdateLatLong} longitude={longitude} latitude={latitude} setCurrentPos={this.setCurrentPos} />}
                {currentPosition === ADDITIONAL_INFO && <AdditionalInfo {...this.props} setCurrentPos={this.setCurrentPos}/>}
                {currentPosition === PHOTOS_VIDEOS && <PhotosAndVideos {...this.props} setCurrentPos={this.setCurrentPos}/>}
            </View>


        );
    }
}

const mapStateToProps=(state)=>{
    return {user:state.auth.user }
}

export default withLoader(connect(mapStateToProps)(AddEstraha));
{/*<AppText style={styles.headerText} >إضافة استراحة </AppText>*/
}


{/*<StepIndicator />*/
}
{/*<FormInput title={"إسم الاستراحة"} />*/
}
{/*<DropDown />*/
}
{/*<DropDown />*/
}
{/*<DropDown />*/
}
{/*<DropDown />*/
}

{/*<AppText style={styles.descripText}>وصف الاستراحة</AppText>*/
}
{/*<View style={styles.descripInput}>*/
}
{/*<TextInput />*/
}
{/*</View>*/
}
{/*<Button title={"حفظ والتالى.."} />*/
}

