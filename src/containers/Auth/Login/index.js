import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { FormInput, LGButton, AppText, Button } from '../../../components/index';
import { TEXTS, COLORS, STYLES, ICONS } from '../../../common';
import styles from './styles';
import { navigateToCheckPhone, navigateToMain, navigateToCheckMail } from '../../../navigation/Navigator';
import { loginValidation, isEmpty } from '../../../utils/validation';
import { onLogin } from '../../../redux/actions/Auth';


export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            password: "",
            errors: null,
        }
    }

    onPressLogin = () => {
        const { phone, password } = this.state;
        const { navigation } = this.props;
        const isValid = loginValidation({ phone, password });
        if (isValid.valid) {
            this.setState({ errors : null });
            this.props.onLogin({phone, password, navigation})
        } else {
            this.setState({ errors: isValid.errors });
        }
    }
    render() {
        const { navigation } = this.props;
        const { phone, password, errors } = this.state;
        return (
            <ScrollView style={styles.container} >
                <View style={STYLES.authContainer}>
                    <AppText style={STYLES.authHeaderTextStyle}>{TEXTS.login}</AppText>
                    <FormInput
                        placeholder={"5xxxxxxx"}
                        title={TEXTS.phone}
                        iconName={ICONS.mobile}
                        keyboardType={"phone-pad"}
                        value={phone}
                        onChangeText={(phone) => this.setState({ phone })}
                        error={errors ? errors["phone"] : null}
                    />
                    <FormInput
                        title={TEXTS.password}
                        placeholder={TEXTS.password}
                        iconName={ICONS.password}
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({ password })}
                        error={errors ? errors["password"] : null}
                    />
                    <View style={styles.rowTextContainer}>
                        <AppText style={styles.forgetPasswordText}>{TEXTS.forgetPassword}</AppText>
                        <AppText
                        onPress={()=>navigateToCheckMail(navigation)}
                        style={[styles.forgetPasswordText, { textDecorationLine: "underline" }]}>{TEXTS.getPassword}</AppText>
                    </View>
                    <LGButton
                        // disabled = { isEmpty(phone)|| isEmpty(password) }
                        title={TEXTS.login} onPress={this.onPressLogin} />
                    <View style={styles.rowTextContainer}>
                        <AppText style={styles.registerNowText}>{TEXTS.has_not_acc}</AppText>
                        <AppText style={[styles.registerNowText, { color: COLORS.main, textDecorationLine: "underline" }]} onPress={() => navigateToCheckPhone(navigation)} >{TEXTS.register_now}</AppText>
                    </View>
                    <Button title={TEXTS.visitor}
                        style={styles.visitorButton}
                        titleStyle={{ color: COLORS.main_text }}
                        onPress={() => navigateToMain(navigation)}
                    />
                </View>
            </ScrollView>
        )
    }
}

const mapDispatchToProps = dispatch=>{
    return bindActionCreators({
        onLogin
    },dispatch)
}
export default connect(null, mapDispatchToProps)(Login);

