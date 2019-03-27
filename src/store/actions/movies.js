import axios from '../../order-axios'
import * as actionstype from './actionType'


export const SearchMovies = (movies) =>{
    return{
        type:actionstype.SEARCH_MOVIES,
        movies:movies
    }
}


const setMoviesSuccess = (moviesDataId,data) =>{
    return{
        type:actionstype.SET_MOVIES_SUCCESS,
        moviesDataId:moviesDataId,
        data:data
    }
}


export const setMovies = (token,userId) =>{

return dispatch =>{
const queryParams ='?auth=' + token + '&orderBy="userId"&equalTo="'+ userId + '"';
axios.get('moviesJSON.json' + queryParams)
     .then(response=>{
         const dataArr = [];
         for(let key in response.data){
           dataArr.push({
               ...response.data[key],
               id:key
           })
         }
        const data = [];
        for(let key in dataArr[0]["data"]){
            data.push({
                ...dataArr[0]["data"][key]
            })
        }
         dispatch(setMoviesSuccess(dataArr[0]["id"],data))
     })
      .catch(error=>{
          console.log(error);
      })

}
}