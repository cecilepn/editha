import { fetchProducts } from '../utils/fetchData.js'

document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts()

  if (products.length > 0) {
    const recommendationsContainer = document.querySelector('#recommendations')
    recommendationsContainer.innerHTML = ''

    products.slice(0, 3).forEach(product => {
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
