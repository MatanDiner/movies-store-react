import React, { Component } from 'react'
import Cards from '../../components/Cards/Cards'
import { connect } from 'react-redux'
import * as action from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../order-axios'
import withErrorHandler from '../../WithErrorHandler/WithErrorHandler';
import Search from '../../components/Search/Search'
import Aux from '../../hoc/Aux'
class Cart extends Component {

    state = {
        searchValue: "",
        moviesFilter_found_movies:true
    }


    componentDidMount() {
        this.props.onSetCartMovies(this.props.token, this.props.moviesDataId)
    }

    buyClickedHandler = (movie) => {
        this.props.onBuyClicked(movie);
        this.props.history.push('/Sell');
    }

    removeHandler = (movieId) => {
        this.props.onRemovedClicked(this.props.token, this.props.moviesDataId, movieId);
    }

    changedHandler = (e) => {

        const value = e.target.value.toLowerCase();
        const movies = this.props.cartMovies.filter(movie => movie.Name.toLowerCase().includes(value));
        this.props.onSearchCartMovies(movies);
        this.setState({
            searchValue: value,
            moviesFilter_found_movies:movies.length>0
        })
    }

    render() {
        let notFound = null;
        if ( !this.state.moviesFilter_found_movies) {
            notFound = <div><h4 style={{ color: "red" }}>Not Found</h4></div>
        }

        let cart = <Spinner />;
        if (this.props.cartMovies) {
            cart = (
                <Aux>
                    <div style={{ textAlign: "center" }}>
                        <Search value={this.state.searchValue} changed={this.changedHandler} />
                        {notFound}
                    </div>
                    <Cards cards={this.props.searchCartMovies}
                        page="cart"
                        buyClicked={this.buyClickedHandler}
                        removedClicked={this.removeHandler}
                    />
                </Aux>
            );
        }

        return cart;
    }


}



const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        cartMovies: state.cart.cartMovies,
        moviesDataId: state.movies.moviesDataId,
        searchCartMovies: state.cart.searchCartMovies
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetCartMovies: (token, moviesDataId) => dispatch(action.setCartMovies(token, moviesDataId)),
        onBuyClicked: (movie) => dispatch(action.setMovieCard(movie)),
        onRemovedClicked: (token, moviesDataId, movieId) => dispatch(action.removeFromCart(token, moviesDataId, movieId)),
        onSearchCartMovies: (movies) => dispatch(action.SearchCartMovies(movies))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Cart, axios))










