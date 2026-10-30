export let products = [];

export default function exportdata() {
  return fetch('./data/data.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      products = data;      
      return products;
    })
    .catch(function (error) {
      console.log("erreur de serveur :", error);
    });
}