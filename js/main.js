import exportdata, { products } from './api.js';
import pagination from './products.js';




exportdata().then(function () {
    
  console.log(products);
  pagination(products);

    
});

