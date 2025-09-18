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
  cart = cart.filter(
    cartItem =>
      !(
        cartItem.title === item.title &&
        cartItem.format === item.format &&
        cartItem.color === item.color &&
        cartItem.text === item.text
      )
  )
  saveCart(cart)
}
