let produit = [];

export function fetchDate(){

    fetch('./data/data.json')
    .then(response => response.json())
    .then(data =>   produit.push(data))

    .catch(error => {
        console.error("error while lodaing data :",error);
    });
}


console.log(produit);