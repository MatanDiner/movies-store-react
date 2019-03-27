import * as actionType from '../actions/actionType'

const InitialState = {

    movies:null,
    searchMovies:null,
    moviesDataId:null
}

const moviesReducer = (state=InitialState,actions) =>{

switch(actions.type){

case actionType.SET_MOVIES_SUCCESS:return setMoviesSuccess(state,actions);break;
case actionType.SEARCH_MOVIES:return SearchMovies(state,actions);break;
default:return state ; break;



}

}

const SearchMovies = (state,actions) =>{
    return{
        ...state,
        searchMovies:actions.movies
    }
}

const setMoviesSuccess = (state,actions) =>{
return{
    ...state,
    movies:actions.data,
    searchMovies:actions.data,
    moviesDataId:actions.moviesDataId
}
}


export default moviesReducer;