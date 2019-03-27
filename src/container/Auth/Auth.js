import React,{Component} from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.css'
import {connect} from 'react-redux'
import * as action from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import {Redirect} from 'react-router-dom'

class Auth extends Component{

state = {

controls:{
    email:{

        elementType:'input',
        elementConfig:{
              type:'email',
              placeholder:'mail address'
     },
     value:'',
     validation:{
         required:true,
         email:true
     },
     valid:false,
     touched:false
    },

    password:{
        elementType:'input',
        elementConfig:{
              type:'password',
              placeholder:'password'
     },
     value:'',
     validation:{
         required:true,
         minLength:6
     },
     valid:false,
     touched:false
    }
    },
    isSignUp:true
}

checkValidation(value,rules){

    if(!rules){
        return;
    }

    let isValid = true;
    if(rules.required){
        isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLength){
        isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength){
        isValid = value.length <= rules.maxLength && isValid;
    }

    if(rules.email){
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isValid = re.test(String(value).toLowerCase()) && isValid;
    }

    return isValid;
    }



    componentDidMount(){
       /* if(this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }*/
    }


    inputChangeHandler = (event,elementName) =>{

        const controls = {
            ...this.state.controls,
            [elementName] : {
                ...this.state.controls[elementName],
                value : event.target.value,
                valid : this.checkValidation(event.target.value,this.state.controls[elementName].validation),
                touched : true
            }            
        };
    
        this.setState({controls:controls})
    
    }


    SbmitHandler = (event) =>{
        event.preventDefault(); 
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
    }


    switchAuthModeHandler = () =>{
        this.setState(prevState=>{
           return {isSignUp:!prevState.isSignUp}
        })
    }


render(){

    const formArray = [];
    for(let key in this.state.controls){

        formArray.push({
          id:key,
          formElement:this.state.controls[key]
        });
    }

    let form = formArray.map(element=>{

       return <Input key = {element.id}
               elementType={element.formElement.elementType}
               elementConfig = {element.formElement.elementConfig}
               value = {element.formElement.value}
               isValid = {element.formElement.valid}
               shouldValid = {element.formElement.validation}
               touched = {element.formElement.touched}
               changed = {(event)=>this.inputChangeHandler(event,element.id)}
        />

       })  

       if(this.props.loading){
           form = <Spinner/>;
       }

       let errorMessage =null;
       if(this.props.error){
           errorMessage = <p style={{color:"red"}}>{this.props.error.message}</p>
       }

       let authRedirect = null;
       if(this.props.isAuthenticated && !this.props.isSignUp){
         authRedirect = <Redirect to={this.props.authRedirectPath}/>
       }

    return(
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={this.SbmitHandler}>
               {form}
               <Button btnType="Success">SUBMIT</Button>
            </form>
               <Button
               clicked = {this.switchAuthModeHandler}
               btnType="Danger">SWITCH TO {this.state.isSignUp?'SIGNIN':'SIGNUP'} </Button>
        </div>
    );
}


}


const mapStateToProps = state =>{
    return{
        loading : state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token !== null,
        authRedirectPath:state.auth.authRedirectPath,
        isSignUp:state.auth.isSignUp
    };
}

const mapDispatchToProps = dispatch =>{

  return{
      onAuth : (email,password,isSignUp) => dispatch(action.auth(email,password,isSignUp)),
      onSetAuthRedirectPath : ()=>dispatch(action.setAuthRedirectPath('/'))
  };

}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);