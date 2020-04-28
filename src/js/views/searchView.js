import { elements } from './base'; 

export const getInput = () => elements.searchInput.value; 

export const clearInput = () => {
    elements.searchInput.value = ''; 
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
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
        <a class="results_link" href="${recipe.recipe.url}" target="_blank">
               <h4>${recipe.recipe.label}</h4>
        </a>
        <img src="${recipe.recipe.image}" alt="${limitRecipeLabel(recipe.recipe.label)}">
        <div>
            <h4>Calories</h4>
            <p>${formatter.format(recipe.recipe.calories)}</p>
            <h4>Health Labels</h4>
            <p>${recipe.recipe.healthLabels}</p>
            <h4>Ingredients</h4>
            <p>${recipe.recipe.ingredientLines}</p>
            <h4>Source: </h4>
            <p>${recipe.recipe.source}</p>
        </div>
    
    </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup); 
};

export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
};

//   <a class="results_link" href="#${recipe.uri}">
//             <img src="${recipe.image}" alt="${recipe.label}">
//             <div>
//                 <h4>${recipe.label}</h4>
//                 <p>${recipe.source}</p>
//             </div>
//         </a>


//  <p>${recipe.recipe.calories}</p>;

//    <br />
//     <p>${JSON.stringify(recipe.recipe.ingredients)}</p>