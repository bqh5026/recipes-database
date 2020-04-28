import Search from './models/Search'; 
import * as searchView from './views/searchView'
import { elements } from './views/base'

const state = {}; 

const constrolSearch = async () => {
    // const query = 'pizza'; 
    const query = searchView.getInput();
    // console.log(query);

    if (query) {
        state.search = new Search(query); 
        await state.search.getResults(); 
        // console.log(state.search.result); 
        searchView.renderResults(state.search.result); 
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    constrolSearch();
});

// const search = new Search('pizza'); 
// search.getResults(); 
console.log(search); 