import React, { Component } from 'react'
import { View } from 'react-native'
import styles from './styles';
import { AppText, FormInput, LGButton } from '../../../components';
import { TEXTS, STYLES, ICONS } from '../../../common';
import { onCheckPhone } from '../../../redux/actions/Auth'
import { checkPhoneValidation } from '../../../utils/validation';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class CheckPhone extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            errors: null,
        }
    }

    onPressConfirm = () => {
        const { phone } = this.state;
        const { navigation, onCheckPhone } = this.props;
        const isValid = checkPhoneValidation({ phone });
        if (isValid.valid) {
            this.setState({ errors : null });
            onCheckPhone({phone,navigation})
        } else {
            this.setState({ errors: isValid.errors });
        }
    }

    render() {
        const { phone, errors } = this.state;
        return (
            <View style={styles.container} >
                <View style={[STYLES.authContainer]} >
                    <AppText style={[STYLES.authHeaderTextStyle]} >{TEXTS.enter_phone}</AppText>
                    <FormInput
                        placeholder={"5xxxxxxxs"}
                        iconName={ICONS.mobile}
                        title={TEXTS.phone}
                        keyboardType={"phone-pad"}
                        value={phone}
                        onChangeText={(phone) => this.setState({phone})}
                        error={errors ? errors["phone"] : null}
                    />
                    <LGButton title={TEXTS.confirm} onPress={this.onPressConfirm} />
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        onCheckPhone
    },dispatch)
}

export default connect(null,mapDispatchToProps)(CheckPhone);