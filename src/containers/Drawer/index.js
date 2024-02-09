import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FlatList } from 'react-native-gesture-handler';
import {logout} from "../../redux/actions"
import AvatarSection from './AvatarSection';
import menu_content from './menu_content';
import MenuItem from './MenuItem';
import { AppText } from '../../components';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { ICONS, COLORS, TEXTS } from '../../common';
import styles from './styles';

export class Drawer extends Component {


    onPressLogout = async () => {
        this.props.logout();
        this.props.navigation.closeDrawer();
    }


    render() {
        const { navigation, user } = this.props;
        const menu_items = menu_content(user);
        return (
            <View style={styles.container} >
                <AvatarSection navigation={navigation} user={user} />
                <FlatList
                    data={menu_items}
                    renderItem={({ item }) => <MenuItem item={item} navigation={navigation} />}
                    keyExtractor={(item, i) => `item--${i}--${item.id}`}
                    ListFooterComponent={
                        user ?
                            <TouchableOpacity style={styles.logout} activeOpacity={0.7} onPress={this.onPressLogout} >
                                <Icon name={ICONS.logout} size={25} color={COLORS.main} style={styles.icon} />
                                <AppText style={styles.logoutText} >{TEXTS.logout}</AppText>
                            </TouchableOpacity>
                            : null
                    }
                />
            </View>
        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ logout }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)
