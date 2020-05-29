import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://recipes-database-fb21c.firebaseio.com/'
})

export default instance; 

