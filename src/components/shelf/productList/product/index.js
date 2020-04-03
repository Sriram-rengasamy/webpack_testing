import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {addProduct} from '../../../../services/cart/actions';
import { formatPrice } from '../../../../services/utils';

import Thumb from '../../../thumb';

const Product = ({ product, addProduct }) => {
    product.quantity = 1;
    let formattedPrice = formatPrice(product.price, product.currencyId);
    let productInstallment;

    if(!!product.installments){
        const installmentPrice = product.price / product.installments;

        productInstallment = (
            <div className="installment">
                <span>or {product.installments} x</span>
                <b>
                    {product.currencyFormat}
                    {formatPrice(installmentPrice, product.currencyId)}
                </b>

            </div>
        );
    }
    return (
    <div className="shelf-item"
        onClick={() => addProduct(product)}
        data-sku = {product.sku}
    >
        {product.isFreeShipping && (
                <div className="shelf-stopper">Free Shipping</div>
            )}
        <Thumb classes="shelf-item__thumb" 
               src={require(`../../../../static/products/${product.sku}_1.jpg`).default} 
        />
        <p className="shelf-item__title">{product.title}</p>
        <div className="shelf-item__price">
            <div className="val">
                <small>{product.currencyFormat}</small>
                <b>{formattedPrice.substr(0, formattedPrice.length - 3)}</b>
                <span>{formattedPrice.substr(formattedPrice.length - 3)}</span>
            </div>
            {productInstallment}
        </div>
        <div className="shelf-item__buy-btn">Add to Cart</div>
    </div>
    );
}

Product.propTypes = {
    product: PropTypes.object.isRequired
}
export default connect(
    null
   , { addProduct }
)(Product);