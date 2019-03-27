import axios from '../../order-axios'
import * as actionstype from './actionType'
import {removeFromCart} from './cart'

const addOrderStart = () =>{
  return{
    type:actionstype.ADD_ORDER_START
  }
}

const addOrderSuccess = () =>{
  return{
    type:actionstype.ADD_ORDER_SUCCESS
  }
}

const addOrderFail = () =>{
  return{
    type:actionstype.ADD_ORDER_Fail
  }
}


export const addOrder = (token,moviesDataId,movieId,order) =>{
    return dispatch=>{
     dispatch(addOrderStart()); 
    const queryParams ='?auth=' + token ;
    axios.post("/orders.json" + queryParams,order)
         .then(res=>{
            dispatch(removeFromCart(token,moviesDataId,movieId));
            dispatch(addOrderSuccess());
         })
         .catch(error=>{
           console.log(error);
           dispatch(addOrderFail());
         })
        }
}



export const setMovieCard = (movie) =>{

return {
type:actionstype.SET_MOVIE_CARD,
movie:movie
}
}

