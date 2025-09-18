import { getCart, saveCart } from '../utils/cart.js'

class ItemCart extends HTMLElement {
  connectedCallback() {
    const item = JSON.parse(this.dataset.item) // récupère les données passées en attribut

    this.innerHTML = `
      <div class="product flex justify-between gap-20">
        <img
          class="productImage"
          src="${item.image}"
          alt="${item.title}" />
        <div class="productInfos flex flex-col justify-between w-full">
          <div class="flex flex-col gap-10">
            <p><strong>${item.title}</strong></p>
            ${item.format ? `<p>Format : ${item.format}</p>` : ''}
            ${item.color ? `<p>Couleur : ${item.color}</p>` : ''}
            ${item.text ? `<p>Personnalisation : ${item.text}</p>` : ''}
            <p>${item.price} €</p>
          </div>
          <div class="deleteBtn text-red-500 cursor-pointer">Supprimer</div>
        </div>
      </div>
    `

    // Gestion du bouton supprimer
    this.querySelector('.deleteBtn').addEventListener('click', () => {
      let cart = getCart()
      cart = cart.filter(
        cartItem =>
          !(cartItem.title === item.title && cartItem.text === item.text)
      )
      saveCart(cart)
      this.remove()
      document.dispatchEvent(new Event('cartUpdated'))
    })
  }
}

customElements.define('item-cart', ItemCart)
