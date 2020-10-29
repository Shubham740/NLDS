import * as Actions from '../actions/types';

const initialState = {
    count: 0
    };

const HomeReducer = (state = initialState,action) => {
    switch (action.type){
        case Actions.COUNTER_INCREMENT:
            //console.log("hi4")
            return {
                count: state.count + 1
            };
        case Actions.COUNTER_DECREMENT:
            return {
                count: state.count - 1
            };
        default:
            return state;
    }
}
export default HomeReducer;