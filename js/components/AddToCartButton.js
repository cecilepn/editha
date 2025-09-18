import { addToCart } from '../utils/cart.js'

class AddToCartButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <button class="add-to-cart w-full bg-black text-white">
        Ajouter au panier
      </button>
    `

    this.querySelector('button').addEventListener('click', () => {
      // Récupérer le produit affiché
      const productTitle =
        document.querySelector('.productInfos h1').textContent
      const productImage = document.querySelector('.productImage').src
      const productPrice = document
        .querySelector('.productPrice')
        .textContent.replace('Prix : ', '')
        .replace(' €', '')

      // Options sélectionnées
      const formatSelected =
        document.querySelector('input[name="format"]:checked')?.value || null
      const colorSelected =
        document.querySelector('input[name="color"]:checked')?.value || null
      const textCustom = document.querySelector('#textcustom')?.value || ''

      const cartItem = {
        title: productTitle,
        image: productImage,
        price: parseFloat(productPrice),
        format: formatSelected,
        color: colorSelected,
        text: textCustom,
        quantity: 1
      }

      // Ajouter au panier
      addToCart(cartItem)

      // Feedback utilisateur
      alert('Produit ajouté au panier !')
    })
  }
}

customElements.define('add-to-cart', AddToCartButton)
