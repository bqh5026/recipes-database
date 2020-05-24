import Search from './models/Search'; 
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';
import './../styles/app.css';
import './../styles/appStyles.scss'; 

import '@fortawesome/fontawesome-free/js/all'; 
import axios from './axios-orders'; 


const state = {}; 

const constrolSearch = async () => {
    const query = searchView.getInput();

    if (query) {
        state.search = new Search(query); 
        searchView.clearInput(); 
        searchView.clearResults(); 
        renderLoader(elements.searchRes); 

        await state.search.getResults(); 
   
        clearLoader();
        searchView.renderResults(state.search.result); 
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    constrolSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest(".btn-inline");
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10); 
        searchView.clearResults(); 
        searchView.renderResults(state.search.result, goToPage); 
    }
}); 

const getData = () => {
  axios
    .get("/recipes.json")
    .then((res) => {
      // console.log(res.data);
      let keys = Object.keys(res.data);
      // console.log(keys);
      for (let i = 0; i < keys.length; i++) {
        let k = keys[i];
        let image = res.data[k].image;
        let source = res.data[k].source;
        // console.log(JSON.stringify(url));
        //  console.log(JSON.stringify(image));
        // console.log(url, image, source);
        const favoriteRecipes = `
            <div>
                <a href="${res.data[k].url}" target="_blank"><img src="${res.data[k].image}" alt="${res.data[k].label}"></a>
            </div>
        `;
        elements.favorites.insertAdjacentHTML("beforeend", favoriteRecipes);
      }
      // const dataBase = res.data;
      // elements.favorites.innerHTML = JSON.stringify(dataBase);
      // elements.favorites.innerHTML = dataBase;
    })
    .catch((error) => {
      console.log(error);
    });
};

document.addEventListener("DOMContentLoaded", function() {
    getData();
});