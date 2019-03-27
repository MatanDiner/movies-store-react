import React, { Component } from 'react'
import Cards from '../../components/Cards/Cards'
import { connect } from 'react-redux'
import * as action from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../order-axios'
import withError from '../../WithErrorHandler/WithErrorHandler'
import Search from '../../components/Search/Search'
import classes from './Movies.css'
import Aux from '../../hoc/Aux'
class Movies extends Component {

    state = {
        searchValue: ""
    }


    componentDidMount() {
        this.props.onSetMovies(this.props.token, this.props.userId);
    }


    addToCartHandler = (movieId) => {
        this.props.onAddToCart(this.props.token, this.props.moviesDataId, movieId);
    }

    buyClickedHandler = (movie) => {
        this.props.onBuyClicked(movie);
        this.props.history.push('/Sell');
    }

    changedHandler = (e) => {

        const value = e.target.value.toLowerCase();
        const movies = this.props.movies.filter(movie => movie.Name.toLowerCase().includes(value));
        this.props.onSearchMovies(movies);
        this.setState({
            searchValue: value
        })
    }

    render() {

        let notFound = null;
        if (!this.props.searchMovies || this.props.searchMovies.length === 0) {
            notFound = <div><h4 style={{ color: "red" }}>Not Found</h4></div>
        }

        let movies = <Spinner />
        if (this.props.movies) {
            movies = (
                <Aux>
                    <div style={{ textAlign: "center" }}>
                        <Search value={this.state.searchValue} changed={this.changedHandler} />
                        {notFound}
                    </div>
                    <Cards cards={this.props.searchMovies}
                        page="home"
                        addToCartClicked={this.addToCartHandler}
                        buyClicked={this.buyClickedHandler}
                    />
                </Aux>
            );
        }

        return movies;
    }
}


const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        movies: state.movies.movies,
        searchMovies: state.movies.searchMovies,
        moviesDataId: state.movies.moviesDataId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetMovies: (token, userId) => dispatch(action.setMovies(token, userId)),
        onAddToCart: (token, moviesDataId, movieId) => dispatch(action.addToCart(token, moviesDataId, movieId)),
        onBuyClicked: (movie) => dispatch(action.setMovieCard(movie)),
        onSearchMovies: (movies) => dispatch(action.SearchMovies(movies))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withError(Movies, axios))

