import React, { Component } from 'react'
import { View,ScrollView } from 'react-native'
import styles from './styles';
import { TEXTS, ICONS, STYLES, COLORS } from '../../../common';
import { AppText, FormInput, LGButton } from '../../../components';
import { navigateToLogin, navigateToHome } from '../../../navigation/Navigator';
import { onRegister } from '../../../redux/actions/Auth'
import { registerValidation } from '../../../utils/validation';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email:"",
            password:"",
            errors: null,
            error : ""
        }
    }
    onPressRegister = () => {
        const { name, email, password } = this.state;
        const { navigation, onRegister,user_id } = this.props;
        const isValid = registerValidation({ name, email, password });
        if (isValid.valid) {
            this.setState({ errors : null });
            onRegister({name,email,password,navigation})
        } else {
            console.log(isValid.errors)
            this.setState({ errors: isValid.errors });
        }
    }

    render() {
        const { navigation } = this.props;
        const { name, email, password, errors } = this.state;
        return (
            <ScrollView style= {styles.container} >
                <View style={STYLES.authContainer}>
                    <AppText style={STYLES.authHeaderTextStyle}>{TEXTS.new_register}</AppText>
                    <FormInput
                        title={TEXTS.name}
                        placeholder="الإسم"
                        iconName={ICONS.profile}
                        value={name}
                        onChangeText={(name) => this.setState({name})}
                        error={errors ? errors["name"] : null}
                    />
                    <FormInput
                        title={TEXTS.email}
                        placeholder="البريد الالكتروني"
                        iconName={ICONS.email}
                        keyboardType="email-address"
                        value={email}
                        onChangeText={(email) => this.setState({email})}
                        error={errors ? errors["email"] : null}

                    />
                    <FormInput
                        title={TEXTS.password}
                        placeholder={TEXTS.password}
                        iconName={ICONS.password}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(password) => this.setState({password})}
                        error={errors ? errors["password"] : null}
                    />
                    <LGButton title={TEXTS.register} buttonStyle={{marginTop:70}}
                        onPress={this.onPressRegister} 
                    />
                    <AppText style={[styles.registerTextStyle]}>{TEXTS.register_text}</AppText>
                    <View style={styles.rowTextContainer}>
                        <AppText style={styles.registerNowText}>{TEXTS.has_acc}</AppText>
                        <AppText style={[styles.registerNowText,{color: COLORS.main, textDecorationLine:"underline"}]} onPress={() => navigateToLogin(navigation)} >{TEXTS.login}</AppText>
                    </View>
                </View>

            </ScrollView>
        )
    }
}

const mapStateToProps = state=>{
    return{
        user_id : state.auth.user_id
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onRegister
    },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
