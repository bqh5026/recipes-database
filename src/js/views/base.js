export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search_field'),
    searchResList: document.querySelector('.results_list'),
    searchRes: document.querySelector('.results'),
    searchResPages: document.querySelector('.results_pages'),
    favorites: document.querySelector('.favorites')
}

export const elementStrings = {
    loader: 'loader'
}

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
          
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader); 
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader) loader.parentElement.removeChild(loader); 
}
