import React,{Component} from 'react';
import {
    View, TouchableOpacity,Image,ScrollView
} from 'react-native';
import {COLORS, FONTS, ICONS, TEXTS} from '../../common';
import MatrialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {navigateToEstrahaDetails} from '../../navigation/Navigator';
import {styles} from './styles';
import {AppText, FormInput, FormInputComment, LGButton, Rating} from '../../components';
import StyleConfig from './../../assets/style';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {postReviewComment} from '../../service/property'
import ImagePicker from 'react-native-image-picker';
export default class AddComment extends Component{
    static navigationOptions = ({navigation}) => {
        return {
            title: TEXTS.tell_us_your_exp,
            titleStyle: {...FONTS.bold, fontSize: 17},
            headerLeft: null,
            headerRight: <MatrialIcon
                name={'close'}
                size={25}
                color={COLORS.main}
                style={{marginHorizontal: 8}}
                onPress={() => navigateToEstrahaDetails(navigation)}
            />
        };
    };
    constructor(props){
        super(props);
        const review = props.navigation.getParam('review');
        let allReview = []
        for(let ind in review){
            allReview.push({ key: 'iReviewId'+review[ind].iReviewId ,['iReviewId'+review[ind].iReviewId]:0, name: review[ind].vReview})
        }

        this.state={comment:'', allReview, img1:null, img2:null, img3:null, img4:null}
    }
    // onAddPhoto=(key)=>{
    //     const options = {
    //         title: 'Select Photo',
    //         storageOptions: {
    //             skipBackup: true,
    //             path: 'images',
    //         },
    //     };
    //     ImagePicker.showImagePicker(options, (response) => {
    //         console.log('Response = ', response);
    //
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         } else {
    //             const source = { uri: response.uri };
    //
    //             // You can also display the image using data:
    //             // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    //
    //             this.setState({
    //                 [key]: response,
    //             });
    //         }
    //     });
    // }

    onSelectedStar=( ind, reviews)=>{
        const {allReview} = this.state;
        allReview[ind][allReview[ind].key] = reviews;
        this.setState({allReview});
    }
    _onSubmitComment =async ()=>{
        const {comment, allReview} = this.state
        let body={}
        for(let ind in allReview){
            body={
                ...body,
                [allReview[ind].key]: allReview[ind][allReview[ind].key]
            }
        }
        const user_comment = this.props.navigation.getParam('user_comment');
        const data = this.props.navigation.getParam('data');
        const {iUserId,iPropertyId} = data ;
        body={
            ...body,
            iUserId,
            iPropertyId,
            vComment:comment
        }
        if(user_comment.length > 0){
            const {iCommentId} = user_comment ;
            body={
                ...body,
                iCommentId
            }
        }
        console.log({body})
        const res = await postReviewComment(body)
        console.log({res})
        if(res.message.Output == 1){
            alert(res.message.Message)
        }else{
            navigateToEstrahaDetails(this.props.navigation,{})
        }

    }
    render(){
        const { comment, errors,allReview } = this.state;
        return(
            <ScrollView style={[styles.container, { paddingHorizontal:StyleConfig.countPixelRatio(20)}]}>
                <View>
                    {allReview.map((item,index)=><View key={index}>
                        <AppText style={styles.sectionTitle}>{item.name}</AppText>
                        <Rating starSize={StyleConfig.countPixelRatio(36)}
                                starStyle={{marginHorizontal: StyleConfig.countPixelRatio(6)}}
                                containerStyle={{width: StyleConfig.countPixelRatio(240)}}
                                selectedStar={(reviews)=>this.onSelectedStar(index,reviews)}
                                starCount={item[item.key]}/>
                    </View>)}

                </View>

                <View style={[styles.row,{marginTop:StyleConfig.countPixelRatio(20)}]}>
                    <AppText style={styles.sectionTitle}>{TEXTS.add_comment}</AppText>
                </View>

                <View>
                    <FormInputComment
                        containerStyle={{width:StyleConfig.width - StyleConfig.countPixelRatio(40)}}
                        style={{height:StyleConfig.countPixelRatio(140),
                            textAlignVertical: "top",}}
                        placeholder={""}
                        value={comment}
                        onChangeText={(comment) => this.setState({ comment })}
                        error={errors ? errors["phone"] : null}/>
                </View>
                {/*<View style={[styles.row,{marginTop:StyleConfig.countPixelRatio(34)}]}>*/}
                    {/*<AppText style={styles.sectionTitle}>{TEXTS.add_photo_your_stey_there}</AppText>*/}
                {/*</View>*/}
                {/*<View style={[styles.row,{marginTop:StyleConfig.countPixelRatio(10)}]}>*/}
                    {/*{this.renderButton('img1')}*/}
                    {/*{this.renderButton('img2')}*/}
                    {/*{this.renderButton('img3')}*/}
                    {/*{this.renderButton('img4')}*/}
                {/*</View>*/}
                <View style={styles.flex1}/>
                <View style={[styles.row, {
                    justifyContent: 'center',
                    marginBottom: StyleConfig.countPixelRatio(StyleConfig.isIphoneX? 24 :8),
                }]}>
                    <LGButton
                        onPress={this._onSubmitComment}
                        buttonStyle={styles.resultButton}
                        title={TEXTS.addition}/>
                </View>



                </ScrollView>
        )
    }
    renderButton=(key)=>{
        return(
            <TouchableOpacity onPress={()=>this.onAddPhoto(key)} style={{
                backgroundColor:COLORS.borderColor,
                borderRadius:5,
                width: StyleConfig.countPixelRatio(64),
                height: StyleConfig.countPixelRatio(64),
                marginHorizontal: StyleConfig.countPixelRatio(5),
                alignItems:'center',
                justifyContent:'center'
            }}>{
                this.state[key]== null ? <Icon name={'plus'} size={22} color={'#bebebe'}/> : <Image
                source={{uri:this.state[key].uri}}
                style={{
                    borderRadius:5,
                    width: StyleConfig.countPixelRatio(64),
                    height: StyleConfig.countPixelRatio(64),
                  }} />
            }
            </TouchableOpacity>
        )
    }
}
