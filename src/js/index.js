import Search from './models/Search'; 
import * as searchView from './views/searchView';
import { elements } from './views/base';
import './../styles/app.css';
import './../styles/appStyles.scss'; 

import '@fortawesome/fontawesome-free/js/all'; 

const state = {}; 

const constrolSearch = async () => {
    // const query = 'pizza'; 
    const query = searchView.getInput();
    // console.log(query);

    if (query) {
        state.search = new Search(query); 
        searchView.clearInput(); 
        searchView.clearResults(); 
        await state.search.getResults(); 
        // console.log(state.search.result); 
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
        console.log(goToPage); 
    }
}); 
// const search = new Search('pizza'); 
// search.getResults(); 
// console.log(search); 
console.log(process.env.EDAMAM_API); 