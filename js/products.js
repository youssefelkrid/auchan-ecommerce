import cartProduit from './ui.js';


const divPagination = document.getElementById("pagination");
const produitsparpage = 6 ;
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