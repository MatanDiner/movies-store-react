import React, { Component } from 'react'
import classes from './Card.css'
class Card extends Component {


    state = {
        disabled: false,
        show_Personal_Details:false,
    }

    clickedHandler = () => {
        this.setState({
            disabled: true,
        })
    }


    Personal_Details_Clicked = () =>{
        this.setState((prevState)=>{
            return{
                show_Personal_Details:!prevState.show_Personal_Details
            }
        })
    }


    render() {

        let card = null;

        if (this.props.card) {
            const page = this.props.page;
            let cardObj = null;
            let privateDetails = null;
            let userDetails = null;
            if (page === 'orders') {
                cardObj = { ...this.props.card.movieDetails };
                privateDetails = { ...this.props.card.privateDetails };
            }
            else {
                cardObj = { ...this.props.card };
            }

            let arr = [];

            const movieCard = {

                Name: cardObj["Name"],
                Genre: cardObj["Genre"],
                Year: cardObj["Year"],
                Time: cardObj["Runtime"],
                Director: cardObj["Director"],
                //Price: cardObj["Price"]
            }

            for (let key in movieCard) {

                arr.push({
                    content: movieCard[key],
                    subject: key
                })

            }

            if (privateDetails) {

                const userDetails_Arr = [];
                for (let key in privateDetails) {
                    userDetails_Arr.push({
                        value: privateDetails[key],
                        identifier: key
                    })
                }
                let PersonalDetails_class = null;
                const Personal_Details_classes = [classes.PersonalDetails_hide,classes.PersonalDetails_show];
                PersonalDetails_class = Personal_Details_classes[0];

                if(this.state.show_Personal_Details){
                    PersonalDetails_class = Personal_Details_classes.join(" ");
                }

                userDetails = (
                    <div className={classes.PersonalDetails_Div}>
                        <div>
                            <h4 className={classes.PersonalDetails_title} onClick={this.Personal_Details_Clicked}>Personal Details</h4>
                        </div>
                        <div className={PersonalDetails_class}>
                            <table>
                                <tbody>{
                                    userDetails_Arr.map(Details => {
                                        return <tr key={Details.identifier}>
                                            <td>{Details.identifier}</td>
                                            <td>{Details.value}</td>
                                        </tr>
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>

                );
            }


            let disabled = false;
            const classesArr = [classes.addBtn, classes.inCartBtn];
            let classBtn = classesArr[0];
            if (this.state.disabled || cardObj.cart) {
                disabled = true;
                classBtn = classesArr.join(" ");
            }
           

            card = (
                <div className={classes.Card} >
                    <div className={classes.tableDiv}>
                        <table>
                            <tbody>
                                <tr>
                                    <td colSpan="2"><img className={classes.img} src={require('../../../assets/images/' + cardObj.img + '.jpg')} /></td>
                                </tr>
                                {(page === "home" || page === "cart") ?
                                    <tr>
                                        <td colSpan="2">{page === "home" ? <button className={classBtn}
                                            disabled={disabled}
                                            onClick={() => { this.props.addToCartClicked(cardObj.id); this.clickedHandler() }}></button>
                                            : <button className={classes.removeBtn} onClick={() => this.props.removedClicked(cardObj.id)}>Remove</button>}</td>
                                    </tr>
                                    : null
                                }
                                {arr.map((Item, Index) => {

                                    return <tr key={Index}>
                                        <td>{Item.subject}:</td>
                                        <td>{Item.content}</td>
                                    </tr>
                                })}
                                {
                                    (page === "orders" || page === "sell") ?
                                        <tr>
                                            <td>Price</td>
                                            <td>{cardObj["Price"]}</td>
                                        </tr>
                                        :
                                        <tr>
                                            <td><div>{cardObj["Price"]}</div></td>
                                            <td><div><button className={classes.buyBtn} onClick={() => this.props.buyClicked(cardObj)}>Buy</button></div></td>
                                        </tr>
                                }


                            </tbody>
                        </table>
                    </div>
                    {userDetails}
                </div>
            )

        }



        return card;


    }

}


export default Card