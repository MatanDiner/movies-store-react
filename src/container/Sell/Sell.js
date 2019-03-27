import React, { Component } from 'react'
import Cards from '../../components/Cards/Cards'
import { connect } from 'react-redux'
import * as action from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../order-axios'
import withError from '../../WithErrorHandler/WithErrorHandler'
import Input from '../../components/UI/Input/Input'
import classes from './Sell.css'
import Video from '../../components/Vidoe/vidoe'
import { Redirect } from 'react-router-dom'
import Button from '../../components/UI/Button/Button'

class Sell extends Component {

    state = {

        form: {
            Name: {

                elementType: "input",
                value: "",
                elementConfig: {
                    type: "text",
                    placeholder: "Name"
                },
                validation: {
                    requierd: true
                },
                isValid: false,
                touched: false
            },
            Email: {

                elementType: "input",
                value: "",
                elementConfig: {
                    type: "email",
                    placeholder: "Email"
                },
                validation: {
                    requierd: true
                },
                isValid: false,
                touched: false
            },
            Card: {

                elementType: "input",
                value: "",
                elementConfig: {
                    type: "text",
                    placeholder: "Card Number"
                },
                validation: {
                    requierd: true,
                    maxLength: 16
                },
                isValid: false,
                touched: false
            }
        },
        formIsValid: false
    }


    checkValidation = (rules, value) => {

        let isValid = true;
        if (rules.requierd) {
            isValid = value.trim() !== "" && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        return isValid;
    }

    changedHandler = (event, identifier) => {
        const form = { ...this.state.form };
        const formEl = { ...form[identifier] };
        formEl.value = event.target.value;
        formEl.touched = true;
        formEl.isValid = this.checkValidation(formEl.validation, event.target.value);
        form[identifier] = formEl;
        let formIsValid = true;
        for (let i in form) {
            formIsValid = form[i].isValid && formIsValid;
        }
        this.setState({
            form: form,
            formIsValid: formIsValid
        })

    }

    submitForm = (event) => {
        event.preventDefault();
        const form = { ...this.state.form };
        const privateDetails = {};
        for (let key in form) {
            privateDetails[key] = form[key].value;
        }
        const movieId = this.props.movie.id;
        const orderDetails = {
            movieDetails: this.props.movie,
            privateDetails: privateDetails,
            userId: this.props.userId
        }
        this.props.onSubmitForm(this.props.token, this.props.moviesDataId, movieId, orderDetails);
    }

    render() {
        let sell = <Spinner />
        let form = null;
        let card = null;
        let vidoe = null;
        if (this.props.movie) {
            const movie = [];
            movie.push(this.props.movie);
            card = <div className={classes.cardDiv}>
                <Cards cards={movie} page="sell" />
            </div>

            vidoe = <div className={classes.vidoeDiv}>
                <Video youtubeId={this.props.movie.youtubeId} />
            </div>

            const formElementsArr = [];
            for (let key in this.state.form) {
                formElementsArr.push({
                    element: this.state.form[key],
                    id: key
                })
            }

            let errorMessage = null;
            if (this.props.purchasedError) {
                errorMessage = <label style={{ color: "red" }}>
                    There was an Error,please try again later.
                </label>
            }

            form = (
                <div className={classes.formDiv}>
                    <form onSubmit={this.submitForm}>
                        <div className={classes.elementsDiv}>
                            {formElementsArr.map(formElement => {
                                return <Input key={formElement.id}
                                    elementType={formElement.element.elementType}
                                    elementConfig={formElement.element.elementConfig}
                                    value={formElement.element.value}
                                    touched={formElement.element.touched}
                                    shouldValid={formElement.element.validation}
                                    isValid={formElement.element.isValid}
                                    changed={(event) => this.changedHandler(event, formElement.id)}
                                />
                            })
                            }
                            <div className={classes.buttonDiv}>
                                <Button disabled={!this.state.formIsValid} btnType="Success">Submit</Button>
                            </div>
                            {errorMessage}
                        </div>
                    </form>
                </div>
            )

            if (this.props.loading) {
                form = <div className={classes.formDiv}><Spinner/></div>;
            }
            let reDirect = null;
            if (this.props.purchased && this.props.goBackToRedirectPath) {
                reDirect = <Redirect to={this.props.goBackToRedirectPath} />
            }

            sell = (
                <div>
                    {card}
                    {vidoe}
                    {form}
                    {reDirect}
                </div>
            )
        }

        return sell;

    }

}


const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        movie: state.sell.movieCard,
        moviesDataId: state.movies.moviesDataId,
        loading: state.sell.loading,
        purchased: state.sell.purchased,
        goBackToRedirectPath: state.sell.goBackToRedirectPath,
        purchasedError: state.sell.purchasedError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitForm: (token, moviesDataId, movieId, order) => dispatch(action.addOrder(token, moviesDataId, movieId, order))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sell)


