# auchan-ecommerce
# Veille technologique : JavaScript asynchrone, Fetch, GitHub Users et PWA

Documentation de synthèse regroupant les notions vues pendant le sprint sur les traitements asynchrones, la consommation d'API et les Progressive Web Apps.

## Sommaire

1. [Fetch API et requêtes HTTP](#1-fetch-api-et-requêtes-http)
2. [Manipulation des tableaux JavaScript](#2-manipulation-des-tableaux-javascript)
3. [Fonctionnalité de recherche de produits](#3-fonctionnalité-de-recherche-de-produits)
4. [Codes de statut HTTP](#4-codes-de-statut-http)
5. [Veille 1 : synchrone, asynchrone et async/await](#5-veille-1--synchrone-asynchrone-et-asyncawait)
6. [Projet live coding : GitHub Users](#6-projet-live-coding--github-users)
7. [Veille 2 : Progressive Web Apps (PWA)](#7-veille-2--progressive-web-apps-pwa)
8. [Ressources](#8-ressources)

---

## 1. Fetch API et requêtes HTTP

### 1.1. Qu'est-ce que Fetch ?

`fetch()` est une fonction JavaScript qui envoie une requête HTTP à un serveur pour récupérer des données depuis une API ou un fichier JSON.

```javascript
fetch("data.json")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));
```

**Fonctionnement :**

1. `fetch(url)` envoie une requête au serveur.
2. Elle retourne une **Promise** : le résultat n'est pas immédiat, JavaScript continue son travail pendant l'attente.
3. Lorsque la réponse arrive, on obtient un objet `Response`.
4. `response.json()` transforme le contenu de la réponse en données JavaScript (objet ou tableau).
5. `.then()` permet de traiter le résultat.
6. `.catch()` permet de récupérer les erreurs.

### 1.2. Les trois états d'une Promise

| État | Signification |
|---|---|
| **Pending** | La requête est encore en cours. |
| **Fulfilled** | La requête est terminée avec succès. |
| **Rejected** | La requête a échoué. |

### 1.3. Qu'est-ce qu'une requête GET ?

Une requête `GET` demande et récupère des données depuis un serveur, sans les modifier. Exemple : récupérer la liste des produits depuis un fichier `data.json`.

**Problématique résolue par Fetch et Axios :** comment récupérer des données qui se trouvent ailleurs et les afficher dynamiquement dans la page web ?

### 1.4. Différence entre Fetch et Axios

| Fetch | Axios |
|---|---|
| Déjà intégré au navigateur. | Bibliothèque externe à installer. |
| Utilise `response.json()`. | Les données sont directement dans `response.data`. |
| Nécessite de vérifier `response.ok`. | Les erreurs HTTP sont automatiquement envoyées vers `catch`. |
| Les paramètres peuvent être ajoutés à l'URL. | Utilise `params: { ... }`. |

**À retenir :** Fetch est intégré au navigateur mais demande un peu plus de code pour gérer les erreurs HTTP. Axios est une bibliothèque externe qui simplifie certaines opérations.

### 1.5. Gestion des erreurs HTTP : 404 et 500

**Q1. Si `fetch('data.json')` renvoie une erreur 404, le bloc `catch` est-il exécuté ?**

Non. Fetch ne considère pas les erreurs HTTP comme des erreurs réseau. Même si le serveur renvoie `404` (Not Found) ou `500` (Internal Server Error), la Promise est résolue. Il faut donc vérifier la propriété `response.ok`.

```javascript
fetch("data.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Erreur HTTP : " + response.status);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.log("Erreur :", error));
```

- `response.ok` : retourne `true` si le statut HTTP indique un succès.
- `throw new Error()` : crée une erreur et passe directement dans `catch`.
- `.catch()` : récupère l'erreur.

**Q2. Comment Axios gère-t-il les erreurs 404 et 500 ?**

Axios considère automatiquement les réponses HTTP 404 et 500 comme des erreurs et exécute directement le bloc `catch`.

---

## 2. Manipulation des tableaux JavaScript

### 2.1. Différence entre `map()` et `forEach()`

- `map()` : parcourt un tableau et **retourne un nouveau tableau** contenant les résultats de chaque élément.
- `forEach()` : parcourt un tableau pour **exécuter une action** sur chaque élément, sans retourner de nouveau tableau.

```javascript
const nombres = [1, 2, 3];

const resultat = nombres.map(nombre => nombre * 2);
// [2, 4, 6]

nombres.forEach(nombre => console.log(nombre));
// Affiche 1, 2 et 3
```

### 2.2. La méthode `filter()`

`filter()` sélectionne uniquement les éléments qui respectent une condition.

1. Elle parcourt chaque élément du tableau.
2. Elle vérifie si la condition retourne `true` ou `false`.
3. Elle conserve uniquement les éléments qui retournent `true`.
4. Elle retourne un nouveau tableau sans modifier le tableau original.

**À retenir :** contrairement à `forEach()`, `filter()` retourne un nouveau tableau.

### 2.3. La méthode `includes()`

`includes()` vérifie si un texte contient une partie d'un autre texte. Elle retourne un booléen (`true` ou `false`).

```javascript
"ordinateur".includes("ordi");  // true
"ordinateur".includes("phone"); // false
```

---

## 3. Fonctionnalité de recherche de produits

### 3.1. Objectif

Permettre à l'utilisateur de rechercher un produit en saisissant son nom dans un champ `input`.

### 3.2. Paramètres

- `produits` : le tableau des produits récupérés depuis `data.json`.
- `text` : le texte saisi par l'utilisateur.

### 3.3. Code

```javascript
export const recherche = (produits, text) => {
  const search = text.toLowerCase().trim();

  return produits.filter((produit) =>
    produit.nom.toLowerCase().includes(search)
  );
};
```

### 3.4. Explication

- `toLowerCase()` : met le texte en minuscules (recherche insensible à la casse).
- `trim()` : supprime les espaces au début et à la fin.
- `filter()` : conserve les produits qui respectent la condition.
- `produit.nom` : nom du produit.
- `includes(search)` : vérifie que le nom contient le texte recherché.

### 3.5. Cas particulier : champ vide

Si l'utilisateur efface tout le texte, `search = ""`. La méthode `includes("")` retourne toujours `true`, donc **tous les produits sont affichés**.

---

## 4. Codes de statut HTTP

| Code | Signification | Explication |
|---|---|---|
| 200 | OK | La requête a réussi. |
| 201 | Created | Une ressource a été créée. |
| 300 | Multiple Choices | Plusieurs réponses sont possibles, un choix est nécessaire. |
| 400 | Bad Request | La requête est incorrecte. |
| 401 | Unauthorized | Une authentification est nécessaire. |
| 403 | Forbidden | L'accès est refusé. |
| 404 | Not Found | La ressource est introuvable. |
| 500 | Internal Server Error | Une erreur interne du serveur s'est produite. |

**À retenir :** les codes HTTP indiquent rapidement si une requête a réussi ou si une erreur s'est produite.

---

## 5. Veille 1 : synchrone, asynchrone et async/await

### 5.1. Objectifs d'apprentissage

- Expliquer la différence entre code synchrone et asynchrone en JavaScript.
- Utiliser `async/await` pour réécrire une requête `fetch` avec promesses.
- Distinguer les cas où le code synchrone bloque l'interface utilisateur.
- Mettre en place une gestion d'erreurs avec `try...catch` autour d'un appel async.

### 5.2. Principes de synchronicité et d'asynchronie

**Modèle synchrone.** JavaScript s'exécute sur un seul fil (le *fil principal*). En mode synchrone, chaque instruction attend que la précédente soit terminée.

```javascript
console.log("1. Début");
console.log("2. Milieu");
console.log("3. Fin");
// Ordre garanti : 1, 2, 3
```

**Impact du blocage.** Le fil principal gère aussi l'affichage et les clics. Une opération longue et synchrone le monopolise : la page se fige (plus de clic, plus de scroll, plus d'animation).

```javascript
// Exemple de blocage : l'interface est gelée pendant ~3 secondes
function attendre(ms) {
  const debut = Date.now();
  while (Date.now() - debut < ms) {} // boucle qui occupe le fil principal
}
attendre(3000);
```

**Modèle asynchrone.** Les opérations lentes (réseau, timers) sont déléguées au navigateur. JavaScript continue son travail et revient traiter le résultat quand il est prêt.

```javascript
console.log("1. Début");
setTimeout(() => console.log("2. Résultat différé"), 1000);
console.log("3. Fin");
// Ordre : 1, 3, puis 2 (après 1 seconde)
```

**Les promesses.** Une Promise représente une valeur disponible plus tard. Elle est dans l'un des trois états : *pending*, *fulfilled* ou *rejected* (voir section 1.2).

### 5.3. Async/await en pratique

**Syntaxe de base.**

- `async` devant une fonction : elle retourne toujours une Promise.
- `await` devant une Promise : met la fonction en pause jusqu'à la réponse, **sans bloquer** le fil principal.
- `await` ne s'utilise que dans une fonction `async` (ou au niveau supérieur d'un module ES).

```javascript
async function exemple() {
  const resultat = await Promise.resolve(42);
  console.log(resultat); // 42
}
```

**Conversion d'un `fetch().then()` en `await`.**

Version avec promesses :

```javascript
function chargerUtilisateurs() {
  fetch("https://api.github.com/users")
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur HTTP : " + response.status);
      }
      return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error("Erreur :", error));
}
```

Version `async/await` (même résultat, lecture linéaire) :

```javascript
async function chargerUtilisateurs() {
  try {
    const response = await fetch("https://api.github.com/users");

    if (!response.ok) {
      throw new Error("Erreur HTTP : " + response.status);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Erreur :", error);
  }
}

chargerUtilisateurs();
```

**Gestion des erreurs avec `try...catch`.**

- Le bloc `try` contient le code qui peut échouer.
- Le bloc `catch` reçoit l'erreur (réseau coupé, erreur levée avec `throw`, JSON invalide).
- Un bloc `finally` (optionnel) s'exécute dans tous les cas, utile pour masquer un loader.

```javascript
async function chargerAvecLoader() {
  afficherLoader();
  try {
    const response = await fetch("data.json");
    if (!response.ok) throw new Error("HTTP " + response.status);
    return await response.json();
  } catch (error) {
    afficherMessageErreur(error.message);
  } finally {
    masquerLoader();
  }
}
```

### 5.4. Tableau comparatif : synchrone vs async/await

| Critère | Synchrone | Promesses (`.then`) | `async/await` |
|---|---|---|---|
| Exécution | Ligne par ligne, chaque instruction attend la précédente | Non bloquante, via callbacks chaînés | Non bloquante, écrite comme du code synchrone |
| Blocage de l'interface | Oui, si l'opération est longue | Non | Non |
| Lisibilité | Très simple | Se complique avec les chaînes | Très lisible, flux linéaire |
| Gestion d'erreurs | `try...catch` | `.catch()` | `try...catch` |
| Valeur retournée | Valeur directe | Promise | Promise (la fonction `async` retourne toujours une Promise) |
| Exécution en parallèle | Impossible | `Promise.all()` | `await Promise.all()` |
| Cas d'usage | Calculs courts, logique simple | Chaînes courtes, parallélisme | Appels réseau, enchaînements dépendants |

### 5.5. Quand privilégier `async/await` ou `.then()` ?

- **`async/await`** : plusieurs appels qui dépendent les uns des autres, besoin de `try...catch/finally`, code à relire et déboguer facilement.
- **`.then()`** : transformation simple et courte, contexte sans fonction `async` (script classique sans module), ou lorsqu'on retourne une promesse à du code appelant.
- Les deux se combinent : `await Promise.all([...])` pour lancer des requêtes en parallèle.

```javascript
// Requêtes indépendantes en parallèle
const [users, repos] = await Promise.all([
  fetch("/users").then(r => r.json()),
  fetch("/repos").then(r => r.json()),
]);
```

### 5.6. Questions de réflexion

**Pourquoi le code synchrone peut-il rendre l'interface lente pour l'utilisateur ?**

JavaScript n'a qu'un seul fil principal, partagé entre l'exécution du code et la gestion de l'interface (rendu, clics, scroll). Un traitement synchrone long monopolise ce fil : le navigateur ne peut plus rafraîchir l'écran ni réagir aux actions de l'utilisateur. La page paraît gelée jusqu'à la fin du traitement. Avec un appel réseau asynchrone, le fil reste libre pendant l'attente.

**Dans quel cas préférerais-tu garder une promesse avec `.then()` plutôt que `async/await` ?**

- Pour une transformation courte et isolée (par exemple `fetch(url).then(r => r.json())`).
- Quand on ne se trouve pas dans une fonction `async` et qu'on ne veut pas en créer une.
- Quand on lance plusieurs promesses en parallèle avec `Promise.all`, `Promise.race` ou `Promise.allSettled`, où `.then()` reste pratique.
- Quand une fonction doit simplement retourner une promesse à l'appelant.

**Que se passe-t-il si une erreur n'est pas capturée dans un bloc async ?**

Une fonction `async` retourne une Promise. Si une erreur est levée (ou un `await` rejeté) sans `try...catch`, la Promise est **rejetée** et le code qui suit le `await` ne s'exécute pas. Si personne n'attrape ce rejet avec `.catch()` ou un `try...catch` chez l'appelant, le navigateur affiche `Uncaught (in promise)` dans la console et déclenche l'événement `unhandledrejection`. L'utilisateur ne voit rien : l'application reste bloquée sans message d'erreur. Dans Node.js, un rejet non géré peut même arrêter le processus.

### 5.7. Critères de réussite de la démo

- Le flux d'exécution est expliqué clairement.
- La version `async/await` renvoie les mêmes données que la version `.then()`.
- Les erreurs sont capturées avec `try...catch` (tester avec une mauvaise URL pour provoquer un 404).
- Le tableau comparatif est lisible et complet.
- La présentation respecte les 30 minutes.

---

## 6. Projet live coding : GitHub Users

### 6.1. Objectifs

- Comprendre le fonctionnement de `fetch()`.
- Récupérer et afficher des données depuis une API publique (GitHub).
- Manipuler le DOM pour créer dynamiquement des cartes utilisateurs.
- Ajouter une recherche filtrée côté client.
- Appliquer un style simple et responsive avec Tailwind CSS (ou Bootstrap).

### 6.2. Technologies

| Technologie | Rôle |
|---|---|
| HTML | Structure (input de recherche + conteneur des cartes) |
| Tailwind CSS / Bootstrap | Mise en forme rapide et responsive |
| JavaScript | Requêtes API, DOM, événements, filtrage |
| API GitHub Users | `https://api.github.com/users` |

Pour tester un profil précis : `https://api.github.com/users/octocat`.

### 6.3. Déroulé du live coding

1. **Introduction** : expliquer ce qu'est une API et le rôle de `fetch()`. Ouvrir l'URL de l'API dans le navigateur pour montrer le format JSON.
2. **Étape 1, structure HTML** : un champ de recherche et un conteneur vide.
3. **Étape 2, consommation de l'API** : `fetch()`, conversion en JSON, affichage dans la console, puis injection dans le DOM.
4. **Étape 3, cartes** : image, nom d'utilisateur, bouton vers le profil, stylisés avec Tailwind.
5. **Étape 4, recherche dynamique** : écouteur d'événement `input`, filtrage dans la liste déjà chargée.
6. **Étape 5, améliorations visuelles** : hover, arrondis, ombres, transitions, test responsive avec les DevTools.

### 6.4. Code proposé : `index.html`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>GitHub Users</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen">
  <main class="max-w-6xl mx-auto p-6">
    <h1 class="text-3xl font-bold text-center mb-6">Utilisateurs GitHub</h1>

    <!-- Champ de recherche -->
    <input
      id="search"
      type="text"
      placeholder="Rechercher un utilisateur..."
      class="w-full max-w-md mx-auto block p-3 rounded-lg border shadow-sm
             focus:outline-none focus:ring-2 focus:ring-blue-500 mb-8"
    />

    <!-- Message d'état (chargement / erreur / aucun résultat) -->
    <p id="status" class="text-center text-gray-500 mb-4"></p>

    <!-- Conteneur des cartes -->
    <section
      id="users"
      class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    ></section>
  </main>

  <script src="script.js"></script>
</body>
</html>
```

### 6.5. Code proposé : `script.js`

```javascript
const API_URL = "https://api.github.com/users";

const searchInput = document.getElementById("search");
const usersContainer = document.getElementById("users");
const status = document.getElementById("status");

// Liste complète chargée depuis l'API (le filtrage se fait côté client)
let users = [];

// Récupère les utilisateurs depuis l'API GitHub
async function fetchUsers() {
  status.textContent = "Chargement...";
  try {
    const response = await fetch(API_URL);

    // fetch ne rejette pas les erreurs HTTP : on vérifie response.ok
    if (!response.ok) {
      throw new Error("Erreur HTTP : " + response.status);
    }

    users = await response.json();
    status.textContent = "";
    displayUsers(users);
  } catch (error) {
    status.textContent = "Impossible de charger les utilisateurs : " + error.message;
  }
}

// Crée dynamiquement les cartes dans le DOM
function displayUsers(list) {
  usersContainer.innerHTML = "";

  if (list.length === 0) {
    status.textContent = "Aucun utilisateur trouvé.";
    return;
  }
  status.textContent = "";

  list.forEach((user) => {
    const card = document.createElement("article");
    card.className =
      "bg-white rounded-xl shadow-md p-5 flex flex-col items-center text-center " +
      "transition duration-300 hover:shadow-xl hover:-translate-y-1";

    card.innerHTML = `
      <img src="${user.avatar_url}" alt="Avatar de ${user.login}"
           class="w-24 h-24 rounded-full mb-4 border-4 border-blue-100" />
      <h2 class="text-lg font-semibold">${user.login}</h2>
      <a href="${user.html_url}" target="_blank" rel="noopener noreferrer"
         class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg
                hover:bg-blue-700 transition">
        Voir le profil
      </a>
    `;
    usersContainer.appendChild(card);
  });
}

// Recherche dynamique : filtre la liste déjà chargée
searchInput.addEventListener("input", (event) => {
  const text = event.target.value.toLowerCase().trim();
  const filtered = users.filter((user) =>
    user.login.toLowerCase().includes(text)
  );
  displayUsers(filtered);
});

fetchUsers();
```

**Remarques :**

- Un champ vide donne `includes("")` égal à `true` : tous les utilisateurs réapparaissent.
- L'API GitHub non authentifiée est limitée en nombre de requêtes par heure (rate limit). Si l'erreur 403 apparaît, attendre ou limiter les appels.
- Variante possible : recherche par début de nom avec `startsWith()` au lieu de `includes()`.
- Optimisation possible : limiter le nombre de cartes avec `users.slice(0, 12)`.

### 6.6. Livrables

- Une page HTML fonctionnelle affichant des profils GitHub.
- Recherche dynamique opérationnelle.
- Style responsive et propre.
- Code indenté et commenté.
- Lien GitHub du projet (repository ou GitHub Pages).

---

## 7. Veille 2 : Progressive Web Apps (PWA)

### 7.1. Objectifs d'apprentissage

- Expliquer les principes fondamentaux d'une PWA.
- Utiliser le Service Worker pour mettre en cache des ressources.
- Mettre en place un fichier `manifest.json`.
- Distinguer les différents états d'une requête réseau dans une PWA.

### 7.2. Concepts de base

Une **PWA** (Progressive Web App) est une application web qui se comporte comme une application native : installable, utilisable hors ligne, rapide et fiable.

**Avantages :** installation sur l'écran d'accueil sans store, fonctionnement hors ligne, chargement rapide grâce au cache, un seul code pour toutes les plateformes.

**Composants essentiels :**

| Composant | Rôle |
|---|---|
| **HTTPS** | Connexion sécurisée, obligatoire (sauf `localhost` en développement) |
| **Service Worker** | Script en arrière-plan qui intercepte les requêtes et gère le cache |
| **manifest.json** | Fichier de configuration : nom, icônes, couleur, mode d'affichage |

**Critères de conformité :** installable, fonctionne hors ligne, performante (audit Lighthouse).

### 7.3. Mise en œuvre pratique

**Structure du projet :**

```text
projet/
  index.html
  style.css
  script.js
  data.json
  manifest.json
  sw.js
  icons/
    icon-192.png
    icon-512.png
```

**`manifest.json` :**

```json
{
  "name": "GitHub Users",
  "short_name": "GHUsers",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

**Lien du manifest et enregistrement du Service Worker dans `index.html` :**

```html
<link rel="manifest" href="manifest.json" />
<meta name="theme-color" content="#2563eb" />

<script>
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        const reg = await navigator.serviceWorker.register("sw.js");
        console.log("Service Worker enregistré :", reg.scope);
      } catch (error) {
        console.error("Échec de l'enregistrement :", error);
      }
    });
  }
</script>
```

**`sw.js` : cache des fichiers HTML, CSS, JS et JSON avec la Cache API :**

```javascript
const CACHE_NAME = "ghusers-v1";
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/data.json",
  "/manifest.json",
];

// Installation : mise en cache des ressources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Activation : suppression des anciens caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Interception des requêtes : cache d'abord, réseau ensuite
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
```

### 7.4. États d'une requête réseau dans une PWA

| Situation | Ce qui se passe |
|---|---|
| Réseau OK, ressource en cache | Le Service Worker répond depuis le cache (stratégie cache-first) |
| Réseau OK, cache vide | La requête part vers le réseau, la réponse peut être mise en cache |
| Hors ligne, ressource en cache | La ressource est servie depuis le cache : l'application fonctionne |
| Hors ligne, cache vide | `fetch` échoue (promesse rejetée) : prévoir une page ou un message de secours |
| Réponse HTTP 404 ou 500 | La promesse est résolue : vérifier `response.ok` |

### 7.5. Tests et bonnes pratiques

1. Ouvrir les DevTools, onglet **Application**, section **Service Workers** : vérifier que le worker est *activated and running*.
2. Section **Manifest** : vérifier que le manifest est détecté, sans avertissement, avec les icônes.
3. Section **Cache Storage** : vérifier la liste des fichiers mis en cache.
4. Onglet **Network** : cocher **Offline**, recharger la page et observer que les fichiers viennent du *Service Worker*.
5. Lancer un audit **Lighthouse** (catégorie PWA / Installability) et viser un score supérieur à 80.
6. Pour déboguer : cocher *Update on reload*, utiliser *Unregister* et *Clear site data* si le cache sert une ancienne version.

### 7.6. Checklist PWA prête à déployer

- [ ] Application servie en **HTTPS**.
- [ ] `manifest.json` valide et lié dans le `<head>`.
- [ ] `name`, `short_name`, `start_url`, `display` renseignés.
- [ ] Icônes 192x192 et 512x512 présentes et accessibles.
- [ ] `theme-color` et `viewport` définis.
- [ ] Service Worker enregistré sans erreur dans la console.
- [ ] Ressources essentielles (HTML, CSS, JS, JSON) mises en cache.
- [ ] Application fonctionnelle en mode hors ligne.
- [ ] Gestion des versions de cache (suppression des anciens caches).
- [ ] Message ou page de secours quand le réseau et le cache sont indisponibles.
- [ ] Audit Lighthouse PWA supérieur à 80.
- [ ] Test d'installation sur mobile effectué.

### 7.7. Questions de réflexion

**Pourquoi une PWA doit-elle être servie en HTTPS ?**

Le Service Worker peut intercepter et modifier toutes les requêtes de l'application. En HTTP, un attaquant pourrait s'interposer (attaque de type *man-in-the-middle*) et injecter un faux Service Worker pour voler ou altérer des données. HTTPS garantit l'authenticité du serveur et la confidentialité des échanges. Les navigateurs refusent donc d'enregistrer un Service Worker hors HTTPS, sauf sur `localhost` pour le développement.

**Quand le Service Worker intercepte-t-il une requête et que se passe-t-il si le cache est vide ?**

Le Service Worker intercepte (événement `fetch`) chaque requête émise par les pages qu'il contrôle, c'est-à-dire celles situées dans son *scope*, après son activation. Avec la stratégie cache-first, il appelle `caches.match()` : si rien n'est trouvé (cache vide), il retourne `undefined` et le code de secours (`|| fetch(event.request)`) envoie la requête au réseau. En ligne, la ressource est récupérée normalement. Hors ligne, `fetch` est rejeté et l'utilisateur voit une erreur du navigateur, sauf si une page de secours a été prévue.

**Que se passe-t-il si le `manifest.json` est mal configuré lors de l'installation sur le téléphone ?**

Selon l'erreur, plusieurs problèmes peuvent apparaître : le navigateur ne propose pas l'installation (icônes manquantes ou de mauvaise taille, `start_url` ou `display` absents, JSON invalide), l'application s'installe avec un mauvais nom ou une icône par défaut, ou elle s'ouvre sur une page 404 si `start_url` est incorrect. Lighthouse et l'onglet *Manifest* des DevTools signalent ces erreurs.

### 7.8. Critères de réussite de la démo

- Service Worker enregistré sans erreur dans la console.
- `manifest.json` lié correctement et visible dans les DevTools.
- Ressources servies depuis le cache en mode hors ligne.
- Score Lighthouse PWA supérieur à 80.
- Présentation claire, dans les 30 minutes.

---

## 8. Ressources

- [MDN : Async functions](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/async_function)
- [JavaScript.info : async/await](https://fr.javascript.info/async-await)
- [MDN : try...catch](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/try...catch)
- [MDN : Progressive Web Apps](https://developer.mozilla.org/fr/docs/Web/Progressive_web_apps)
- [MDN : Service Worker API](https://developer.mozilla.org/fr/docs/Web/API/Service_Worker_API)
- [Chrome DevTools : Lighthouse](https://developer.chrome.com/docs/devtools/audits/pwa/)
- Console du navigateur (DevTools) pour tester le code async/await.
- API GitHub : <https://api.github.com/users>