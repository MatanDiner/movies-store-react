import React from 'react'
import NavigationItem from '../NavigationItem/NavigationItem'
import classes from './NavigationItems.css'

const navigationItems = (props) =>(
<ul className={classes.NavigationItems}>
{props.isAuthenticated?<NavigationItem link="/" exact>Home</NavigationItem>:null}
{props.isAuthenticated?<NavigationItem link="/Cart" >Cart</NavigationItem>:null}
{props.isAuthenticated?<NavigationItem link="/Orders" >Orders</NavigationItem>:null}
{props.isAuthenticated?<NavigationItem link="/ContactUs" >ContactUs</NavigationItem>:null}
{props.isAuthenticated?<NavigationItem link="/logout" >logout</NavigationItem>:null}
</ul>
)

export default navigationItems;
