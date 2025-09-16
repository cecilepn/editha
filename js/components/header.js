class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="text-white p-4">
        <h1>My Website</h1>
        <nav>
          <a href="index.html">Home</a>
          <a href="pages/about.html">About</a>
          <a href="pages/contact.html">Contact</a>
        </nav>
      </header>
    `
  }
}
customElements.define('app-header', Header)
