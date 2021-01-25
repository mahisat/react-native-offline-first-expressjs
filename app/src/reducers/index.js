import {combineReducers} from 'redux';
import {HomeReducer} from './HomeReducer';
import {SettingsReducer} from './SettingsReducer';
import QuotesReducer from './QuotesReducer';

const appReducer = combineReducers({
  HomeReducer: HomeReducer,
  SettingsReducer: SettingsReducer,
  QuotesReducer: QuotesReducer,
});

export const rootReducer = (state, action) => {
  return appReducer(state, action);
};
