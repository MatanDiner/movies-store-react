import React,{Component} from 'react'
import Aux from '../../hoc/Aux'
import Toolbar from '../Toolbar/Toolbar'
import SideDrawer from '../SideDrawer/SideDrawer.js'
import classes from './Layout.css'

class Layout extends Component{

state = {
    showSideDrawer:false
}

closeSideDrawHandler = () =>{
this.setState({showSideDrawer:false});
}

SideDrawerToggleHandler = () =>{
    this.setState((prevState)=>{
       return {showSideDrawer:!prevState.showSideDrawer}
    })
}

render(){
    let showNavigations = false;
    if(!this.props.isSignUp && this.props.isAuthenticated){
        showNavigations = true;
    }
return(
<Aux>
    <div>
       <Toolbar isAuthenticated={this.props.isAuthenticated} drawerToggleClicked={this.SideDrawerToggleHandler}/>
       <SideDrawer isAuthenticated={this.props.isAuthenticated} open={this.state.showSideDrawer} closed ={this.closeSideDrawHandler}/>
    </div>
    <main className={classes.Content}>
        {this.props.children}
    </main>
</Aux> 
);
}

}




export default Layout;