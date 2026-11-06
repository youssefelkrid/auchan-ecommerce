import exportdata, { products } from './api.js';
import pagination from './products.js';
import './cart.js'
import './dragDrop.js';
import './storage.js'





exportdata().then(function () {
    
   console.log(products);
  pagination(products);

    localStorage.setItem("products",JSON.stringify(products));
});

