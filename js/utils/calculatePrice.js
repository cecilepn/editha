// Calculate price
export function calculatePrice(product) {
  const formatSelected = document.querySelector('input[name="format"]:checked')
  const colorSelected = document.querySelector('input[name="color"]:checked')
  const textCustom = document.querySelector('#textcustom')

  let price = product.general_price

  if (formatSelected) {
    const formatValue = formatSelected.value
    price += product.formats[formatValue].price
  }

  if (colorSelected) {
    const colorValue = colorSelected.value
    const coefficient = product.cover_colors[colorValue] ?? 0
    price = price + price * coefficient
  }

  if (textCustom && textCustom.value.trim() !== '') {
    price += 2
  }

  return price.toFixed(2)
}

// Updating price
export function updatePrice(product) {
  // Ensure price element exists
  let priceEl = document.querySelector('.productPrice')
  if (!priceEl) {
    const infos = document.querySelector('.productInfos')
    if (infos) {
      priceEl = document.createElement('p')
      priceEl.classList.add('productPrice', 'h4')
      infos.appendChild(priceEl)
    }
  }
  if (priceEl) priceEl.textContent = calculatePrice(product) + ' €'
}
