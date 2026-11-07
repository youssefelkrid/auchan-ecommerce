import cartProduit from './ui.js';
import exportdata , { products } from './api.js';

const dataproduict = localStorage.getItem("products");
const catalogue = document.querySelector("#category-filters");
const filters = document.querySelector("#category-search");
const divPagination = document.getElementById("pagination");
const produitsparpage = 6 ;
const btn_grid = document.getElementById("btn-grid");
const btn_list = document.getElementById("btn-list");
const conteneur = document.getElementById("produits");
if(btn_grid){
btn_grid.addEventListener("click",function(){
    conteneur.classList.remove("flex-col");
    conteneur.classList.add("flex-row");
    conteneur.querySelectorAll("article").forEach(function(article){
        article.classList.remove("w-full");
        article.classList.add("w-80");

    });
    
});
}
if(btn_list){
btn_list.addEventListener("click",function(){
      conteneur.classList.remove("flex-row");
      conteneur.classList.add("flex-col");
      conteneur.querySelectorAll("article").forEach(function(article){
       article.classList.remove("w-80","flex-col");
       article.classList.add("w-full","flex-row","items-center");
       const img = article.querySelector("img");
       img.classList.remove("w-full","aspect-square");
       img.classList.add("w-24","h-24");


      });
    
});
}




let pageActuelle = 1 ;
let liste = [] ;   //list des produits 

export default function pagination(products) {
    liste = products ;
    pageActuelle = 1 ;
    afficherPage();
}


function afficherPage(){

     const nombrepage = Math.ceil(liste.length / produitsparpage);
     const debut = (pageActuelle -1) * produitsparpage ;
     const fin = debut + produitsparpage ;
     const produitsDeLapage = liste.slice(debut,fin);

     cartProduit(produitsDeLapage);
     afficherBoutons(nombrepage);

}

function afficherBoutons(nombrepage) {
    if(divPagination){
    divPagination.innerHTML = "";
    for(let i= 1;i <= nombrepage ; i++) {
        const bouton = document.createElement("button");
        bouton.textContent = i ;
        bouton.classList.add("px-3","py-1","border" ,"rounded");
        if(i === pageActuelle){
             bouton.classList.add("bg-red-600", "text-white");
        }


            bouton.addEventListener("click",function(){
                pageActuelle = i ;
                afficherPage();
            });
            divPagination.append(bouton);
        
    }
}
}


    if (filters) {

        filters.addEventListener( "input", function(e){
            const pr = e.target.value
             
          
           const filtered = products.filter((produit)=>
               produit.nom.toUpperCase().includes(pr.toUpperCase())
           );
          
         cartProduit(filtered);
         
         
    
        });

    }
     
 

    if (catalogue) {
        catalogue.addEventListener("click" ,function(e){
        const cata = e.target.dataset.category;

            const catalogus = products.filter((catalog) =>{

                
                return catalog.categorie.toUpperCase().includes(cata.toUpperCase());
            });
                cartProduit( catalogus);
                
        });
    }


