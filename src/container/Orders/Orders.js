import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as action from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../order-axios'
import withError from '../../WithErrorHandler/WithErrorHandler'
import Cards from '../../components/Cards/Cards'
import Search from '../../components/Search/Search'
import Aux from '../../hoc/Aux'

class Orders extends Component {

    state = {
        searchValue: "",
        ordersFilter_found_orders:true
    }


    componentDidMount() {
        this.props.onSetOrders(this.props.token, this.props.userId);
    }

    changedHandler = (e) => {

        const value = e.target.value.toLowerCase();
        const orders = this.props.orders.filter(movie => movie.movieDetails.Name.toLowerCase().includes(value));
        this.props.onSearchOrders(orders);
        this.setState({
            searchValue: value,
            ordersFilter_found_orders:orders.length>0
        })
    }

    render() {

        let notFound = null;
        if (!this.state.ordersFilter_found_orders) {
            notFound = <div><h4 style={{ color: "red" }}>Not Found</h4></div>
        }

        let orders = <Spinner />;
        if (this.props.orders) {
            orders = (
                <Aux>
                    <div style={{ textAlign: "center" }}>
                        <Search value={this.state.searchValue} changed={this.changedHandler} />
                        {notFound}
                    </div>
                    <Cards cards={this.props.searchOrders} page="orders" />
                </Aux>
            );
        }

        return orders;
    }

}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        orders: state.orders.orders,
        searchOrders: state.orders.searchOrders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetOrders: (token, userId) => dispatch(action.setOrders(token, userId)),
        onSearchOrders: (orders) => dispatch(action.searchOrders(orders))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withError(Orders, axios));

