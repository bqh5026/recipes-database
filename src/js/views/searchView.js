import { elements } from './base'; 

export const getInput = () => elements.searchInput.value; 

const renderRecipe = recipe => {
    const markup = `
    <li>
      <p>${recipe.recipe.calories}</p>
    </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup); 
}

export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
}

//   <a class="results_link" href="#${recipe.uri}">
//             <img src="${recipe.image}" alt="${recipe.label}">
//             <div>
//                 <h4>${recipe.label}</h4>
//                 <p>${recipe.source}</p>
//             </div>
//         </a>