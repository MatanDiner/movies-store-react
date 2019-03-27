import axios from 'axios';

const instance = axios.create({
    baseURL:'https://moviesstore-app.firebaseio.com/'
});


export default instance;