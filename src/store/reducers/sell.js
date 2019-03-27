import * as actionType from '../actions/actionType'

const initialState = {
    movieCard:null,
    purchased:false,
    goBackToRedirectPath:null,
    purchasedError : false,
    loading:false
}

const sellReducer = (state = initialState,actions) =>{

switch(actions.type){

case actionType.SET_MOVIE_CARD:return setMovieCard(state,actions);break;
case actionType.ADD_ORDER_START:return addOrderStart(state,actions);break;
case actionType.ADD_ORDER_SUCCESS:return addOrderSuccess(state,actions);break;
case actionType.ADD_ORDER_Fail:return addOrderFail(state,actions);break;
default: return state;

}
}

const addOrderStart = (state,actions) =>{
    return{
        ...state,
        loading:true
    }
}


const addOrderSuccess = (state,actions) =>{
    return{
        ...state,
        purchased:true,
        loading:false,
        purchasedError : false,
        goBackToRedirectPath:'/'
    }
}

const addOrderFail = (state,actions) =>{
    return{
        ...state,
        purchased:false,
        loading:false,
        purchasedError:true
    }
}

const setMovieCard = (state,actions) =>{

return{
    ...state,
    movieCard:actions.movie
}

}


export default sellReducer;