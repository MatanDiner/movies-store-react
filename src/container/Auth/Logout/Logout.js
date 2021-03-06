import React,{Component} from 'react'
import * as action from '../../../store/actions/index'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class Logout extends Component{

componentDidMount(){
    this.props.onLogout();
}

render(){
    return <Redirect to="/Auth"/>;
}

}

const mapDispatchToProps = dispatch=>{
return{
    onLogout : ()=>dispatch(action.logout())
};

}

export default connect(null,mapDispatchToProps)(Logout); 
