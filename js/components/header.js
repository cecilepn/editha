class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <div>
          <a href="/" aria-label="Accueil Editha">
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
          <button class="burger" aria-label="Menu" type="button">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
        
        <!-- Modal du menu burger -->
        <div class="burger-modal" aria-hidden="true">
          <div class="burger-modal-content">
            <button class="burger-close" aria-label="Fermer le menu">
              <span>×</span>
            </button>
            <nav aria-label="Navigation mobile">
              <ul>
                <li><a href="index.html">Boutique</a></li>
                <li><a href="pages/about.html">À propos</a></li>
                <li><a href="pages/contact.html">Connexion</a></li>
                <li><a href="pages/search.html">Recherche</a></li>
                <li><a href="pages/cart.html">Panier</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    `

    this.setupBurgerMenu()
  }

  setupBurgerMenu() {
    const burger = this.querySelector('.burger')
    const modal = this.querySelector('.burger-modal')
    const closeBtn = this.querySelector('.burger-close')
    const body = document.body

    burger.addEventListener('click', () => {
      modal.classList.add('active')
      modal.setAttribute('aria-hidden', 'false')
      body.classList.add('modal-open')
      burger.style.display = 'none'
    })

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active')
      modal.setAttribute('aria-hidden', 'true')
      body.classList.remove('modal-open')
      burger.style.display = 'flex'
    })

    // Fermer la modal en cliquant en dehors
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.remove('active')
        modal.setAttribute('aria-hidden', 'true')
        body.classList.remove('modal-open')
        burger.style.display = 'flex'
      }
    })
  }
}
customElements.define('app-header', Header)
