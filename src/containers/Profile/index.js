import React, { Component } from 'react'
import { View, Image, Picker, ScrollView } from 'react-native'
import { connect } from "react-redux";
import styles from './styles';
import { IMAGES, TEXTS, SCREEN } from "../../common";
import { AppText, FormInput, LGButton } from "../../components";
import { profileValidation } from '../../utils/validation';


class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.user ? props.user.vName : "",
            lastname: props.user ? props.user.vLastName === "0" : "",
            gender: "",
            city: ""
        }
    }

    onPressSave = () => {
        const { email, password } = this.state;
        const isValid = profileValidation({ email, password });
        if (isValid.valid) {
            this.setState({ errors: null });
        } else {
            this.setState({ errors: isValid.errors });
        }
    }
    render() {
        const { name, lastname } = this.state;
        const { user } = this.props;
        return (
            <ScrollView style={styles.container} >
                <View style={styles.avatarSection} >
                    <View style={styles.imageContainerStyle}>
                        <Image source={IMAGES.avatar} resizeMode={"contain"} style={styles.avatar} />
                    </View>
                    <AppText style={styles.nameText} >{user.vName}</AppText>
                </View>
                <View>
                    <FormInput
                        title={TEXTS.fisrtname}
                        value={name}
                    />
                    <FormInput
                        title={TEXTS.lastname}
                        value={lastname}
                        placeholder={TEXTS.lastname}
                    />



                    {/*
                    Must be static text
                    <FormInput
                        title={TEXTS.email}
                        placeholder="example@example.com"
                        value={email}
                        onChangeText={(email) => this.setState({ email })}
                        error={errors ? errors["email"] : null}
                    /> */}
                    {/* <View style={styles.cityContainer}>
                        <AppText style={styles.cityStyle}> {TEXTS.city} </AppText>
                        <Picker
                            selectedValue={city}
                            style={styles.pickerStyle}
                            onValueChange={(itemValue) =>
                                this.setState({ city: itemValue })
                            }>
                            <Picker.Item label="الرياض" value="الرياض" />
                            <Picker.Item label="الدمام" value="الدمام" />
                            <Picker.Item label="جدة" value="جدة" />
                        </Picker>
                    </View> */}

                    <LGButton title={TEXTS.save} buttonStyle={{ marginTop: 50 }}
                        onPress={this.onPressSave}
                    />
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Profile);

