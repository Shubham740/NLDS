import * as Actions from '../actions/types';

const initialState = {
    cart : {}
};

const CartReducer = (state = initialState,action) => {
     let data = action.data;
    switch (action.type){
        case Actions.CART_ADD_ITEM:
            let newCart = {...state.cart}
            newCart[data[0]] = {"quantity":data[1],"price":data[2],"image":data[3],"name":data[4],"mrp":data[5]}
            return {
                cart : newCart
            };
        case Actions.CART_REMOVE_ITEM:
            let y = {...state.cart}
            delete y[data[0]];
            return {
                cart : y
            };
        case Actions.CART_UPDATE_INCREMENT:
            let z = { ...state.cart }
            let ones = parseInt(z[data[0]].price) / parseInt(z[data[0]].quantity);
            let onem = parseInt(z[data[0]].mrp) / parseInt(z[data[0]].quantity);
            z[data[0]].quantity = z[data[0]].quantity + 1;
            z[data[0]].price = ones * z[data[0]].quantity;
            z[data[0]].mrp = onem * z[data[0]].quantity;
            return {
                cart: z
            };
        case Actions.CART_UPDATE_DECREMENT:
            let x = { ...state.cart }
            let twos = parseInt(x[data[0]].price) / parseInt(x[data[0]].quantity);
            let twom = parseInt(x[data[0]].mrp) / parseInt(x[data[0]].quantity);
            x[data[0]].quantity = x[data[0]].quantity - 1;
            x[data[0]].price = twos * x[data[0]].quantity;
            x[data[0]].mrp = twom * x[data[0]].quantity;
            return {
                cart: x
            };
        default:
            return state;
    }
}
export default CartReducer;