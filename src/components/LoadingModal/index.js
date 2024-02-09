import React from 'react';
import { View, Modal, Image, StyleSheet } from 'react-native';
import StyleConfig from '../../assets/style';
import AppImages from '../../assets/images';

const LoadingModal = ({ visible }) => {
    return <Modal
        visible={visible}
        transparent={true}
        style={styles.modal}
        onRequestClose={() => { }}
    >
        <View style={styles.container} >
            <Image
                source={AppImages.ic_loader}
                style={{width:StyleConfig.width*0.4, height:StyleConfig.width*0.4}}
            />
            {/*<Spinner color={COLORS.main} size={"large"} />*/}
        </View>
    </Modal>
}

export { LoadingModal };




const styles = StyleSheet.create({
    modal: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'center'
    },
})
