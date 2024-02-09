import React, {Component} from 'react';
import {View, ImageBackground, Image, ScrollView, Linking, TouchableOpacity, StyleSheet,Alert} from 'react-native';
import {TEXTS, COLORS, ICONS, FONTS} from '../../common';
import {LGButton} from '../../components/Button';
import StyleConfig from '../../assets/style';
import {navigateToSearch, navigateViewPropertyPhoto, navigateAddComment} from '../../navigation/Navigator';
import {AppText} from '../../components/AppText';
import {getImageUrl} from '../../common/Utils';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';
import AppImages from './../../assets/images' ;
import {Rating} from '../../components/Rating';
import {PriceModal} from '../../components/PriceModal';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Share from 'react-native-share';
import withLoader from '../../redux/actions/withLoader';
import {connect} from 'react-redux';
import {postFavorites, postPropertyDetail, postComment} from './../../service/property';
import {CardTitle} from '../../components/Titles';

class EstrahaDetails extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {property: undefined, showPrices: false, visibleComment: false, isFavorite: false, rating: 0};


    }

    componentDidMount = async () => {
        const {navigation} = this.props;
        let iPropertyId = navigation.getParam('iPropertyId');
        let {user: {iUserId}, loader} = this.props;
        loader(true);
        let property = await postPropertyDetail({iPropertyId, iUserId});
        loader(false);
        if (property.message.Output === 0) {
            console.log({property});
            property.data.vWeekdayPrice = parseInt(property.data.vWeekdayPrice * 1.1);
            property.data.vThursdayPrice = parseInt(property.data.vThursdayPrice * 1.1);
            property.data.vFridayPrice = parseInt(property.data.vFridayPrice * 1.1);
            property.data.vSaturdayPrice = parseInt(property.data.vSaturdayPrice * 1.1);
            let isFavorite=await property.favourite.filter( e => e.iUserId == iUserId );
            console.log({isFavorite});
            this.setState({property, isFavorite: isFavorite.length > 0});
        }
    };

    onReviewDetail = () => {
        const {review,user_comment,data} = this.state.property
        navigateAddComment(this.props.navigation, {review,user_comment,data});
    };
    onShare = async () => {

        const {iPropertyId,vProperty} = this.state.property.data
        let message=vProperty+'\nhttps://www.estraha.com/property-detail/'+iPropertyId;
        const shareOptions = {
            title: 'Share',
            message

        };
        try {
            const ShareResponse = await Share.open(shareOptions);
            setResult(JSON.stringify(ShareResponse, null, 2));
        } catch (error) {
            console.log('Error =>', error);
            setResult('error: '.concat(getErrorString(error)));
        }
    };
    onSelectedStar = async (reviews) => {
        // const {navigation} = this.props;
        // let iPropertyId = navigation.getParam('iPropertyId');
        // let {user: {iUserId}, loader} = this.props;
        // loader(true);
        //
        // let res = await postComment({iPropertyId, iUserId, reviews});
        // loader(false);
        // console.log(res);
        this.setState({rating: reviews});
    };

    onContactAdvertieser = () => {
        const {data} = this.state.property;
        const {vRegion, vCity, vProperty, vWeekdayPrice, vThursdayPrice, vFridayPrice, vSaturdayPrice, iPropertyId} = data;
        const month = ["يناير" ,"فبراير", "مارس", "أبريل" , "مايو" , "يونيو" , "يوليو" , "أغسطس" ,"سبتمبر", "أكتوبر", "نوفمبر" , "ديسمبر"];
        let p1 = vProperty;
        let p2 = vCity;
        let p3 = vRegion;
        let p4 = vWeekdayPrice;
        let p5 = vThursdayPrice;
        let p6 = vFridayPrice;
        let p7 = vSaturdayPrice;
        let p8 = 'https://www.estraha.com/property/property_detail/' + iPropertyId;
        let date = new Date();
        let p9 = `${month[date.getMonth()]}-${date.getDate()}-${date.getFullYear()}`;

        Linking.openURL(
            'whatsapp://send?text=' +
            TEXTS.get_whatsapp_message(p1, p2, p3, p4, p5, p6, p7, p8, p9) +
            '&phone=+966556877588');
    };

    onFavorites = async () => {
        const {isFavorite, property} = this.state;
        const {iUserId} = this.props.user;
        const data = {
            iUserId,
            iPropertyId: property.data.iPropertyId,
        };
        const res = await postFavorites(data);
        console.log(res)
        this.setState({isFavorite: !isFavorite});

    };

    convertShowPrice = (price) => parseInt(Number(price) * 1.1);
    _onBookingPolicy=()=>{
        Alert.alert(TEXTS.booking_policy,TEXTS.booking_policy_content,[{text: TEXTS.ok, onPress: () => console.log('OK Pressed')},  ],{cancelable: false}  )
    }
    render() {
        if (this.state.property != undefined) {
            const {data} = this.state.property;
            const {vWeekdayPrice, vThursdayPrice, vFridayPrice, vSaturdayPrice} = data;
            const price = {vWeekdayPrice, vThursdayPrice, vFridayPrice, vSaturdayPrice};
            return (
                <View style={styles.flex1}>
                    <ScrollView style={styles.container}>
                        {this.renderPropertyImage()}
                        {this.renderPropertyBasic()}
                        {this.renderPropertyDetails()}
                        {this.renderMap()}
                        {this.renderRating()}
                        {this.renderComments()}
                        <View style={{
                            marginHorizontal: StyleConfig.countPixelRatio(20),
                        }}>
                            <AppText onPress={this._onBookingPolicy} style={styles.textTermsCond}>{TEXTS.booking_policy}</AppText>
                        </View>
                        {this.renderContactAdvertiser()}
                    </ScrollView>
                    <PriceModal visible={this.state.showPrices} prices={price}
                                onClose={()=>this.setState({showPrices: false})}
                                onSubmit={() => this.setState({showPrices: false})}/>
                </View>
            );
        } else {
            return (
                <View style={styles.flex1}>
                </View>);
        }

    }

    renderPropertyImage = () => {
        const handleBack = this.props.navigation.getParam('handleBack');
        const {iPropertyId, image} = this.state.property.data;
        const IMAGE_URL = getImageUrl(iPropertyId, image[0].vImage);
        return (
            <ImageBackground
                source={IMAGE_URL}
                style={styles.propertyImage}>
                <LinearGradient
                    colors={COLORS.imageTopLayer}
                    style={styles.propertyImage}>
                    <View style={[styles.row, styles.topPadding]}>
                        <TouchableOpacity style={styles.touchable} onPress={this.onShare}>
                            <Image
                                source={AppImages.ic_upload}
                                style={styles.headerImage}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchable}
                                          onPress={this.onFavorites}>
                            <Icon name={this.state.isFavorite? 'md-heart' : 'md-heart-empty'} color={this.state.isFavorite?'red':'white'} size={20} />

                        </TouchableOpacity>
                        <View style={styles.flex1}/>

                        <TouchableOpacity style={styles.touchable} onPress={handleBack}>
                            <Image
                                resizeMode={'contain'}
                                source={AppImages.ic_back}
                                style={styles.headerImage}
                            />
                        </TouchableOpacity>

                    </View>
                    <View style={styles.flex1}/>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.gelleryButton}
                                          onPress={() => navigateViewPropertyPhoto(this.props.navigation, {all_images: image})}>
                            <Image
                                source={AppImages.ic_gellery}
                                style={[styles.headerImage, {tintColor: COLORS.textColor, marginHorizontal: 4}]}
                            />
                            <AppText
                                style={{marginHorizontal: StyleConfig.countPixelRatio(4)}}>{TEXTS.all_photos}</AppText>
                        </TouchableOpacity>
                    </View>

                </LinearGradient>

            </ImageBackground>

        );
    };

    renderPropertyBasic = () => {
        const {iPropertyId, eVerified, vCategory, vProperty, vAddress, vCity, vAverageRating, vTotalRating, vWeekdayPrice} = this.state.property.data;
        const numAvgRating = vAverageRating == "" || vAverageRating == null || vAverageRating == "null" ? 0 : Number(vAverageRating).toFixed(1);
        const label = numAvgRating > 4.5 ? TEXTS.fabulous : numAvgRating > 4.0 ? TEXTS.exellent: numAvgRating > 3.5 ? TEXTS.good : '';

        return (
            <View
                style={[styles.cardContainer, {flexDirection: 'column', marginTop: StyleConfig.countPixelRatio(-28)}]}>
                <View style={[styles.row, {justifyContent: 'space-between'}]}>
                    <LinearGradient end={{x: 0, y: 0}} start={{x: 1, y: 0}} colors={COLORS.gradient1}
                                    style={styles.properyGradient}>
                        <AppText style={{color: '#fff', fontSize: StyleConfig.countPixelRatio(12)}}>{vCategory}
                        </AppText>
                    </LinearGradient>

                    <LinearGradient end={{x: 0, y: 0}} start={{x: 1, y: 0}} colors={COLORS.gradient2}
                                    style={styles.properyGradient}>
                        <AppText style={{
                            color: '#fff',
                            fontSize: StyleConfig.countPixelRatio(12),
                        }}>{`${TEXTS.number} ${iPropertyId}`}
                        </AppText>
                    </LinearGradient>
                </View>
                <View style={[styles.row, {justifyContent:'space-between'}]}>

                <View>
                    <View style={[styles.row, {alignItems: 'center',paddingHorizontal:0, width: StyleConfig.width*0.6}]}>
                        {eVerified.toLowerCase() == 'yes' && <Image
                            resizeMode={'contain'}
                            source={AppImages.ic_verified}
                            style={styles.detailImg}
                        />}
                        <AppText style={styles.sectionTitle}>{vProperty}</AppText>

                    </View>
                    <View style={[styles.row, {alignItems: 'center', paddingHorizontal:0}]}>
                        <Image
                            source={AppImages.ic_map}
                            style={styles.locationImage}
                        />
                        <AppText style={{
                            color: COLORS.main_text,
                            marginHorizontal: StyleConfig.countPixelRatio(6),
                            fontSize: StyleConfig.countPixelRatio(12),
                        }}>{`${vAddress},${vCity}`}</AppText>

                    </View>

                </View>
                    <View>
                        {numAvgRating > 0 &&
                        <View style={{flexDirection: 'row'}}>
                            <View style={{justifyContent:'center'}}>
                                <CardTitle style={{
                                    ...FONTS.regular,
                                    fontSize:10,
                                    color: COLORS.grey,
                                }}>{`${vTotalRating} ${TEXTS.comments} `}</CardTitle>
                            </View>
                            <View style={{
                                borderWidth: 0,
                                borderRadius: 4,
                                alignSelf: 'center',
                                backgroundColor: COLORS.ratingBack,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginVertical:4,
                                paddingHorizontal:6
                            }}>
                                {label.length != 0 && <CardTitle style={{
                                    ...FONTS.bold,
                                    color: COLORS.code_color,
                                }}>{label}</CardTitle>}
                                <CardTitle style={{
                                    ...FONTS.bold,
                                    marginTop:-2,
                                    color: COLORS.code_color
                                }}>{numAvgRating}</CardTitle>
                            </View>

                        </View>

                        }
                    </View>
                </View>
                <View style={[styles.row, {justifyContent: 'space-between', alignItems: 'center'}]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Rating disabled starStyle={{marginHorizontal: StyleConfig.countPixelRatio(3)}}
                                starCount={parseInt(vAverageRating)}/>
                        <AppText style={{
                            color: COLORS.main_text,
                            marginLeft: StyleConfig.countPixelRatio(30),
                            fontSize: StyleConfig.countPixelRatio(12),
                        }}>{`${vTotalRating},${TEXTS.rating}`}</AppText>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <AppText style={{
                            color: COLORS.main_text,
                            fontSize: StyleConfig.countPixelRatio(12),
                        }}>{TEXTS.start_from}</AppText>
                        <AppText style={{
                            color: COLORS.red,
                            fontSize: StyleConfig.countPixelRatio(18),
                        }}>{` ${vWeekdayPrice} ${TEXTS.riyal}`}</AppText>
                        <AppText style={{
                            color: COLORS.main_text,
                            fontSize: StyleConfig.countPixelRatio(18),
                        }}>{TEXTS.day}</AppText>
                    </View>

                </View>

            </View>
        );
    };
    renderPropertyDetails = () => {
        const {vArea, eSwimmingPool, eFootballYard, eDivided, tDescription,vEntryTime,vExitTime} = this.state.property.data;
        const colorSwimming = eSwimmingPool == 'Yes' ? COLORS.green : COLORS.red;
        const colorFootball = eFootballYard == 'Yes' ? COLORS.green : COLORS.red;
        const colorDivided = eDivided == 'Yes' ? COLORS.green : COLORS.red;
        let mDescription = tDescription.replace(/<\/?[^>]+(>|$)/g, '');
        return (
            <View style={{
                marginTop: StyleConfig.countPixelRatio(20),
                paddingHorizontal: StyleConfig.countPixelRatio(12),
            }}>

                <View style={styles.row}>
                    <AppText style={styles.sectionTitle}>{TEXTS.details}</AppText>
                </View>
                <View style={styles.row}>
                    <AppText style={{
                        fontSize: StyleConfig.countPixelRatio(14),
                        color: COLORS.main_text,
                    }}>{mDescription}</AppText>
                </View>
                <View style={[styles.row, {
                    height: 1,
                    backgroundColor: COLORS.borderColor,
                    marginTop: StyleConfig.countPixelRatio(12),
                }]}/>

                <View style={[styles.row, {marginTop: StyleConfig.countPixelRatio(20)}]}>
                    <AppText style={styles.sectionTitle}>{TEXTS.specifications}</AppText>
                </View>
                {this.renderDetailsContent(COLORS.main_text, vArea + ' ' + TEXTS.m, TEXTS.space, AppImages.ic_space)}
                {this.renderDetailsContent(colorSwimming, eSwimmingPool == 'Yes' ? TEXTS.yes : TEXTS.no, TEXTS.swimmingpool, AppImages.ic_swimmingpool)}
                {this.renderDetailsContent(colorFootball, eFootballYard == 'Yes' ? TEXTS.yes : TEXTS.no, TEXTS.football_court, AppImages.ic_football)}
                {this.renderDetailsContent(colorDivided, eDivided == 'Yes' ? TEXTS.yes : TEXTS.no, TEXTS.two_parts, AppImages.ic_two_part)}
                {this.renderInOutContant( vEntryTime, TEXTS.check_in_time, 'bank-transfer-in')}
                {this.renderInOutContant( vExitTime, TEXTS.checkout_time, 'bank-transfer-out')}
            </View>
        );
    };
    renderMap = () => {
        const {vLatitude, vLongitude} = this.state.property.data;
        const region = {
            latitude: Number(vLatitude),
            longitude: Number(vLongitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
        return (
            <View style={{
                marginTop: StyleConfig.countPixelRatio(20),
                paddingHorizontal: StyleConfig.countPixelRatio(12),
            }}>
                <View style={styles.row}>
                    <AppText style={styles.sectionTitle}> {TEXTS.place_on_the_map}</AppText>
                </View>
                <View style={{height: StyleConfig.countPixelRatio(240)}}>
                    <MapView
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
                                source={AppImages.ic_map}
                            />
                        </Marker>

                    </MapView>
                </View>
                <View style={[styles.row, {alignItems: 'center'}]}>
                    <Image
                        resizeMode={'contain'}
                        source={AppImages.ic_warning}
                        style={styles.warningImg}
                    />
                    <AppText style={{
                        fontSize: StyleConfig.countPixelRatio(14), ...FONTS.bold,
                        color: COLORS.red,
                    }}> {TEXTS.map_alert}</AppText>

                </View>
                <View style={[styles.row, {
                    height: 1,
                    backgroundColor: COLORS.borderColor,
                    marginTop: StyleConfig.countPixelRatio(12),
                }]}/>
            </View>);
    };
    renderRating = () => {
        return (
            <View style={{
                marginTop: StyleConfig.countPixelRatio(20),
                paddingHorizontal: StyleConfig.countPixelRatio(12),
            }}>
                {/*<View style={[styles.row, {justifyContent: 'center'}]}>*/}
                    {/*<AppText style={styles.sectionTitle}> {TEXTS.rate_your_exp}</AppText>*/}
                {/*</View>*/}
                {/*<View style={[styles.row, {justifyContent: 'center'}]}>*/}
                    {/*<View style={{width: StyleConfig.countPixelRatio(240)}}>*/}

                        {/*<Rating starSize={StyleConfig.countPixelRatio(36)}*/}
                                {/*starStyle={{marginHorizontal: StyleConfig.countPixelRatio(6)}}*/}
                                {/*containerStyle={{width: StyleConfig.countPixelRatio(240)}}*/}
                                {/*selectedStar={this.onSelectedStar}*/}
                                {/*starCount={this.state.rating}/>*/}
                    {/*</View>*/}
                {/*</View>*/}
                <View style={[styles.row, {justifyContent: 'center', marginTop: StyleConfig.countPixelRatio(8)}]}>
                    <LGButton
                        onPress={this.onReviewDetail}
                        buttonStyle={styles.resultButton}
                        title={TEXTS.btn_rate_your_exp}/>
                </View>
                <View style={[styles.row, {
                    height: 1,
                    backgroundColor: COLORS.borderColor,
                    marginTop: StyleConfig.countPixelRatio(12),
                }]}/>
            </View>
        );
    };

    renderComments = () => {
        const {comment} = this.state.property;
        const {visibleComment} = this.state;
        return (
            <View style={{
                marginTop: StyleConfig.countPixelRatio(20),
                paddingHorizontal: StyleConfig.countPixelRatio(12),
            }}>
                <View style={styles.row}>

                    <AppText onPress={() => this.setState({visibleComment: !visibleComment})}
                             style={styles.sectionTitle}> {`${TEXTS.comments} (${comment.length})`}</AppText>
                </View>
                {visibleComment && comment.length > 0 && <View>
                    {comment.map((item) => this.renderUserReview(item))}
                </View>}


            </View>
        );
    };


    renderContactAdvertiser = () => {
        const {vWeekdayPrice} = this.state.property.data;

        return (
            <View style={{
                marginTop: StyleConfig.countPixelRatio(20),
                paddingHorizontal: StyleConfig.countPixelRatio(22),
                marginHorizontal: StyleConfig.countPixelRatio(-10),
                borderTopWidth: 0.4,
                borderRadius: StyleConfig.countPixelRatio(16),
                borderColor: '#ddd',
                shadowColor: COLORS.main,
                shadowOffset: {width: 0, height: -3},
                shadowOpacity: 0.3,
                shadowRadius: 2,
                elevation: StyleConfig.countPixelRatio(2),
                paddingTop: 8,


            }}>
                <View style={[styles.row, {justifyContent: 'space-between', alignItems: 'center'}]}>
                    <TouchableOpacity onPress={() => this.setState({showPrices: true})}>
                        <AppText style={{
                            ...FONTS.bold,
                            fontSize: StyleConfig.countPixelRatio(14),
                            color: COLORS.textColor,
                        }}> {TEXTS.find_out_all_prices}</AppText>
                    </TouchableOpacity>
                    <View>
                        <AppText style={{
                            color: COLORS.main_text,
                            fontSize: StyleConfig.countPixelRatio(14),
                        }}> {TEXTS.start_from}</AppText>
                        <AppText style={{
                            ...FONTS.bold,
                            fontSize: StyleConfig.countPixelRatio(14),
                            color: COLORS.red,
                        }}> {vWeekdayPrice + ' ' + TEXTS.riyal}<AppText
                            style={{color: COLORS.main_text}}>{TEXTS.day}</AppText></AppText>

                    </View>
                </View>

                <View style={[styles.row, {
                    justifyContent: 'center',
                    marginTop: StyleConfig.countPixelRatio(8),
                    marginBottom: StyleConfig.countPixelRatio(StyleConfig.isIphoneX ? 24 : 8),
                }]}>
                    <LGButton
                        colors={COLORS.contact_button}
                        onPress={this.onContactAdvertieser}
                        buttonStyle={styles.resultButton}
                        title={TEXTS.contact_the_advertieser}/>
                </View>
            </View>
        );
    };

    renderDetailsContent = (dataColor, data, label, icon) => <View style={[styles.detailsContent]}>
        <Image
            resizeMode={'contain'}
            source={icon}
            style={styles.detailImg}
        />
        <AppText style={{
            fontSize: StyleConfig.countPixelRatio(14), ...FONTS.bold,
            color: COLORS.main_text,
            width: StyleConfig.countPixelRatio(72),
        }}>{label} </AppText>
        <AppText style={{
            fontSize: StyleConfig.countPixelRatio(14), ...FONTS.bold,
            color: dataColor,
            width: StyleConfig.countPixelRatio(72),
        }}>{data}</AppText>
    </View>;

        renderInOutContant= (data, label, icon) => <View style={[styles.detailsContent]}>
           <View style={{marginHorizontal: StyleConfig.countPixelRatio(8)}}>
            <MaterialIcon
                name={icon}
                size={StyleConfig.countPixelRatio(24)}
                color={COLORS.textColor}
            />
           </View>
            <AppText style={{
                fontSize: StyleConfig.countPixelRatio(14), ...FONTS.bold,
                color: COLORS.main_text,
                width: StyleConfig.countPixelRatio(100),
            }}>{label} </AppText>
            <AppText style={{
                fontSize: StyleConfig.countPixelRatio(14), ...FONTS.bold,
                width: StyleConfig.countPixelRatio(72),
            }}>{data}</AppText>
        </View>;
    renderUserReview = (item) => <View style={{
        backgroundColor: COLORS.borderColor,
        borderRadius: StyleConfig.countPixelRatio(10),
        borderWidth: 0,
        marginVertical: StyleConfig.countPixelRatio(8),
        padding: StyleConfig.countPixelRatio(8),
    }}>
        <View style={[styles.row, {justifyContent: 'space-between', alignItems: 'flex-end'}]}>
            <Rating disabled starCount={item.avg}/>
            <AppText>{item.dtAddedDate.substr(0, 10)}</AppText>
        </View>
        <AppText style={{marginVertical: StyleConfig.countPixelRatio(8)}}>{item.vComment}</AppText>
        <View style={[styles.row, {alignItems: 'center'}]}>
            <Image
                source={this.getSource(item.iCommentId)}
                style={{
                    height: StyleConfig.countPixelRatio(24),
                    width: StyleConfig.countPixelRatio(24),
                    borderRadius: StyleConfig.countPixelRatio(12),
                }}
            />
            <AppText style={{marginHorizontal: StyleConfig.countPixelRatio(8)}}>{item.vName}</AppText>
        </View>


    </View>;


    getSource = (code) => {
        let count = 0;
        for (let ind = 0; ind < code.length; ind++) {
            count += Number(code.charAt(ind));
            count = count > 9 ? count - 9 : count;
        }
        switch (count) {
            case 1 :
                return AppImages.ic_profile1;
            case 2 :
                return AppImages.ic_profile2;
            case 3 :
                return AppImages.ic_profile3;
            case 4 :
                return AppImages.ic_profile4;
            case 5 :
                return AppImages.ic_profile5;
            case 6 :
                return AppImages.ic_profile6;
            case 7 :
                return AppImages.ic_profile7;
            case 8 :
                return AppImages.ic_profile8;
            case 9 :
                return AppImages.ic_profile9;
            default :
                return AppImages.ic_profile1;


        }
    };
}


const mapStateToProps = (state) => {
    return {user: state.auth.user};
};

export default withLoader(connect(mapStateToProps)(EstrahaDetails));


const property2 = {
    'message': {
        'Output': 0,
        'Message': 'Property Detail successfully',
    },
    'user_review': [],
    'user_review_value': [],
    'data': {
        'iPropertyId': '5383',
        'iUserId': '13',
        'iCategoryId': '4',
        'vProperty': 'شاليهات الورود',
        'vAddress': 'الرمال',
        'iCityId': '1',
        'iRegionId': '1',
        'eRegion': 'N',
        'eSwimmingPool': 'Yes',
        'eFootballYard': 'No',
        'vLatitude': '24.919357471667585',
        'vLongitude': '46.80574759840965',
        'vEntryTime': '12:00',
        'vExitTime': '2:00',
        'vArea': '500',
        'eDivided': 'Yes',
        'tDescription': 'مجلس و صالة للحفلات والمناسبات <br /><br /><br />\n( مجهزه باحدث الانظمة الصوتية والاضاءات ).<br /><br /><br />\nمجلس شعبي بواجهة زجاجية مطلة على مسطحات خضراء ( يتسع لاكثر من 15 شخص )<br /><br /><br />\nجناح غرفة النوم VIP <br /><br /><br />\nمـطبخ .. مجهز كامل<br /><br /><br /><br />\nرذاذ لكامل الشالية<br /><br /><br />\nالعاب ترفيهه ( نطيطة & زحليقة )<br /><br /><br />\n<br /><br />\n" ضيافتك من ورود  علينا "<br /><br /><br />\n* شاهي<br /><br /><br /><br />\n* قـهوة<br /><br /><br />\n* 40 قارورة مياه صحة<br /><br /><br /><br />\n* سماعات<br /><br /><br />\n* ليزر متحرك<br /><br /><br />\nخدمات فندقية لكل عميل VIP<br /><br /><br /><br />\nصابون خاص<br /><br /><br /><br />\nشامبو خاص<br /><br /><br /><br />\nسليبر<br /><br /><br /><br />\nللحجز و الاستفسار<br /><br /><br />\nواتس اب فقط  0552465799 <br /?<br /><br /><br />\n<br /><br />\nاتصال فقط  0503678461',
        'vMobileOne': '0503678461',
        'vMobileTwo': '0552465799',
        'vVideo': '',
        'vWeekdayPrice': '600',
        'vThursdayPrice': '800',
        'vFridayPrice': '900',
        'vSaturdayPrice': '600',
        'eMonthPrice': 'Yes',
        'vMonthPrice': '6475',
        'eYearPrice': 'No',
        'vYearPrice': '',
        'eStatus': 'Active',
        'dtAddedDate': '2019-07-29 16:54:11',
        'dtUpdatedDate': '2019-08-30 08:57:24',
        'iView': '8602',
        'vAverageRating': '5',
        'vTotalRating': '2',
        'eFeatured': 'Yes',
        'eShow': 'No',
        'iDiscount': '',
        'vOfferStart': null,
        'vOfferEnd': null,
        'vOfferImage': null,
        'eVerified': 'Yes',
        'tBookingRules': 'لتأكيد الحجز يتم تحويل نصف المبلغ.\r\nيوجد تأمين بمبلغ 005 يدفع عند الوصول ويسترجع في حال تم التأكد من سلامة ممتلكات.',
        'tCancelationPolicy': 'في حال إلغاء الحجز ، لا يمكن استرجاع العربون',
        'vCategory': 'شاليه',
        'vCity': 'الرياض',
        'vRegion': 'الشمال',
        'image': [
            {
                'iPropertyImageId': '8501',
                'iPropertyId': '5383',
                'vImage': '1564419266.jpg',
                'iOrder': '1',
                'vURL': null,
                'eStatus': 'Active',
            },
            {
                'iPropertyImageId': '8492',
                'iPropertyId': '5383',
                'vImage': '1564419253.PNG',
                'iOrder': '0',
                'vURL': null,
                'eStatus': 'Active',
            },
            {
                'iPropertyImageId': '8493',
                'iPropertyId': '5383',
                'vImage': '1564419258.jpg',
                'iOrder': '0',
                'vURL': null,
                'eStatus': 'Active',
            },
            {
                'iPropertyImageId': '8494',
                'iPropertyId': '5383',
                'vImage': '1564419259.jpg',
                'iOrder': '0',
                'vURL': null,
                'eStatus': 'Active',
            },
            {
                'iPropertyImageId': '8495',
                'iPropertyId': '5383',
                'vImage': '1564419260.jpg',
                'iOrder': '0',
                'vURL': null,
                'eStatus': 'Active',
            },
            {
                'iPropertyImageId': '8496',
                'iPropertyId': '5383',
                'vImage': '1564419261.jpg',
                'iOrder': '0',
                'vURL': null,
                'eStatus': 'Active',
            },
            {
                'iPropertyImageId': '8497',
                'iPropertyId': '5383',
                'vImage': '1564419262.jpg',
                'iOrder': '0',
                'vURL': null,
                'eStatus': 'Active',
            },
            {
                'iPropertyImageId': '8498',
                'iPropertyId': '5383',
                'vImage': '1564419263.jpg',
                'iOrder': '0',
                'vURL': null,
                'eStatus': 'Active',
            },
            {
                'iPropertyImageId': '8499',
                'iPropertyId': '5383',
                'vImage': '1564419264.jpg',
                'iOrder': '0',
                'vURL': null,
                'eStatus': 'Active',
            },
            {
                'iPropertyImageId': '8500',
                'iPropertyId': '5383',
                'vImage': '1564419265.jpg',
                'iOrder': '0',
                'vURL': null,
                'eStatus': 'Active',
            },
            {
                'iPropertyImageId': '8502',
                'iPropertyId': '5383',
                'vImage': '1564419267.jpg',
                'iOrder': '0',
                'vURL': null,
                'eStatus': 'Active',
            },
            {
                'iPropertyImageId': '8503',
                'iPropertyId': '5383',
                'vImage': '1564419269.jpg',
                'iOrder': '0',
                'vURL': null,
                'eStatus': 'Active',
            },
        ],
    },
    'avg': [
        {
            'vReview': 'العاملين',
            'avg_review': '5',
        },
        {
            'vReview': 'الخدمات',
            'avg_review': '5',
        },
        {
            'vReview': 'النظافة',
            'avg_review': '5',
        },
        {
            'vReview': 'راحة',
            'avg_review': '5',
        },
        {
            'vReview': 'موقعك',
            'avg_review': '5',
        },
    ],
    'user': {
        'iUserId': '4035',
        'vUsername': '0',
        'vLastName': 'البكور',
        'vPassword': '8918ae938e12325805dc7eba8efe71e9',
        'vName': 'حسن',
        'vEmail': 'hb.arch@hotmail.com',
        'eGender': '0',
        'iCityId': '0',
        'eStatus': 'Active',
        'COL 9': null,
        'dtAddedDate': '2019-10-01 16:48:33',
        'dtUpdatedDate': '2019-10-01 16:48:33',
        'vMobile': '509849951',
        'vAuthCode': null,
        'vOTP': '6863',
        'iCountryId': '0',
        'vCountryISDCode': '+966',
        'vMobile_New': null,
        'iCountryId_New': null,
        'vCountryISDCode_New': null,
        'dtBirthDate': null,
    },
    'similar': [
        {
            'iPropertyId': '5438',
            'iUserId': '4050',
            'iCategoryId': '4',
            'vProperty': 'شاليات زهرة اللوتس',
            'vAddress': 'العفجه',
            'iCityId': '8',
            'iRegionId': '1',
            'eRegion': 'N',
            'eSwimmingPool': 'Yes',
            'eFootballYard': 'No',
            'vLatitude': '24.22310309515057',
            'vLongitude': '47.1843695640564',
            'vEntryTime': '15:00',
            'vExitTime': '5:00',
            'vArea': '600',
            'eDivided': 'No',
            'tDescription': 'يوجد 3 شاليهات ، كل شاليه يتكون من : صالة مع طاولة طعام ومطبخ صغير، غرفة نوم ودورة مياه خاصة ، 2 مجلس (كنب ومشب) ومنافعها ، دكه خارجية مقابلة مسبح الكبار ومسبح للصغار مع العاب مائية، العاب أطفال (مراجيح) . مسطحات خضراء واسعة، رذاذ ، سماعات.',
            'vMobileOne': '0545377031',
            'vMobileTwo': '0566258729',
            'vVideo': '',
            'vWeekdayPrice': '700',
            'vThursdayPrice': '700',
            'vFridayPrice': '700',
            'vSaturdayPrice': '600',
            'eMonthPrice': 'No',
            'vMonthPrice': '',
            'eYearPrice': 'No',
            'vYearPrice': '',
            'eStatus': 'Active',
            'dtAddedDate': '2019-10-09 05:58:49',
            'dtUpdatedDate': '2019-10-09 07:46:31',
            'iView': '9',
            'vAverageRating': '',
            'vTotalRating': '',
            'eFeatured': 'No',
            'eShow': 'No',
            'iDiscount': null,
            'vOfferStart': null,
            'vOfferEnd': null,
            'vOfferImage': null,
            'eVerified': 'No',
            'tBookingRules': 'دفع عربون قبل الحجز + دفع تأمين قبل دخول الشاليه',
            'tCancelationPolicy': 'يتم إلغاء الحجز قبل اسبوع  من يوم الحجز في الأيام العادية والعطل الموسمية، في أيام الأعياد يتم الإلغاء قبل شهر من يوم الحجز. ويمكن التغاضي عن ما سبق كشرط للالغاء في حال وجود مستأجر جاهز. ',
            'vCategory': 'شاليه',
            'vCity': 'الخرج',
            'vRegion': 'الشمال',
            'vOfferPrice': null,
            'image': [
                {
                    'iPropertyImageId': '9087',
                    'iPropertyId': '5438',
                    'vImage': '1570604819.jpg',
                    'iOrder': '1',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9086',
                    'iPropertyId': '5438',
                    'vImage': '1570603736.jpg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9088',
                    'iPropertyId': '5438',
                    'vImage': '1570604855.jpg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9089',
                    'iPropertyId': '5438',
                    'vImage': '1570604893.huawei',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9090',
                    'iPropertyId': '5438',
                    'vImage': '1570604930.huawei',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9091',
                    'iPropertyId': '5438',
                    'vImage': '1570604964.whatsapp',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9092',
                    'iPropertyId': '5438',
                    'vImage': '1570605019.huawei',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9093',
                    'iPropertyId': '5438',
                    'vImage': '1570605068.jpg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9094',
                    'iPropertyId': '5438',
                    'vImage': '1570605110.jpg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9095',
                    'iPropertyId': '5438',
                    'vImage': '1570605147.jpg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9096',
                    'iPropertyId': '5438',
                    'vImage': '1570605187.jpg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
            ],
        },
        {
            'iPropertyId': '5436',
            'iUserId': '13',
            'iCategoryId': '1',
            'vProperty': 'استراحة صبا',
            'vAddress': 'الرمال',
            'iCityId': '1',
            'iRegionId': '1',
            'eRegion': 'N',
            'eSwimmingPool': 'Yes',
            'eFootballYard': 'Yes',
            'vLatitude': '24.90783661385466',
            'vLongitude': '46.78704857826233',
            'vEntryTime': '15:00',
            'vExitTime': '3:00',
            'vArea': '3000',
            'eDivided': 'Yes',
            'tDescription': 'لكل قسم مجلس داخلي وخارجي<br /><br /><br />\nمطبخ <br /><br /><br />\nغرفه',
            'vMobileOne': '0551947000',
            'vMobileTwo': '',
            'vVideo': '',
            'vWeekdayPrice': '1636',
            'vThursdayPrice': '1818',
            'vFridayPrice': '2000',
            'vSaturdayPrice': '2000',
            'eMonthPrice': 'No',
            'vMonthPrice': '',
            'eYearPrice': 'No',
            'vYearPrice': '',
            'eStatus': 'Active',
            'dtAddedDate': '2019-10-03 13:30:15',
            'dtUpdatedDate': '2019-10-13 12:28:01',
            'iView': '74',
            'vAverageRating': '',
            'vTotalRating': '',
            'eFeatured': 'No',
            'eShow': 'No',
            'iDiscount': '',
            'vOfferStart': null,
            'vOfferEnd': null,
            'vOfferImage': null,
            'eVerified': 'Yes',
            'tBookingRules': '* لتأكيد الحجز يتم تحويل نصف المبلغ.<br /><br /><br />\n<br /><br /><br />\n* يوجد تأمين بمبلغ ٠٠٥ يدفع عند الوصول ويسترجع في حال تم التأكد من سلامة ممتلكات.',
            'tCancelationPolicy': 'في حال إلغاء الحجز ، لا يمكن استرجاع العربون.',
            'vCategory': 'استراحة',
            'vCity': 'الرياض',
            'vRegion': 'الشمال',
            'vOfferPrice': '1636',
            'image': [
                {
                    'iPropertyImageId': '9075',
                    'iPropertyId': '5436',
                    'vImage': '1570109432.jpg',
                    'iOrder': '1',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9066',
                    'iPropertyId': '5436',
                    'vImage': '1570109417.jpg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9067',
                    'iPropertyId': '5436',
                    'vImage': '1570109418.jpg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9068',
                    'iPropertyId': '5436',
                    'vImage': '1570109419.jpg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9069',
                    'iPropertyId': '5436',
                    'vImage': '1570109422.jpg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9070',
                    'iPropertyId': '5436',
                    'vImage': '1570109423.jpg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9071',
                    'iPropertyId': '5436',
                    'vImage': '1570109424.jpg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9072',
                    'iPropertyId': '5436',
                    'vImage': '1570109429.jpg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9073',
                    'iPropertyId': '5436',
                    'vImage': '1570109430.jpg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9074',
                    'iPropertyId': '5436',
                    'vImage': '1570109431.jpg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
            ],
        },
        {
            'iPropertyId': '5435',
            'iUserId': '4018',
            'iCategoryId': '1',
            'vProperty': 'استراحة الراحة',
            'vAddress': 'الجبيلة ، شارع عقرباء',
            'iCityId': '1',
            'iRegionId': '1',
            'eRegion': 'N',
            'eSwimmingPool': 'Yes',
            'eFootballYard': 'Yes',
            'vLatitude': '24.912607801976613',
            'vLongitude': '46.44082155604701',
            'vEntryTime': '0:00',
            'vExitTime': '0:00',
            'vArea': '5000',
            'eDivided': 'Yes',
            'tDescription': 'مجلسين ، مسبح ، ملعب ، حديقة ، خيمة في فصل الشتاء',
            'vMobileOne': '0559856543',
            'vMobileTwo': '0550698581',
            'vVideo': '',
            'vWeekdayPrice': '1000',
            'vThursdayPrice': '1500',
            'vFridayPrice': '1500',
            'vSaturdayPrice': '1500',
            'eMonthPrice': 'No',
            'vMonthPrice': '',
            'eYearPrice': 'No',
            'vYearPrice': '',
            'eStatus': 'Active',
            'dtAddedDate': '2019-09-27 15:58:29',
            'dtUpdatedDate': '2019-09-27 15:58:29',
            'iView': '60',
            'vAverageRating': '',
            'vTotalRating': '',
            'eFeatured': 'No',
            'eShow': 'No',
            'iDiscount': null,
            'vOfferStart': null,
            'vOfferEnd': null,
            'vOfferImage': null,
            'eVerified': 'No',
            'tBookingRules': 'في الاعياد لها اسعار خاصة',
            'tCancelationPolicy': 'الإلغاء قبل بيوم على الاقل ',
            'vCategory': 'استراحة',
            'vCity': 'الرياض',
            'vRegion': 'الشمال',
            'vOfferPrice': null,
            'image': [
                {
                    'iPropertyImageId': '9060',
                    'iPropertyId': '5435',
                    'vImage': '1569599911.jpeg',
                    'iOrder': '1',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9061',
                    'iPropertyId': '5435',
                    'vImage': '1569599914.jpeg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9062',
                    'iPropertyId': '5435',
                    'vImage': '1569599923.jpeg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9063',
                    'iPropertyId': '5435',
                    'vImage': '1569599927.jpeg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9064',
                    'iPropertyId': '5435',
                    'vImage': '1569599928.jpeg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9065',
                    'iPropertyId': '5435',
                    'vImage': '1569599929.jpeg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
            ],
        },
        {
            'iPropertyId': '5429',
            'iUserId': '3923',
            'iCategoryId': '1',
            'vProperty': 'استراحة اصالة ابحر',
            'vAddress': 'نهاية شارع الملك سعود بإتجاه البحر',
            'iCityId': '2',
            'iRegionId': '1',
            'eRegion': 'N',
            'eSwimmingPool': 'Yes',
            'eFootballYard': 'No',
            'vLatitude': '21.81687066175354',
            'vLongitude': '39.04171407222748',
            'vEntryTime': '16:00',
            'vExitTime': '12:00',
            'vArea': '900',
            'eDivided': 'Yes',
            'tDescription': 'صالة كبيره مع مجلس وغرفة نوم<br />\n<br />\nالرجال مجلس كبير مع مساحات خضراء',
            'vMobileOne': '0564440333',
            'vMobileTwo': '',
            'vVideo': '',
            'vWeekdayPrice': '600',
            'vThursdayPrice': '1000',
            'vFridayPrice': '1200',
            'vSaturdayPrice': '700',
            'eMonthPrice': 'No',
            'vMonthPrice': '',
            'eYearPrice': 'No',
            'vYearPrice': '',
            'eStatus': 'Active',
            'dtAddedDate': '2019-09-21 15:22:21',
            'dtUpdatedDate': '2019-10-12 09:47:19',
            'iView': '229',
            'vAverageRating': '',
            'vTotalRating': '',
            'eFeatured': 'No',
            'eShow': 'No',
            'iDiscount': '',
            'vOfferStart': null,
            'vOfferEnd': null,
            'vOfferImage': null,
            'eVerified': 'No',
            'tBookingRules': 'لتأكيد الحجز يتم تحويل نصف المبلغ.<br />\nيوجد تأمين بمبلغ 005 يدفع عند الوصول ويسترجع في حال تم التأكد من سلامة ممتلكات.',
            'tCancelationPolicy': 'في حال إلغاء الحجز ، لا يمكن استرجاع العربون',
            'vCategory': 'استراحة',
            'vCity': 'جده',
            'vRegion': 'الشمال',
            'vOfferPrice': '600',
            'image': [
                {
                    'iPropertyImageId': '9025',
                    'iPropertyId': '5429',
                    'vImage': '1569079349.jpg',
                    'iOrder': '1',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9028',
                    'iPropertyId': '5429',
                    'vImage': '1569079352.jpg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
            ],
        },
        {
            'iPropertyId': '5426',
            'iUserId': '3915',
            'iCategoryId': '1',
            'vProperty': 'فاملي داي',
            'vAddress': 'الذهبي ',
            'iCityId': '1',
            'iRegionId': '4',
            'eRegion': 'E',
            'eSwimmingPool': 'Yes',
            'eFootballYard': 'No',
            'vLatitude': '24.54820731652492',
            'vLongitude': '46.557103999744754',
            'vEntryTime': '2:00',
            'vExitTime': '2:00',
            'vArea': '1200',
            'eDivided': 'Yes',
            'tDescription': '4مجالس ؛صالة حفلات دي جي مجهزة بالسماعات واستيج أرضية مضيئة،وليزر حديث وجلسات ،ألعاب مائيه للأطفال ، مسبح ، مجلسين رجال ومجلسين نساء ،جلسات خارجيه،مطبخ ',
            'vMobileOne': '0557687291',
            'vMobileTwo': '',
            'vVideo': '',
            'vWeekdayPrice': '999',
            'vThursdayPrice': '1500',
            'vFridayPrice': '1700',
            'vSaturdayPrice': '1200',
            'eMonthPrice': 'No',
            'vMonthPrice': '',
            'eYearPrice': 'No',
            'vYearPrice': '',
            'eStatus': 'Active',
            'dtAddedDate': '2019-09-14 15:09:49',
            'dtUpdatedDate': '2019-09-14 15:09:49',
            'iView': '128',
            'vAverageRating': '',
            'vTotalRating': '',
            'eFeatured': 'No',
            'eShow': 'No',
            'iDiscount': null,
            'vOfferStart': null,
            'vOfferEnd': null,
            'vOfferImage': null,
            'eVerified': 'No',
            'tBookingRules': 'لتأكيد الحجز يتم تحويل نصف المبلغ.\r\nيوجد تأمين بمبلغ 005 يدفع عند الوصول ويسترجع في حال تم التأكد من سلامة ممتلكات.',
            'tCancelationPolicy': 'في حال إلغاء الحجز ، لا يمكن استرجاع العربون',
            'vCategory': 'استراحة',
            'vCity': 'الرياض',
            'vRegion': 'غرب',
            'vOfferPrice': null,
            'image': [
                {
                    'iPropertyImageId': '8987',
                    'iPropertyId': '5426',
                    'vImage': '1568473791.jpeg',
                    'iOrder': '1',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '8988',
                    'iPropertyId': '5426',
                    'vImage': '1568473792.jpeg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '8989',
                    'iPropertyId': '5426',
                    'vImage': '1568473793.jpeg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '8990',
                    'iPropertyId': '5426',
                    'vImage': '1568473799.jpeg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '8991',
                    'iPropertyId': '5426',
                    'vImage': '1568473800.jpeg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '8993',
                    'iPropertyId': '5426',
                    'vImage': '1568473802.jpeg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '8994',
                    'iPropertyId': '5426',
                    'vImage': '1568473803.jpeg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '8995',
                    'iPropertyId': '5426',
                    'vImage': '1568473804.jpeg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '8997',
                    'iPropertyId': '5426',
                    'vImage': '1568473808.jpeg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '8998',
                    'iPropertyId': '5426',
                    'vImage': '1568473809.png',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '8999',
                    'iPropertyId': '5426',
                    'vImage': '1568473831.jpeg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9000',
                    'iPropertyId': '5426',
                    'vImage': '1568473832.jpeg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9001',
                    'iPropertyId': '5426',
                    'vImage': '1568473836.jpeg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9002',
                    'iPropertyId': '5426',
                    'vImage': '1568473842.jpeg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9003',
                    'iPropertyId': '5426',
                    'vImage': '1568473847.jpeg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9004',
                    'iPropertyId': '5426',
                    'vImage': '1568473855.jpeg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
                {
                    'iPropertyImageId': '9005',
                    'iPropertyId': '5426',
                    'vImage': '1568473859.jpeg',
                    'iOrder': '0',
                    'vURL': null,
                    'eStatus': 'Active',
                },
            ],
        },
    ],
    'comment': [
        {
            'iCommentId': '1097',
            'iUserId': '13',
            'iPropertyOwnerId': '13',
            'iPropertyId': '5383',
            'vComment': 'جميلة جدا',
            'eStatus': 'Active',
            'dtAddedDate': '2019-09-04 10:26:29',
            'dtUpdatedDate': '2019-09-04 10:26:29',
            'vUsername': '0',
            'vName': 'محمد',
        },
        {
            'iCommentId': '1066',
            'iUserId': '3788',
            'iPropertyOwnerId': '13',
            'iPropertyId': '5383',
            'vComment': 'عرض مميز لأدق التفاصيل ',
            'eStatus': 'Active',
            'dtAddedDate': '2019-08-28 22:23:34',
            'dtUpdatedDate': '2019-09-04 10:27:47',
            'vUsername': '0',
            'vName': 'Sho0osh',
        },
    ],
    'user_comment': [],
    'review': [
        {
            'iReviewId': '1',
            'vReview': 'العاملين',
            'iOrder': '1',
            'eStatus': 'VeryGood',
            'dtAddedDate': '2019-04-27 18:44:07',
            'dtUpdatedDate': '2019-04-27 18:44:07',
            'vLangCode': 'AR',
        },
        {
            'iReviewId': '2',
            'vReview': 'منشأة',
            'iOrder': '2',
            'eStatus': 'VeryGood',
            'dtAddedDate': '2019-04-27 18:45:10',
            'dtUpdatedDate': '2019-04-27 18:45:10',
            'vLangCode': 'AR',
        },
        {
            'iReviewId': '3',
            'vReview': 'النظافة',
            'iOrder': '3',
            'eStatus': 'VeryGood',
            'dtAddedDate': '2019-04-27 18:45:45',
            'dtUpdatedDate': '2019-04-27 18:45:45',
            'vLangCode': 'AR',
        },
        {
            'iReviewId': '4',
            'vReview': 'راحة',
            'iOrder': '4',
            'eStatus': 'good',
            'dtAddedDate': '2019-04-27 18:46:10',
            'dtUpdatedDate': '2019-04-27 18:46:10',
            'vLangCode': 'AR',
        },
        {
            'iReviewId': '5',
            'vReview': 'قيمة المال',
            'iOrder': '5',
            'eStatus': 'normal',
            'dtAddedDate': '2019-04-27 18:46:39',
            'dtUpdatedDate': '2019-04-27 18:46:39',
            'vLangCode': 'AR',
        },
        {
            'iReviewId': '6',
            'vReview': 'موقعك',
            'iOrder': '6',
            'eStatus': 'good',
            'dtAddedDate': '2019-04-27 18:47:15',
            'dtUpdatedDate': '2019-04-27 18:47:15',
            'vLangCode': 'AR',
        },
    ],
    'favourite': [],
};
