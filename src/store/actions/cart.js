import * as actionType from './actionType'
import axios from '../../order-axios'


export const SearchCartMovies = (movies) =>{
    return{
        type:actionType.SEARCH_CART_MOVIES,
        movies:movies
    }
}


export const removeFromCart = (token,moviesDataId,movieId) =>{

    return dispatch=>{

        axios.put(`moviesJSON/${moviesDataId}/data/m${movieId}/cart.json?auth=${token}`,false)
             .then(response=>{
                dispatch(setCartMovies(token,moviesDataId));
             })
             .catch(error=>{
                console.log(error);
             })
    }
}


const setCartMoviesSuccess = (data) =>{
    return{
        type:actionType.SET_CART_SUCCESS,
        cartMovies:data
    }
}

export const setCartMovies = (token,moviesDataId) =>{

return dispatch=>{
const queryParams ='?auth=' + token ;
axios.get('moviesJSON/' + moviesDataId + '/data.json'+ queryParams )
     .then(response=>{
         let data = null;
         if(response.data){
             data = [];
         for(let key in response.data){
             if(response.data[key].cart){
                 data.push(response.data[key]);
             }
         }
        }
         dispatch(setCartMoviesSuccess(data));
     })
      .catch(error=>{
          console.log(error)
      })

}
}






export const addToCart = (token,moviesDataId,movieId) =>{

return dispatch=>{

const queryParams ='?auth=' + token ;    
axios.put('moviesJSON/' + moviesDataId + '/data/m' +movieId+ '/cart.json' + queryParams,true)
      .then(response=>{
          console.log(response);
      })
      .catch(error=>{
          console.log(error);
      })
}

}