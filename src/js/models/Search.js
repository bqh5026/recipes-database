import axios from "axios"; 

export default class Search {
    constructor(query) {
        this.query = query; 
    }

    async getResults(query) {
        // const proxy = 'https://cors-anywhere.herokuapp.com'; 
        const appId = '07785360';
        const key = 'ed4302d03921218d96c47deb7ef96837';
        try {
            // const res = await axios(`${proxy}https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${key}`);
            const res = await axios(`https://api.edamam.com/search?q=${this.query}&app_id=${appId}&app_key=${key}`);
            this.result = res.data.hits; 
            // console.log(res); 
            console.log(recipes); 
        } catch(error) {
            alert(error); 
        }
    }
}


// getResults('tomato pasta'); 
