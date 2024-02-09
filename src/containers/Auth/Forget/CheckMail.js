import React, { Component } from 'react';
import { View } from 'react-native';
import { STYLES, TEXTS, ICONS, COLORS } from '../../../common';
import { AppText, FormInput, LGButton } from '../../../components';
import { navigateToEnterSecretCode, navigateToRegister } from '../../../navigation/Navigator';
import { sendEmailToResetPassword } from '../../../redux/actions/Auth';
import { checkEmailValidation } from '../../../utils/validation';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class CheckMail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      email:"",
      errors:null
    };
  }

  onCheckEmail = () => {
    const { navigation } = this.props;
    const { email } = this.state;
    const isValid = checkEmailValidation({ email });
    if (isValid.valid) {
        this.setState({ errors : null });
        this.props.sendEmailToResetPassword({email, navigation})
    } else {
        this.setState({ errors: isValid.errors });
    }

}

  render() {
    const { navigation } = this.props;
    const { email, errors } = this.state;

    return (
      <View style={styles.container} >
          <View style={[STYLES.authContainer]} >
              <AppText style={[STYLES.authHeaderTextStyle]} >{TEXTS.get_password}</AppText>
              <FormInput
                  title={TEXTS.email}
                  placeholder="البريد الالكتروني"
                  iconName={ICONS.email}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={(email) => this.setState({ email })}
                  error={errors ? errors["email"] : null}
              />
              <LGButton title={TEXTS.get_password} buttonStyle={{marginVertical:20}}
                onPress={ this.onCheckEmail } />
          </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      sendEmailToResetPassword
  },dispatch)
} 

export default connect(null,mapDispatchToProps)(CheckMail);