import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loadProduct, removeProduct, changeProductQuantity} from '../../services/cart/actions';
import { updateCart } from '../../services/total/actions';
import CartProduct from './cartProduct';
import { formatPrice } from '../../services/utils';

import './style.scss';

class FloatCart extends Component {

    static propTypes = {
        loadProduct: PropTypes.func.isRequired,
        cartProducts : PropTypes.array.isRequired,
        newProduct: PropTypes.object,
        removeProduct: PropTypes.func,
        productToRemove: PropTypes.object,
        updateCart: PropTypes.func.isRequired
    }

    state = {
        isOpen : false
    };

    componentWillReceiveProps(nextProps){
        if(nextProps.newProduct !== this.props.newProduct){
            this.addProduct(nextProps.newProduct);
        }

        if(nextProps.productToRemove !== this.props.productToRemove){
            this.removeProduct(nextProps.productToRemove);
        }

        if (nextProps.productToChange !== this.props.productToChange) {
            this.changeProductQuantity(nextProps.productToChange);
        }        
    }

    openFloatCart = () => {
        this.setState({isOpen: true});
    }

    closeFloatCart = () => {
        this.setState({isOpen: false});
    }

    addProduct = product => {
        const {cartProducts, updateCart } = this.props;
        let productAlreadyInCart = false;

        cartProducts.forEach(cp => {
            if(cp.id === product.id){
                cp.quantity += product.quantity;
                productAlreadyInCart = true;
            }
        });

        if(!productAlreadyInCart){
            cartProducts.push(product);
        }

        updateCart(cartProducts);
        this.openFloatCart();
    }

    removeProduct = product => {
        const { cartProducts, updateCart } = this.props;
    
        const index = cartProducts.findIndex(p => p.id === product.id);
        if (index >= 0) {
          cartProducts.splice(index, 1);
          updateCart(cartProducts);
        }
      };
    
    changeProductQuantity = changedProduct => {
        const {cartProducts, updateCart} = this.props;
        const product = cartProducts.find(p => p.id === changedProduct.id);
        product.quantity = changedProduct.quantity;
        if(product.quantity <=0 )
            this.removeProduct(product);
        updateCart(cartProducts);
    }

    render(){
        const {cartProducts, removeProduct, cartTotal, changeProductQuantity} = this.props;

        const products =cartProducts.map( p => {
            return (
                <CartProduct product={p} removeProduct={removeProduct} key={p.id} changeProductQuantity ={changeProductQuantity}/>
            )
        })

        let classes = ['float-cart'];

        if(!!this.state.isOpen){
            classes.push('float-cart--open');
        }

        return (
            <div className={classes.join(' ' )}>
                 {/* If cart open, show close (x) button */}
                {this.state.isOpen && (
                    <div 
                        className="float-cart__close-btn"
                        onClick={() => this.closeFloatCart()}
                    > 
                     X
                    </div>
                )}
                {/* If cart is closed, show bag with quantity of product and open cart action */}
                {!this.state.isOpen && (
                    <span className="bag bag--float-cart-closed" 
                    onClick = {() => this.openFloatCart() }
                    >
                      <span className="bag__quantity">{cartTotal.productQuantity}</span>  
                    </span>
                    )
                }
                <div className="float-cart__content">
                    <div className="float-cart__header">
                        <span className="bag">
                            <span className="bag__quantity">
                            {cartTotal.productQuantity}
                            </span>
                      </span>
                      <span className="header-title">
                          Cart
                      </span>
                    </div>
                    <div className="float-cart__shelf-container">
                        {products}
                        {!products.length && (
                            <p className="shelf-empty">
                                Add some products in cart 
                            </p>
                        )}
                    </div>
                    <div className="float-cart__footer">
                        <div className="sub">
                            SUBTOTAL
                        </div>
                        <div className="sub-price">
                            <p className="sub-price__val">
                                {`${cartTotal.currencyFormat} ${formatPrice(
                                cartTotal.totalPrice,
                                cartTotal.currencyId
                                )}`}
                            </p>
                            <small className="sub-price__installment">
                                {!!cartTotal.installments && (
                                <span>
                                        {`OR UP TO ${cartTotal.installments} x ${
                                            cartTotal.currencyFormat
                                            } ${formatPrice(
                                                cartTotal.totalPrice / cartTotal.installments,
                                                cartTotal.currencyId
                                            )}`}
                                </span>
                                )}
                            </small>
                        </div>
                        <div className="buy-btn">
                            Checkout
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    cartProducts : state.cart.products,
    newProduct: state.cart.productToAdd,
    productToRemove: state.cart.productToRemove,
    cartTotal: state.total.data
});

export default connect(
    mapStateToProps, 
    {loadProduct, removeProduct, updateCart, changeProductQuantity}
)(FloatCart);