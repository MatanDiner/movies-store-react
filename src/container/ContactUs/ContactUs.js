import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/Aux'
import axios from '../../order-axios'
import withErrorHandler from '../../WithErrorHandler/WithErrorHandler'
import { connect } from 'react-redux'
import * as action from '../../store/actions/index'
import Button from '../../components/UI/Button/Button'
import classes from './ContactUs.css'
class ContactUs extends Component {

    state = {

        form: {
            first_name: {
                elementType: "input",
                value: "",
                elementConfig: {
                    type: "text",
                    placeholder: "Name"
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            last_name: {
                elementType: "input",
                value: "",
                elementConfig: {
                    type: "text",
                    placeholder: "Last Name"
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            phone: {
                elementType: "input",
                value: "",
                elementConfig: {
                    type: "tel",
                    placeholder: "Phone"
                },
                validation: {
                    required: true,
                    maxLength: 10,
                    minLength: 10
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                value: "",
                elementConfig: {
                    type: "email",
                    placeholder: "Email"
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            comment: {
                elementType: "textarea",
                value: "",
                elementConfig: {
                    placeholder: "comment",
                    cols: 30,
                    rows: 10
                },
                validation: {},
                valid: true
            },
        },
        formIsValid: false
    }


       componentDidMount(){
           this.props.onShowPage();
       }


    onSubmitForm = (e) => {
        e.preventDefault();
        const form = { ...this.state.form };
        const contact = {

            firstName: form.first_name.value,
            lastName: form.last_name.value,
            phone: form.phone.value,
            email: form.email.value,
            comment: form.comment.value
        }

        this.props.onAddContact(contact,this.props.token);

    }



    checkValidation = (value, rules) => {

        if (!rules) {
            return;
        }
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length < rules.maxLength && isValid;
        }
        if (rules.minLength) {
            isValid = value.length < rules.minLength && isValid;
        }
        return isValid;
    }

    changedHandler = (e, identifier) => {

        const form = { ...this.state.form }
        form[identifier].value = e.target.value;
        form[identifier].valid = this.checkValidation(form[identifier].value, form[identifier].validation);
        form[identifier].touched = true;
        let formIsValid = true;
        for (let i in form) {
            formIsValid = form[i].valid && formIsValid;
        }
        this.setState({
            form: form,
            formIsValid: formIsValid
        })

    }




    render() {


        const elementsArr = [];
        for (let key in this.state.form) {
            elementsArr.push({
                key: key,
                formElement: this.state.form[key]
            })
        }
        let form = <Spinner/>;

        form = <div className={classes.contactForm}>
            <div><h1>Contact Us</h1></div>
            <form onSubmit={this.onSubmitForm}>
                {elementsArr.map(el => {

                    return <Input
                        key={el.key}
                        elementType={el.formElement.elementType}
                        elementConfig={el.formElement.elementConfig}
                        value={el.formElement.value}
                        changed={(event) => this.changedHandler(event, el.key)}
                        isValid={el.formElement.valid}
                        touched={el.formElement.touched}
                        shouldValid={el.formElement.validation}
                    />

                })
                }
                <Button disabled={!this.state.formIsValid} btnType="Success">Submit</Button>
            </form></div>


        if (this.props.isContact) {
            form = <div className={classes.respondDiv}><h1>Thank You for contact With Us,our representatives will contact with you as soon as possible</h1></div>
        }

        return (
            <Aux>
                {form}
            </Aux>
        )
    }


}


const mapPropsToState = state => {
    return {
        isContact: state.contactUs.isContact,
        token: state.auth.token
    }
}

const mapPropsToDispatch = dispatch => {
    return {
        onAddContact: (contact,token) => dispatch(action.addContact(contact,token)),
        onShowPage : () => dispatch(action.showForm())
    }
}


export default connect(mapPropsToState, mapPropsToDispatch)(withErrorHandler(ContactUs, axios));