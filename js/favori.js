// Chargement et affichage des favoris
document.addEventListener('DOMContentLoaded', () => {
    const favoris = JSON.parse(localStorage.getItem('favoris')) || [];
    const conteneurRecettes = document.querySelector('.recettes .recette');

    // Affichage du message si aucun favori
    if (favoris.length === 0) {
        conteneurRecettes.innerHTML = '<p>Aucune recette en favoris pour le moment.</p>';
        return;
    }

    // Génération du HTML pour chaque recette en favori
    conteneurRecettes.innerHTML = favoris.map(recette => `
    <article data-titre="${recette.titre}">
      <img src="${recette.image}" alt="${recette.imageAlt}">
      <h3>${recette.titre}</h3>
      <div>
        <span>${recette.categorie}</span>
        <span>${recette.temps}</span>
        <span>${recette.difficulte}</span>
      </div>
      <button class="voir" aria-label="Voir la recette ${recette.titre}">
        <a href="${recette.lien}">Voir la recette</a>
      </button>
      <button class="favoris" aria-label="Retirer ${recette.titre} des favoris">❤️</button>
    </article>
  `).join('');

    // Gestion de la suppression des favoris
    document.querySelectorAll('.favoris').forEach(bouton => {
        bouton.addEventListener('click', () => {
            const article = bouton.closest('article');
            const titreRecette = article.dataset.titre;

            // Mise à jour du localStorage
            const favoris = JSON.parse(localStorage.getItem('favoris')) || [];
            const nouveauxFavoris = favoris.filter(fav => fav.titre !== titreRecette);
            localStorage.setItem('favoris', JSON.stringify(nouveauxFavoris));

            // Suppression visuelle de l'article
            article.remove();

            // Affichage du message si plus aucun favori
            if (nouveauxFavoris.length === 0) {
                conteneurRecettes.innerHTML = '<p>Aucune recette en favoris pour le moment.</p>';
            }
        });
    });
});