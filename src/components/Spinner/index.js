import React from 'react';
import { ActivityIndicator } from 'react-native';


const Spinner = ({ size, color }) => {
    return <ActivityIndicator size={size || 'large'} color={color || 'gray'} />
}




export { Spinner };