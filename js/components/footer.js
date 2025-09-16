class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="text-white p-4">
        <p>&copy; 2025 My Website</p>
      </footer>
    `
  }
}
customElements.define('app-footer', Footer)
