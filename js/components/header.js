class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <div>
          <a href="index.html" aria-label="Accueil Editha">
            <img src="editha/images/logo.png" alt="Logo Editha">
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
                <input id="header-search" name="q" type="search" placeholder="Rechercher...">
                <button type="submit">OK</button>
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
