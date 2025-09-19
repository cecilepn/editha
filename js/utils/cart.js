// utils/cart.js
export function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || []
}

export function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(item) {
  const cart = getCart()
  cart.push(item)
  saveCart(cart)
}

export function removeFromCart(item) {
  let cart = getCart()

  // Chercher si un item identique existe
  const index = cart.findIndex(
    cartItem =>
      cartItem.title === item.title &&
      cartItem.format === item.format &&
      cartItem.color === item.color &&
      cartItem.text === item.text
  )

  if (index !== -1) {
    if (cart[index].quantity > 1) {
      // Si quantité > 1 → on décrémente seulement
      cart[index].quantity -= 1
    } else {
      // Sinon → on retire complètement
      cart.splice(index, 1)
    }
  }

  saveCart(cart)
}
