import { fetchProducts } from '../utils/fetchData.js'

document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts()

  if (products.length > 0) {
    const mainProduct = products[0]

    // Main informations
    const productImage = document.querySelector('.productImage')
    const productTitle = document.querySelector('.productInfos h1')
    const productDescription = document.querySelector('.productInfos p')

    productImage.src = mainProduct.images[0].url
    productImage.alt = mainProduct.title
    productTitle.textContent = mainProduct.title
    productDescription.textContent = mainProduct.description

    // Formats options
    const formatsFieldset = document.querySelector(
      '.productOptions fieldset:nth-of-type(1)'
    )
    formatsFieldset.innerHTML = '<legend>Format</legend>'

    Object.entries(mainProduct.formats).forEach(([format, details], index) => {
      const id = `format-${index}`
      const option = document.createElement('div')
      option.classList.add('flex', 'items-center', 'gap-5')

      option.innerHTML = `
        <input type="radio" id="${id}" name="format" value="${format}" />
        <label for="${id}">${format} (${details.price} €)</label>
      `
      formatsFieldset.appendChild(option)
    })

    // Colors options
    const colorsFieldset = document.querySelector(
      '.productOptions fieldset:nth-of-type(2)'
    )
    colorsFieldset.innerHTML = '<legend>Couleurs</legend>'

    Object.keys(mainProduct.cover_colors).forEach((color, index) => {
      const id = `color-${index}`
      const option = document.createElement('div')
      option.classList.add('flex', 'items-center', 'gap-5')

      option.innerHTML = `
        <input type="radio" id="${id}" name="color" value="${color}" />
        <label for="${id}">${color}</label>
      `
      colorsFieldset.appendChild(option)
    })

    // Recommended products
    const recommendationsContainer = document.querySelector('#recommendations')
    recommendationsContainer.innerHTML = ''

    products.slice(1, 4).forEach(product => {
      const card = document.createElement('div')
      card.classList.add('productReco')

      card.innerHTML = `
        <img src="${product.images[0].url}" alt="${product.title}" class="productRecoImg w-full object-cover"/>
        <div class="flex flex-col gap-10">
          <h3>${product.title}</h3>
          <p>Auteur : ${product.author}</p>
          <p>Prix : ${product.general_price} €</p>
        </div>
      `
      recommendationsContainer.appendChild(card)
    })
  }
})
