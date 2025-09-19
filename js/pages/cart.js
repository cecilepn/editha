// js/pages/cart.js
import { getCart } from '../utils/cart.js'

function renderCart() {
  const container = document.querySelector('.cart-items')
  const promoSection = document.querySelector('.promo')

  container.innerHTML = ''

  const cart = getCart()

  if (cart.length === 0) {
    container.innerHTML = '<p>Votre panier est vide.</p>'
    promoSection.style.display = 'none'
    return
  }

  cart.forEach(item => {
    const itemCart = document.createElement('item-cart')
    itemCart.dataset.item = JSON.stringify(item)
    container.appendChild(itemCart)
  })

  updateTotals()
}

function updateTotals() {
  const cart = getCart()
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  )
  const shipping = subtotal > 50 ? 0 : 15
  const total = subtotal + shipping

  document.querySelector('.promo').innerHTML = `
    <div class="flex flex-col gap-20">
      <label for="promo" class="h3"> Un code promo ?</label>
      <input type="text" name="promo" id="promo" />
    </div>
    <div class="flex flex-col gap-20">
      <div class="flex justify-between">
        <p>Sous-total :</p>
        <p>${subtotal.toFixed(2)} €</p>
      </div>
      <div class="flex justify-between">
        <p>Livraison :</p>
        <p>${shipping.toFixed(2)} €</p> 
      </div>
      <hr />
      <div class="flex justify-between">
        <p>Total :</p>
        <p>${total.toFixed(2)} €</p>
      </div>
    </div>
    <button class="add-to-cart w-full bg-black text-white">
      Passer au paiement
    </button>
  `
}

// Rafraîchir quand un item est supprimé
document.addEventListener('cartUpdated', () => {
  renderCart()
})

// Initialisation
renderCart()
