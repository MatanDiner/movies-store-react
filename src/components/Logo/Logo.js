import React from 'react'
import moviesStoreLogo from '../../assets/images/logo.png'
import classes from './Logo.css'
const logo = (props) =>(

<div className={classes.Logo}>
<img src={moviesStoreLogo}/>
</div>

)

export default logo;