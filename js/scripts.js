// Éléments du DOM
const boutonsfavoris = document.querySelectorAll('.favoris');
const casesFiltre = document.querySelectorAll('fieldset input[type="checkbox"]');
const cartesRecettes = document.querySelectorAll('.recettes article');

// Initialisation des favoris depuis le localStorage
let favoris = JSON.parse(localStorage.getItem('favoris')) || [];

// Configuration des correspondances pour les filtres
const correspondancesFiltres = {
    categories: {
        'entree': 'entrée',
        'plat': 'plat',
        'dessert': 'dessert'
    },
    difficultes: {
        'facile': 'facile',
        'medium': 'moyen',
        'difficile': 'difficile'
    }
};

// Préparation des cartes de recettes avec les datasets
cartesRecettes.forEach(carte => {
    const spans = carte.querySelectorAll('div span');
    const temps = parseInt(spans[1].textContent);

    // Ajout des attributs data pour faciliter le filtrage
    carte.dataset.categorie = spans[0].textContent.toLowerCase();
    carte.dataset.temps = temps < 30 ? 'rapide' : temps <= 60 ? 'moyen' : 'long';
    carte.dataset.difficulte = spans[2].textContent.toLowerCase();
});

// Gestion des favoris
boutonsfavoris.forEach(bouton => {
    const article = bouton.closest('article');
    const titreRecette = article.querySelector('h3').textContent;

    // Mise à jour de l'état initial du bouton
    if (favoris.some(fav => fav.titre === titreRecette)) {
        bouton.textContent = '❤️';
    }

    bouton.addEventListener('click', () => {
        const donneesRecette = {
            titre: titreRecette,
            image: article.querySelector('img').src,
            imageAlt: article.querySelector('img').alt,
            categorie: article.dataset.categorie,
            temps: article.querySelector('div span:nth-child(2)').textContent,
            difficulte: article.dataset.difficulte,
            lien: article.querySelector('.voir a').getAttribute('href')
        };

        const index = favoris.findIndex(fav => fav.titre === donneesRecette.titre);

        if (index === -1) {
            // Ajout aux favoris
            favoris.push(donneesRecette);
            bouton.textContent = '❤️';
        } else {
            // Retrait des favoris
            favoris.splice(index, 1);
            bouton.textContent = '🤍';
        }

        // Sauvegarde dans le localStorage
        localStorage.setItem('favoris', JSON.stringify(favoris));
    });
});

// Fonction de mise à jour de la visibilité des recettes
function mettreAJourVisibiliteRecettes() {
    const filtresSelectionnes = {
        categorie: Array.from(document.querySelectorAll('fieldset:nth-of-type(1) input:checked')).map(input => input.id),
        temps: Array.from(document.querySelectorAll('fieldset:nth-of-type(2) input:checked')).map(input => input.id),
        difficulte: Array.from(document.querySelectorAll('fieldset:nth-of-type(3) input:checked')).map(input => input.id)
    };

    cartesRecettes.forEach(carte => {
        const estVisible =
            (filtresSelectionnes.categorie.length === 0 ||
                filtresSelectionnes.categorie.some(filtre =>
                    carte.dataset.categorie.includes(correspondancesFiltres.categories[filtre] || filtre))) &&
            (filtresSelectionnes.temps.length === 0 ||
                filtresSelectionnes.temps.includes(carte.dataset.temps)) &&
            (filtresSelectionnes.difficulte.length === 0 ||
                filtresSelectionnes.difficulte.some(filtre =>
                    carte.dataset.difficulte === (correspondancesFiltres.difficultes[filtre] || filtre)));

        carte.style.display = estVisible ? 'block' : 'none';
    });
}

// Écouteurs d'événements pour les filtres
casesFiltre.forEach(case_ => {
    case_.addEventListener('change', mettreAJourVisibiliteRecettes);
});