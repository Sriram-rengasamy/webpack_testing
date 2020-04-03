import {LOAD_CART, ADD_PRODUCT, REMOVE_CART, CHANGE_PRODUCT_QUANTITY} from './actionTypes';

export const loadProduct = (products) => ({
    type : LOAD_CART,
    payload : products
});

export const addProduct = (product) => ({
    type: ADD_PRODUCT,
    payload : product
});

export const removeProduct = (product) => ({
    type: REMOVE_CART,
    payload : product
})

export const changeProductQuantity = (product) => ({
    type: CHANGE_PRODUCT_QUANTITY,
    payload : product
})
