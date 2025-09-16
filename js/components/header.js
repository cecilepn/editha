class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <div>
          <a href="index.html" aria-label="Accueil Editha">
            <img src="http://freelogopng.com/images/all_img/1657952641google-logo-png-image.png" alt="Logo Editha">
          </a>
        </div>
        <nav aria-label="Navigation principale">
          <ul>
            <li><a href="index.html">Boutique</a></li>
            <li><a href="pages/about.html">À propos</a></li>
            <li><a href="pages/contact.html">Connexion</a></li>
            <li>
              <form action="pages/search.html" method="get" role="search" aria-label="Recherche">
                <label for="header-search" class="visually-hidden"></label>
                <a href="pages/search.html" aria-label="Recherche">
                  <img src="https://tse1.mm.bing.net/th/id/OIP.j1sMPSP-emIbWhpgbf50zQHaHa?r=0&pid=Api" alt="Recherche" style="height: 24px; width: 24px; object-fit: contain; border: none; background: none; cursor: pointer;" />
                </a>
              </form>
            </li>
            <li><a href="pages/cart.html">Panier</a></li>
          </ul>
        </nav>
      </header>
    `;
  }
}
customElements.define('app-header', Header)
