import Search from './models/Search'; 
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';
import './../styles/app.css';
import './../styles/appStyles.scss'; 

import '@fortawesome/fontawesome-free/js/all'; 

// import Recipe from './models/Recipe';
// import List from './models/List';

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


// window.l = new List();
// search.getResults(); 