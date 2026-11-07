import {getRandomUserJSON} from './api.js'

const bouton_fetch = document.getElementById("bottun-fetch");
const ajouer = document.getElementById("popup");
const forms = document.getElementById("form");
const btnfermiers = document.getElementById("btnfermer");

if(ajouer){
    ajouer.addEventListener("click", () => {
         forms.classList.remove("hidden");
         forms.classList.add("flex");
        
    })
}
if(btnfermiers){
    btnfermiers.addEventListener("click", () => {
        forms.classList.add("hidden");
         forms.classList.remove("flex");
        
    })
}





    if(bouton_fetch){
bouton_fetch.addEventListener("click",function(e){
    console.log(bouton_fetch)
     getRandomUserJSON().then(data => {

        const input_contact_name = document.getElementById("nom");
        const input_contact_email = document.getElementById("email");
        const input_contact_phone = document.getElementById("tel");
        const input_contact_message = document.getElementById("message");

        input_contact_name.value = `${data.results[0].name.first} ${data.results[0].name.last}`
        input_contact_email.value = data.results[0].email
        input_contact_phone.value = data.results[0].phone
        input_contact_message.value = `Hi Im ${data.results[0].name.title} ${data.results[0].name.first} ${data.results[0].name.last} and I would like to ask some questions about delivery costs to a country other like ${data.results[0].country} Code POSTAL: ${data.results[0].postcode}`

    });
});
 }


 if (forms) {
    forms.addEventListener("submit", function (e) {
        e.preventDefault(); 

        
        const nom = document.getElementById("nom").value.trim();
        const prix = parseFloat(document.getElementById("prix").value);
        const image = document.getElementById("img").value.trim();
        const categorie = document.getElementById("categorie").value.trim();

        // التحقق
        if (!nom || isNaN(prix) || !image || !categorie) {
            alert("ROMPLIRE TOUT LES INPUTS ");
            return;
        }

        const produits = JSON.parse(localStorage.getItem("products")) || [];

       
        const newId = produits.length
            ? Math.max(...produits.map(p => p.id)) + 1
            : 1;

        produits.push({ id: newId, nom, prix, image, categorie });

       
        localStorage.setItem("products", JSON.stringify(produits));

        forms.reset();
        formContainer.classList.add("hidden");
        formContainer.classList.remove("flex");

        alert("SUCCEIE");
    });
}



 