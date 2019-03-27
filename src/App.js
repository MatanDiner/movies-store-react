import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout/Layout'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Auth from './container/Auth/Auth'
import Logout from './container/Auth/Logout/Logout'
import Movies from './container/Movies/Movies'
import * as action from './store/actions/index'
import Cart from './container/Cart/Cart'
import Sell from './container/Sell/Sell'
import Orders from './container/Orders/Orders'
import ContactUs from './container/ContactUs/ContactUs'
class App extends Component {


  componentDidMount(){
    this.props.onTryAutoSiunUp();
     }

  render() {
    let routes = null;
     
      routes = (<Switch>
       <Route path="/Auth" component={Auth} />
       <Redirect to="/Auth"/>
      </Switch>
      )

    
      if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/ContactUs" component={ContactUs} />
           <Route path="/Orders" component={Orders} />
          <Route path="/Sell" component={Sell} />
          <Route path="/Cart" component={Cart} />
          <Route path="/Auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={Movies} />
        </Switch>
      )

    }

    return (
      <div>
        <Layout isAuthenticated={this.props.isAuthenticated}>{routes}</Layout>
      </div>
    );
  }
}


const mapStateToProps = state =>{
  return{
    isAuthenticated : state.auth.token !== null,
    isSignUp:state.auth.isSignUp
  };
}

const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSiunUp : ()=>dispatch(action.authCheckState())
  };
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App))
