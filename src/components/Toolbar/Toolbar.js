import React from 'react'
import Logo from '../Logo/Logo'
import NavigationItems from '../Navigation/NavigatioItems/NavigationItems'
import classes from './Toolbar.css'
import DrawToggle from '../SideDrawer/DrawToggle/DrawToggle'
const toolbar = (props) =>{

return (

<div className={classes.Toolbar}>
{props.isAuthenticated?<DrawToggle clicked={props.drawerToggleClicked}/> : null}
<div className={classes.Logo}>
<Logo/>
</div>
<nav className={classes.DesktopOnly}>
<NavigationItems isAuthenticated={props.isAuthenticated}/>
</nav>

</div>

)

}

export default toolbar;
