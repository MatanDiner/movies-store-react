import * as actionType from './actionType'
import axios from '../../order-axios'


export const showForm = () =>{
    return{
        type:actionType.SHOW_FORM
    }
}

const addContactSuccess = (contact) =>{
    return{
        type:actionType.ADD_CONTACT_SUCCESS,
        contact:contact
    }
}


export const addContact = (contact,token) =>{
return dispatch=>{
axios.post('/contactUs.json?auth=' + token,contact)
      .then(response=>{
          dispatch(addContactSuccess(contact));
      })
      .catch(error=>{
          console.log(error);
      })
    }
}