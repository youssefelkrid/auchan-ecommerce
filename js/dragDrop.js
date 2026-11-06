import ajouterAupanier from "./cart.js";


const divProduits = document.getElementById("produits");
const iconePanier = document.getElementById("btPanier");
if(divProduits){
divProduits.addEventListener("dragstart",function(event){
    const carts = event.target.closest("article");
    event.dataTransfer.setData("text/plain",carts.dataset.id) ;
    console.log("Debut du glissement , id :",carts.dataset.id)
})
}
if(iconePanier){
iconePanier.addEventListener("dragover",function(event){
     event.preventDefault();
});
}
if(iconePanier){
iconePanier.addEventListener("drop", function(event){
      event.preventDefault();
      const id = Number(event.dataTransfer.getData("text/plain"));

ajouterAupanier(id);
});
}

 