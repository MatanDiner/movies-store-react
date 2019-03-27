import * as actionType from './actionType'
import axios from '../../order-axios'

export const authStart = () =>{
  return{
        type:actionType.AUTH_START
  };
    
};
      
    

export const authSuccess = (idToken,userId,isSignUp) =>{
  return{
    type:actionType.AUTH_SUCCESS,
    idToken:idToken,
    userId:userId,
    isSignUp:isSignUp
  };

}

export const authFail = (error) =>{
  return{
    type:actionType.AUTH_FAIL,
    error:error
  };

}

export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return{
        type:actionType.AUTH_LOGOUT
    }
}

const checkAuthTimeOut = (expireTime) =>{
return dispatch=>{
    setTimeout(()=>{
        dispatch(logout());
    },expireTime*1000
    );
    
}

}


const createItemsForUser = (token,userId) =>{
  return dispatch=>{
 
    axios.get('movies.json')
    .then(response=>{
          const obj = {
            data:response.data,
            userId:userId
          }
          axios.post('/moviesJSON.json?auth='+ token,obj)
               .then(response=>{
              
               })
               .catch(error=>{
                 console.log(error);
               })
    }
    )
    .catch(error=>{
        console.log(error);
    })
 
  }
}

export const auth = (email,password,isSignUp) =>{
  return dispatch=>{
      dispatch(authStart());
      const authData = {
          email:email,
          password:password,
          token:"",
          returnSecureToken:true
      }
      let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD2v-eGSPa_xpt83-8wkxEExiRLSC8eV3k';
      if(!isSignUp){
          url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD2v-eGSPa_xpt83-8wkxEExiRLSC8eV3k';
      }
      axios.post(url,authData)
           .then(response=>{
               const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
               localStorage.setItem('token',response.data.idToken);
               localStorage.setItem('userId',response.data.localId);
               localStorage.setItem('expirationDate',expirationDate);
               dispatch(authSuccess(response.data.idToken,response.data.localId,isSignUp));
               if(isSignUp){
                dispatch(createItemsForUser(response.data.idToken,response.data.localId));
               }
               dispatch(checkAuthTimeOut(response.data.expiresIn));
           })
           .catch(err=>{
              dispatch(authFail(err.response.data.error)); 
           })
  }   

}


export const setAuthRedirectPath = (path) =>{
    return{
        type:actionType.SET_AUTH_REDIRECT_PATH,
        path:path
    };

}


export const authCheckState = () =>{
return dispatch=>{
  const token = localStorage.getItem('token');
  if(!token){
      dispatch(logout());
  }
  else{
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if(expirationDate <= new Date()){
      dispatch(logout());
    } 
    else{
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token,userId));
        dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime())/1000));
    }
  }
}



}




