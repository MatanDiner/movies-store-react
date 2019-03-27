import React from 'react'

const search = (props) =>{

return(
    <div>
        <input type="text" 
        placeholder="Search..."
        value={props.value} 
        onChange = {(event)=>props.changed(event)}
        />
    </div>
)

}

export default search;
