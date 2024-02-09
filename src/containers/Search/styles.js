
import { StyleSheet, I18nManager } from 'react-native';
import { FONTS, COLORS, SCREEN } from '../../common';

export const styles = StyleSheet.create({
    inputContainer: {
      borderColor: COLORS.main,
      borderWidth: 1,
      borderRadius: 5,
      width: SCREEN.WIDTH * 0.9,
      marginVertical: 10,
      alignSelf: "center",
      paddingHorizontal: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 50
    },
    inputStyle: {
      ...FONTS.bold,
      color: COLORS.text_input,
      flex: 1,
      textAlign: I18nManager.isRTL ? "right" : null
    },
    iconStyle: {
      justifyContent: "center",
      alignItems: "center"
    },
    advancedSearchStyle : {
      flexDirection:"row",
      flex:1,
      marginVertical: 10,
      // paddingHorizontal: 18,
      justifyContent:'center',
        alignItems:'center'
    },
    searchText : {
      marginLeft:5,
        color:'white',
      ...FONTS.bold
    }
  })
