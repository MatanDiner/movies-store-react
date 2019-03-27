import * as actionType from '../actions/actionType'

const initialState ={
    orders:null,
    searchOrders:null
}

const ordersReducer = (state=initialState,actions) =>{

switch(actions.type){
    case actionType.SET_ORDERS_SUCCESS:return setOrsersSuccess(state,actions);break;
    case actionType.SEARCH_ORDERS:return searchOrders(state,actions);break;
    default:return state;
}

}

const searchOrders = (state,actions) =>{
return{
    ...state,
    searchOrders:actions.orders
}
}

const setOrsersSuccess = (state,actions) =>{
    return{
       ...state,
       orders:actions.orders,
       searchOrders:actions.orders
    }
}

export default ordersReducer;