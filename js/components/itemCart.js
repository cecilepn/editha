import { getCart, saveCart, removeFromCart } from '../utils/cart.js'

class ItemCart extends HTMLElement {
  connectedCallback() {
    const item = JSON.parse(this.dataset.item)

    this.render(item)

    // Bouton supprimer complètement
    this.querySelector('.deleteBtn').addEventListener('click', () => {
      let cart = getCart().filter(
        cartItem =>
          !(
            cartItem.title === item.title &&
            cartItem.format === item.format &&
            cartItem.color === item.color &&
            cartItem.text === item.text
          )
      )
      saveCart(cart)
      document.dispatchEvent(new Event('cartUpdated'))
    })

    // Bouton diminuer quantité
    this.querySelector('.decrease').addEventListener('click', () => {
      removeFromCart(item) // décrémente ou supprime si = 0
      document.dispatchEvent(new Event('cartUpdated'))
    })

    // Bouton augmenter quantité
    this.querySelector('.increase').addEventListener('click', () => {
      const cart = getCart()
      const index = cart.findIndex(
        cartItem =>
          cartItem.title === item.title &&
          cartItem.format === item.format &&
          cartItem.color === item.color &&
          cartItem.text === item.text
      )
      if (index !== -1) {
        cart[index].quantity += 1
        saveCart(cart)
        document.dispatchEvent(new Event('cartUpdated'))
      }
    })
  }

  render(item) {
    this.innerHTML = `
      <div class="product w-full flex justify-between gap-20">
        <img
          class="productImage"
          src="${item.image}"
          alt="${item.title}" />
        <div class="productInfos w-full flex flex-col justify-between w-full">
          <div class="flex flex-col gap-10">
            <p><strong>${item.title}</strong></p>
            ${item.format ? `<p>Format : ${item.format}</p>` : ''}
            ${item.color ? `<p>Couleur : ${item.color}</p>` : ''}
            ${item.text ? `<p>Personnalisation : ${item.text}</p>` : ''}
            <p>${item.price} €</p>
          </div>
          <div class="flex items-center justify-between">
            <div class="quantity flex items-center gap-10">
              <button class="decrease border px-2">-</button>
              <span class="qty">${item.quantity}</span>
              <button class="increase border px-2">+</button>
            </div>
            <div class="deleteBtn text-red-500 cursor-pointer">Supprimer</div>
          </div>
        </div>
      </div>
    `
  }
}

customElements.define('item-cart', ItemCart)
