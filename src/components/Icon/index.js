import React, { Component } from 'react'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from "../../assets/fonts/icomoon/selection.json"

const Icomoon = createIconSetFromIcoMoon(icoMoonConfig);

export const Icon = (props) => {
    return <Icomoon {...props} />
}

