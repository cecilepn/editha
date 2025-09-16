class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        <div>
          <a href="/" aria-label="Accueil Editha">
            <img src="editha/images/logo.png" alt="Logo Editha">
          </a>
        </div>
        <address>
          <a href="mailto:lorem@ipsum.com">lorem@ipsum.com</a>
        </address>
        <nav aria-label="Réseaux sociaux">
          <ul>
            <li><a href="https://twitter.com/editha" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://facebook.com/editha" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com/editha" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </nav>
        <section aria-label="Informations légales">
          <p>&copy; BOOKS, 2025</p>
          <nav aria-label="Liens légaux">
            <ul>
              <li><a href="/confidentiality">Politique de confidentialité</a></li>
              <li><a href="/privacy">Conditions générales de vente</a></li>
              <li><a href="/cookies">Cookie policy</a></li>
              <li><a href="/legal">Mentions légales</a></li>
            </ul>
          </nav>
        </section>
      </footer>
    `;
  }
}
customElements.define('app-footer', Footer)
