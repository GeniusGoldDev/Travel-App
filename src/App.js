

import React  from 'react';
import {I18nManager} from 'react-native';
import { PersistGate } from "redux-persist/integration/react"
import { Provider } from "react-redux";
import {store, persistor} from "./redux/store";
import MainApp from './MainApp';
I18nManager.forceRTL(true);
const App = () => {
    return (
    <Provider store={store} >
      <PersistGate persistor={persistor} loading={null} >
        <MainApp />
      </PersistGate>
    </Provider>
  );
};


export default App;
