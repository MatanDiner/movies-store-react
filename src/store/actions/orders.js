import axios from '../../order-axios'
import * as actionstype from './actionType'



export const searchOrders = (orders) =>{
    return{
        type:actionstype.SEARCH_ORDERS,
        orders:orders
    }
}


const setOrsersSuccess = (orders) =>{
    return{
         type:actionstype.SET_ORDERS_SUCCESS,
         orders:orders
    }
}

export const setOrders = (token,userId) =>{
   return dispatch=>{
    const queryParams ='?auth=' + token + '&orderBy="userId"&equalTo="'+ userId + '"';
       axios.get('orders.json' + queryParams)
            .then(response=>{
                if((response.data)){
                    const orders = [];
                    for(var key in response.data){
                      
                        orders.push(response.data[key]);
                    }
                    dispatch(setOrsersSuccess(orders));
                }
            })
            .catch(error=>{
                console.log(error);
            })
   }
}