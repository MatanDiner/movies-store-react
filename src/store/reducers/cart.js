import * as actionType from '../actions/actionType'

const initialState = {

    cartMovies:null,
    searchCartMovies:null
}

const cartReducer = (state=initialState,actions) =>{

switch(actions.type){

case actionType.SET_CART_SUCCESS : return setCartSuccess(state,actions);break;
case actionType.SEARCH_CART_MOVIES:return SearchCartMovies(state,actions);break;
default : return state;

}

}

const SearchCartMovies = (state,actions) =>{
    return{
       ...state,
       searchCartMovies:actions.movies
    }
}


const setCartSuccess = (state,actions) =>{
    return{
        ...state,
        cartMovies:actions.cartMovies,
        searchCartMovies:actions.cartMovies
    }
}


export default cartReducer;