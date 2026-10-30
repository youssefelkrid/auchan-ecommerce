const div = document.getElementById("produits");

export default function cartProduit(data) {

    div.innerHTML = "";

    data.forEach(element => {

        const article = document.createElement("article");

        article.dataset.id = element.id;

        article.classList.add(
            "bg-white",
            "rounded-xl",
            "shadow-sm",
            "border",
            "overflow-hidden",
            "flex",
            "flex-col",
            "w-80"
        );

        article.innerHTML = `
            <img src="${element.image}"
                 alt="${element.nom}"
                 class="w-full aspect-square object-cover">

            <div class="p-4 flex flex-col gap-2 flex-1">

                <h3 class="font-medium">${element.nom}</h3>

                <div class="flex items-end justify-between mt-auto pt-2">
                    <div>
                        <p class="text-xs text-gray-500">Prix TTC</p>
                        <p class="text-xl font-bold">
                            ${element.prix} <span class="text-sm">€</span>
                        </p>
                    </div>
                </div>

            </div>
        `;

        div.append(article);
    });
}