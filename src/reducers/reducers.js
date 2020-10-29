import { combineReducers } from 'redux';
import HomeReducer from './HomeReducer';
import CartReducer from './CartReducer';

const AppReducers = combineReducers({
  hmr : HomeReducer,
  crt : CartReducer
});

const rootReducer = (state, action) => {
  //console.log("hi3")
	return AppReducers(state,action);
}

export default rootReducer