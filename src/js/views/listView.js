// import { elements } from './base';

// export const renderItem = item => {
//     const markup = `
//         <li data-itemid=${item.id}>
//             <div>
//                 <input type="number" value="${item.count}" step="${item.count}" class="shopping_count-value">
//                 <p>${item.unit}</p>
//             </div>
//             <p>${item.ingredient}</p>
//             <button>
//             </button>
//         </li>
//     `;
//     elements.shopping.insertAdjacentHTML('beforeend', markup);
// }; 

// export const deleteItem = id => {
//     const item = document.querySelector(`[data-itemid="${id}"]`);
//     item.parentElement.removeChild(item);
// }