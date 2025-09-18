class AddToCartButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <button class="add-to-cart w-full bg-black text-white">
        Ajouter au panier
      </button>
    `

    this.querySelector('button').addEventListener('click', () => {
      alert('Produit ajouté au panier !')
    })
  }
}

customElements.define('add-to-cart', AddToCartButton)
