import { FETCH_PRODUCTS } from './actionTypes';

import axios from 'axios';
import { productsAPI } from '../utils';

export const fetchProducts = (filters, sortBy, callback) => {
    return function(dispatch) {
        return axios
                .get(productsAPI)
                .then(res => {
                      let {products} = res.data;  
                      return dispatch({
                          type : FETCH_PRODUCTS,
                          payload : products
                      });
                })
                .catch(err => console.log('Could not fetch products. Try again later'));
    }
}