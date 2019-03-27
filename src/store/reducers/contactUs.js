import * as actionsType from '../actions/actionType'

const initialState = {
    isContact:false
  }

  const contactUsReducr = (state = initialState,action) =>{
  
   switch(action.type){

    case actionsType.ADD_CONTACT_SUCCESS:return addContactSuccess(state,action);
    case actionsType.SHOW_FORM:return showForm(state,action);
    default : return state;
   }
  }

  const showForm = (state,action) =>{
    return{
        ...state,
         isContact:false
    }
    }

const addContactSuccess = (state,action) =>{
return{
    ...state,
     isContact:true
}
}

export default contactUsReducr;