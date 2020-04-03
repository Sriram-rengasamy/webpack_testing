import {ADD_PRODUCT, LOAD_CART, REMOVE_CART, CHANGE_PRODUCT_QUANTITY} from './actionTypes';

const initialState = {
    products : []
}

export default function(state = initialState, action){
    switch(action.type) {
        case LOAD_CART:
            return {
                ...state, 
                products : action.payload
            };
        case ADD_PRODUCT : 
            return {
                ...state, 
               productToAdd : { ...action.payload } 
            };
        case REMOVE_CART :
            return {
                ...state, 
                productToRemove : { ...action.payload}
            };
        case CHANGE_PRODUCT_QUANTITY:
            return {
                ...state,
                productToChange: Object.assign({}, action.payload)
            };            
        default:
            return state;
    }
}