import { products } from './api.js';

const btnPanier = document.getElementById("btPanier");
const popupPanier = document.getElementById("popupPanier");
const fondPopup = document.getElementById("fondPopup");
const fermerPopup = document.getElementById("fermerPopup");


function ouvrirPopup() {
       afficherPanier();
    popupPanier.classList.remove("hidden");
    popupPanier.classList.add("flex");
}

function fermerLePopup() {
    popupPanier.classList.add("hidden");
    popupPanier.classList.remove("flex");
}



btnPanier.addEventListener("click", ouvrirPopup);
fermerPopup.addEventListener("click", fermerLePopup);
fondPopup.addEventListener("click", fermerLePopup);
export let panier = [];


export default function ajouterAupanier(id) {

    const produit = products.find(function (p) {
        return p.id === id;
    });
    const dejaDansPanier = panier.find(function (p) {
        return p.id === id;
    });
    if (dejaDansPanier) {
        dejaDansPanier.quantite++;
    } else {

        panier.push({ ...produit, quantite: 1 });
    }


    console.log("panier :", panier);
       afficherPanier();

}
window.ajouterAupanier = ajouterAupanier;
const listePanier = document.getElementById("listePanier");
const totalPanier = document.getElementById("totalPanier");
function afficherPanier() {
    listePanier.innerHTML = "";
    if (panier.length === 0) {
        listePanier.innerHTML = "<p class='text-gray-500'>Votre panier est vide</p>"
        totalPanier.textContent = "0";
        return;
    }
    panier.forEach(function (produit) {

        const ligne = document.createElement("div");
        ligne.classList.add("flex", "items-center", "gap-3", "border-b", "py-2");

        ligne.innerHTML = `
            <img src="${produit.image}" alt="${produit.nom}" class="w-12 h-12 object-contain">
            <div class="flex-1">
                <p class="font-medium">${produit.nom}</p>
                <p class="text-sm text-gray-500">${produit.prix} € × ${produit.quantite}</p>
            </div>
            <p class="font-bold">${(produit.prix * produit.quantite).toFixed(2)} €</p>
        `;

        listePanier.append(ligne);
    });
       const total = panier.reduce(function (somme, produit) {
        return somme + produit.prix * produit.quantite;
    }, 0);

    totalPanier.textContent = total.toFixed(2);
}



    
