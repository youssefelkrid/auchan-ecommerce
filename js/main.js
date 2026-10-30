import exportdata, { products } from './storage.js';
import cartProduit from './products.js';

exportdata().then(function () {
  console.log(products);      
  cartProduit(products);     
});

