import {StyleSheet} from 'react-native';
import { COLORS } from '../../common';

export default StyleSheet.create({
    container : {
        flex : 1,
    },
    logout: {
        flexDirection: "row",
        backgroundColor: "#f9f9f9",
        height: 50,
        marginBottom: 10,
        alignItems: "center"
    },
    logoutText: {
        flex: 1,
        color: COLORS.main,
        fontSize: 16,
        marginLeft: 10
    },
    icon: {
        width: "25%",
        textAlign: "center"
    }
})