import React from 'react'
import Logo from '../Logo/Logo'
import NavigationItems from '../Navigation/NavigatioItems/NavigationItems'
import Aux from '../../hoc/Aux'
import classes from './SideDrawer.css'
import Backdrop from '../UI/Backdrop/Backdrop'

const sideDrawer = (props) =>{

let attachedClasses = [classes.SideDrawer,classes.Close];
if(props.open){
    attachedClasses = [classes.SideDrawer,classes.Open];
}

return(
<Aux>
<Backdrop show={props.open} clicked={props.closed}/>
<div className={attachedClasses.join(' ')} onClick = {props.closed}>
<div className={classes.Logo}> 
 <Logo/>
</div>
    <nav>
    <NavigationItems isAuthenticated={props.isAuthenticated}/>
    </nav>

</div>

</Aux>
);

};

export default sideDrawer;