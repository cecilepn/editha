class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        <section class="footer-main-group">
          <div class="footer-logo-container">
            <a href="/" aria-label="Accueil Editha">
              <img src="/images/svg/logo.svg" alt="Logo Editha" class="w-full h-full">
            </a>
          </div>
          <div class="footer-contact-social-container">
            <address>
              <a href="mailto:editha@contact.com" class="h4">editha@contact.com</a>
            </address>
            <nav aria-label="Réseaux sociaux">
              <ul>
                <li><a href="https://twitter.com/editha" target="_blank" rel="noopener noreferrer" class="h4">Twitter</a></li>
                <li><a href="https://facebook.com/editha" target="_blank" rel="noopener noreferrer" class="h4">Facebook</a></li>
                <li><a href="https://instagram.com/editha" target="_blank" rel="noopener noreferrer" class="h4">Instagram</a></li>
              </ul>
            </nav>
          </div>
        </section>
        <section class="legal-section" aria-label="Informations légales">
          <div class="legal-flex">
            <span class="h6 legal-copyright">&copy; BOOKS, 2025</span>
            <nav aria-label="Liens légaux">
              <ul>
                <li><a href="/confidentiality">Politique de confidentialité</a></li>
                <li><a href="/privacy">Conditions générales de vente</a></li>
                <li><a href="/cookies">Cookie policy</a></li>
                <li><a href="/legal">Mentions légales</a></li>
              </ul>
            </nav>
          </div>
        </section>
      </footer>
    `
  }
}
customElements.define('app-footer', Footer)
