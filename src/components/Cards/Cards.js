import React, { Component } from 'react'
import Card from './Card/Card'


const cards = (props) =>{

        let Cards = null;

        if (props.cards) {

            Cards = props.cards.map((card,Index) => <Card key={Index}
                                                  card={card} 
                                                  page={props.page} 
                                                  addToCartClicked = {props.addToCartClicked}
                                                  buyClicked = {props.buyClicked}
                                                  removedClicked = {props.removedClicked}
                                                  />)


        }

        return (
            <div>
                {Cards}
            </div>
        )
    }




export default cards