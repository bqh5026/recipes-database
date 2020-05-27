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

elements.help.addEventListener('click', e=> {
  e.preventDefault();
  alert('Enter search phrase into the search field. It can be anything recipe related such as "Manhattan", "Apple Pie", or "Avocado Soup."');
});

const deleteItem = (favoriteRecipe) => {
  return event => {
    event.preventDefault();
    axios
      .delete('/recipes.json', favoriteRecipe)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
}

const getData = () => {
  axios
    .get("/recipes.json")
    .then((res) => {
      let keys = Object.keys(res.data);
      for (let i = 0; i < keys.length; i++) {
        let k = keys[i];
        const favoriteRecipes = `
            <div class="recipes_cards">
                <div class="recipe_card">   
                    <span>${res.data[k].label}</span>
                    <img class="recipe_card_image" src="${
                      res.data[k].image
                    }" alt="${res.data[k].label}">
                    <div class="recipe_card_content">
                    <p>
                      <ul>
                          ${res.data[k].ingredients.map( ingredient => `<li>${ingredient.text}</li><li>${ingredient.weight} g</li>`).join("")}
                      </ul>
                    </p>
                    </div>
                    <div class="recipe_card_info">
                        <div>
                          <button class="delete_fav" data-fav-recipe=${k}>Delete</button>
                        </div>
                        <div>
                          <a href="${
                            res.data[k].url
                          }" class="recipe_card_link" target="_blank">View Article</a> 
                        </div>
                    </div>
                </div>
            </div>
        `;
        elements.favorites.insertAdjacentHTML("beforeend", favoriteRecipes);
        document.querySelector(`[data-fav-recipe="${k}"]`)
        .addEventListener("click", deleteItem(res.data));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

document.addEventListener("DOMContentLoaded", function() {
    getData();
});