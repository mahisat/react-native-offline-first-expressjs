import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import MainNavigation from './src/navigation/MainNavigation';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import {rootReducer} from './src/reducers';
import SplashScreen from 'react-native-splash-screen';
import ReduxThunk from 'redux-thunk';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {apiCallMiddleware} from './src/utils/api/apiCallMiddleware';
import {clearBodyMiddleware} from './src/utils/api/clearBodyMiddleware';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  {},
  compose(applyMiddleware(clearBodyMiddleware, apiCallMiddleware, ReduxThunk)),
);

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: '#9C51B6'}}>
        <PersistGate loading={null} persistor={persistor}>
          <MainNavigation />
        </PersistGate>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
