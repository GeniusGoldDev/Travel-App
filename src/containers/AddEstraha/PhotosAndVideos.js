import React, {Component} from 'react';
import {
    View,
    TextInput,
    Image,TouchableOpacity,FlatList,Alert
} from 'react-native';
import {AppText} from '../../components/AppText';
import styles from './styles';
import {LGButton} from '../../components/Button';
import {TEXTS, SCREEN, COLORS} from '../../common';
import APP_IMAGES from '../../assets/images';
import {Switch } from '../../components/Switch';
import ImagePicker, { openCamera, openPicker } from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons'
import StyleConfig from '../../assets/style';


class PhotosAndVideos extends Component{
    constructor(props){
        super(props);
        this.state={
            videoEnabled:false,
            vVedeo:"",
            photos:[],
            selectedIndex:0
        }
    }
    onSaveProperty=()=>{
        const {
            photos,
            videoEnabled,
            vVedeo,
            selectedIndex
        } = this.state;
        let vImage = [] ;//, names=[], mimes=[], uris=[],errors=[],sizes =[];
        let vImagePrimary;
        for(let ind in photos){
            if(ind == selectedIndex){
                let IMAGE_CROP = photos[ind].uri.slice(photos[ind].uri.lastIndexOf("/"));
                vImagePrimary = StyleConfig.isIphone ?
                    {"uri": photos[ind].uri, "filename": IMAGE_CROP, "name": IMAGE_CROP} :
                    {"uri": photos[ind].uri, "name": IMAGE_CROP, "type": photos[ind].mime} ;
            }else if(photos[ind].uri != ''){
                let IMAGE_CROP = photos[ind].uri.slice(photos[ind].uri.lastIndexOf("/"));
                let image1 = StyleConfig.isIphone ?
                    {"uri": photos[ind].uri, "filename": IMAGE_CROP, "name": IMAGE_CROP} :
                    {"uri": photos[ind].uri, "name": IMAGE_CROP, "type": photos[ind].mime} ;
                    vImage.push(image1)
            }
        }
        let data = {
            vImage
        }
        if(videoEnabled){
            data = {
                ...data,
                videoEnabled,
                vVedeo
            }
        }
        this.props.setCurrentPos(99, data)
    }
    addImages=()=>{
        Alert.alert("Select Photos","",[
            {text:'Cancel', onPress: ()=> {}},
            {text:'Choose from Library...', onPress: this.openLibrary},
            {text:'Take Photos..', onPress: this.openCamera},  
        ])
    }
    _onImageRemove=(ind)=>{
       let { photos, selectedIndex } = this.state ;
       if(selectedIndex == ind){
           selectedIndex = 0
       }
        photos = photos.filter((item,index)=> index != ind)
       this.setState({photos, selectedIndex})
    }
    openCamera=()=>{
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            // image.path  
            // console.log('image-->>>>>',image)
                let {photos} = this.state
                const source = { uri: image.path, type: image.mime, size: image.size };
    
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                if(photos.length == 0) {
                    photos.push( source);  
                } else {
                    photos[photos.length-1]= source;
                }
                if(photos.length < 20){
                    photos.push({uri:''})
                }
                this.setState({
                    photos
                });
          });
    }
    openLibrary=()=>{
        let {photos} = this.state
        const maxFiles = ( 20 - photos.length)
        console.log({maxFiles})
        ImagePicker.openPicker({
            multiple: true,
            mediaType: 'photo',
            maxFiles:maxFiles
          }).then(images => {
            console.log(images);
            console.log('onSelect images-->>',images)
            // let {photos} = this.state
            let source = [] ;
            for(let ind in images){
                source.push({uri: images[ind].path, type: images[ind].mime, size: images[ind].size})
            }
            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            if(photos.length == 0) {
                photos = source;  
            } else {
                photos.length = photos.length - 1 ;
                photos = [ ...photos, ...source];

            }
            if(photos.length < 20){
                photos.push({uri:''})
            }
            this.setState({
                photos
            });

          });
    }

    render(){
        return(<View>
            {this.state.photos.length == 0 ?this.renderPhotoViewBlank():this.renderPhotoView()}
            {this.renderSwitch(TEXTS.do_you_have_video_link,"videoEnabled")}
            {this.state.videoEnabled && this.renderInput(TEXTS.youtube_link,"http://youtube.com/watch?v=TDgDiwKwfoE","vVedeo","default")}
            <View style={[styles.row, {justifyContent: 'center'}]}>
                <LGButton
                    onPress={this.onSaveProperty}
                    buttonStyle={styles.resultButton}
                    title={TEXTS.save_the_break}/>
            </View>
        </View>);
    }

    renderPhotoViewBlank=()=><TouchableOpacity onPress={this.addImages} style={styles.photoViewContainer}>
        <View style={{
            alignItems:'center',
            justifyContent:'center',flex:1
        }}>
            <Image source={APP_IMAGES.ic_gellery}
                style={{tintColor:COLORS.text_input,height:StyleConfig.countPixelRatio(46), width:StyleConfig.countPixelRatio(46)}}/>
            <AppText style={styles.photoText1}>{TEXTS.add_photos}</AppText>
            <AppText style={styles.photoText2}>{TEXTS.you_can_add_upto_20_photos}</AppText>
        </View>
    </TouchableOpacity>
    renderPhotoView=()=><View style={styles.photoViewContainer}>
    <FlatList
        data={this.state.photos}
        extraData={this.state}
        numColumns={3}
        columnWrapperStyle={{
           //justifyContent :"space-evenly"
           paddingHorizontal:StyleConfig.countPixelRatio(6)
        }}
        renderItem={({item, index})=>{
            if(item.uri == ''){
                return(
                    <TouchableOpacity onPress={this.addImages} style={styles.blankImage} >
                        <Icon name={"ios-add"} size={30} color={COLORS.text_input} />
                    </TouchableOpacity>
                )
            }else{
                return(
                    <TouchableOpacity style={{
                        flexDirection:'row',
                        marginHorizontal:StyleConfig.countPixelRatio(6),
                        height:SCREEN.WIDTH*0.25,
                        marginTop:StyleConfig.countPixelRatio(12),
                        flex:0.33,
                    }} onPress={()=> this.setState({selectedIndex:index})}>
                        <Image source={{uri:item.uri}} style={styles.imageItem} />
                        
                        {this.state.selectedIndex == index &&
                        <View style={[styles.imageItem,{
                            position:'absolute',
                            zIndex:998,
                            backgroundColor:'#ffffff33',
                            alignItems:'center',
                            justifyContent:'center'
                        }]}>
                                <Icon name={'ios-checkmark'} size={32} color={'white'} />
                            
                        </View>}
                        <View style={{
                            position:'absolute',
                            marginTop:-11,
                            marginLeft:-8,
                            flexDirection:'row',
                            zIndex:999
                        }}>
                            <TouchableOpacity onPress={()=>this._onImageRemove(index)}>
                                <Icon name={'md-close-circle'} size={22} color={'red'} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )
            }
        }}
    />
</View>

renderSwitch=(label, val)=><View style={styles.row}>
<AppText>{label}</AppText>
<Switch
    value={this.state[val]}
    onValueChange={(value)=>this.setState({[val]:value})}/>
</View>

renderInput=(label, placeholder, val, keyboardType="default", isHalf=false)=><View style={styles.row}>
<View style={isHalf ? [styles.inputContainer,{width: SCREEN.WIDTH * 0.45, marginLeft:-10}] : styles.inputContainer}>
    <TextInput
        style={styles.inputStyle}
        value={this.state[val]}
        placeholder={placeholder}
        onChangeText={(value) => this.setState({[val]:value})}
        underlineColorAndroid="transparent"
        keyboardType={keyboardType}
    />
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

}

export  default PhotosAndVideos;
