import {compose, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer  from './reducers';

export default (intialState) => {
    intialState =
        JSON.parse(window.localStorage.getItem('state')) || intialState;
    const middleware = [thunk];

    const store = createStore(
        rootReducer, 
        intialState, 
        compose(
            applyMiddleware(...middleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
                window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );

    store.subscribe(() =>{
        const state = store.getState();

        const persist = {
            cart : state.cart,
            total : state.total
        };

        window.localStorage.setItem('state', JSON.stringify(persist));

    });


    return store;
}
