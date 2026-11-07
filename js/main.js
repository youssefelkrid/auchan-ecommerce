import exportdata, { products } from './api.js';
import pagination from './products.js';
import './cart.js'
import './dragDrop.js';
import './storage.js'




exportdata().then(function () {

    const saved = localStorage.getItem("products");

    if (saved) {
        
        products.splice(0, products.length, ...JSON.parse(saved));
    } else {
       
        localStorage.setItem("products", JSON.stringify(products));
    }

    console.log(products);
    pagination(products);
});
