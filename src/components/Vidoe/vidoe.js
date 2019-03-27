import React from 'react'
import classes from './Vidoe.css'
const vidoe = (props) =>{
const src = `https://www.youtube.com/embed/${props.youtubeId}` 
return <div>
    <iframe className={classes.vidoe}
    src= {src} 
    frameBorder="0" 
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen></iframe>
</div>

}

export default vidoe;

