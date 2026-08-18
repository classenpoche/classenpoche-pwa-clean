// mascotte.js
// Ce script injecte automatiquement une mascotte en haut et au centre de la page.

(function () {
  // --- Style de la mascotte ---
  const style = document.createElement('style');
  style.textContent = `
    #mascotte-container {
      position: fixed;
      top: 20px;
      left: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: sans-serif;
      pointer-events: none;
      animation: mascotte-flotte 3s ease-in-out infinite;
    }

    #mascotte-container img {
      width: 150px;
      height: auto;
      filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));
    }

    @keyframes mascotte-flotte {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
  `;
  document.head.appendChild(style);

  // --- Conteneur de la mascotte ---
  const container = document.createElement('div');
  container.id = 'mascotte-container';

  // --- Image de la mascotte ---
  const mascotte = document.createElement('img');
  mascotte.src = "images/enfants.jpg";
  mascotte.alt = "Mascotte";

  container.appendChild(mascotte);

  // --- Insertion dans la page une fois le DOM prêt ---
  function ajouterMascotte() {
    document.body.appendChild(container);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ajouterMascotte);
  } else {
    ajouterMascotte();
  }
})();
