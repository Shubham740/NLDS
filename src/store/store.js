import rootReducer from '../reducers/reducers'
import { createStore } from 'redux';

let store = createStore(rootReducer);

export default store;

