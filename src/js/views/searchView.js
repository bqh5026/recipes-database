import { elements } from './base'; 

export const getInput = () => elements.searchInput.value; 

export const clearInput = () => {
    elements.searchInput.value = ''; 
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = ''; 

};

const limitRecipeLabel = (label, limit = 10) => {
     
    const newLabel = [];
    if (label.length > limit) {
        label.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newLabel.push(cur);
            }
            return acc + cur.length;
        }, 0); 
        return `${newLabel.join(' ')} ...`;
    }
    return label; 
}

const renderRecipe = recipe => {
    const formatter = new Intl.NumberFormat({
        style: 'decimal'
    })

    const markup = `
    <li>
        <a class="results_link" href="${recipe.recipe.url}">
               <h2>${recipe.recipe.label}</h2>
        </a>
        <img class="recipe_image" src="${
          recipe.recipe.image
        }" alt="${limitRecipeLabel(recipe.recipe.label)}">
        <div>
            <h4>Calories</h4>
            <p>${Math.ceil(recipe.recipe.calories)}</p>
            <h4>Health Labels</h4>
            <p>${recipe.recipe.healthLabels}</p>
            <a class="results_link" href="${
              recipe.recipe.url
            }" target="_blank"><h4>Ingredients</h4></a>
            <p>${recipe.recipe.ingredientLines}</p>
            <h4>Source: </h4>
            <p>${recipe.recipe.source}</p>
        </div>
    
    </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup); 
};


const createButton = (page, type) => `
    <button class="btn-inline results_btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>
`;
const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    let button;
    if (page === 1 && pages > 1) {
        button = createButton(page, 'next');
    } else if (page < pages) {
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        button = createButton(page, "prev");   
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', button); 
}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage; 
    recipes.slice(start, end).forEach(renderRecipe);
    renderButtons(page, recipes.length, resPerPage); 
};


    //   <a class="results_link" href="${recipe.recipe.url}" target="_blank"></a>

//     <p>${JSON.stringify(recipe.recipe.ingredients)}</p>

//  <p>${formatter.format(recipe.recipe.calories)}</p>;

