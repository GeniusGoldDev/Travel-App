import React, { Component } from 'react'
import { View } from 'react-native'
import { STYLES, TEXTS } from '../../../common';
import { AppText, FormInput, LGButton } from '../../../components';
import { isEmpty } from '../../../utils/validation';
import { onCheckOtp } from '../../../redux/actions/Auth'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export class Otp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            otp: "",
            errors: null,
        }
    }

    onPressConfirm = () => {
        const { navigation, onCheckOtp, user_id } = this.props;
        const { otp } = this.state;
        if (isEmpty(otp)) {
            this.setState({ errors: TEXTS.empty_otp })
        }
        else {
            onCheckOtp({ otp, user_id, navigation })
        }
    }

    render() {
        const { otp, errors } = this.state;
        return (
            <View style={styles.container} >
                <View style={[STYLES.authContainer]} >
                    <AppText style={[STYLES.authHeaderTextStyle]} >{TEXTS.otp_text}</AppText>
                    <FormInput
                        title={TEXTS.otp_code}
                        placeholder={TEXTS.otp_code}
                        keyboardType={"phone-pad"}
                        containerStyle={{ marginBottom: 30 }}
                        value={otp}
                        onChangeText={(otp) => this.setState({ otp })}
                        error={errors ? errors : null}
                    />
                    <LGButton title={TEXTS.otp_confirm} onPress={this.onPressConfirm} />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        user_id: state.auth.user_id
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onCheckOtp
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Otp)
