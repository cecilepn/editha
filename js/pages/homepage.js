import '../components/card.js'
import { fetchProducts } from '../utils/fetchData.js'

// homepage script
document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts()
  if (!products.length) return

  // Sélection des conteneurs
  const container1 = document.querySelector('#container-1')
  const containerFull = document.querySelector('#container-fullwidth')
  const container2 = document.querySelector('#container-2')

  products.forEach((book, index) => {
    const card = document.createElement('app-card')

    // Mapper données JSON -> attributs du composant
    const imageUrl = book.images?.[0]?.url || ''
    const title1 = book.author
    const title2 = book.title
    const price = `${book.general_price.toFixed(2)}€`

    card.setAttribute('image-url', imageUrl)
    card.setAttribute('title1', title1)
    card.setAttribute('title2', title2)
    card.setAttribute('price', price)

    // Ajout du lien vers la page produit
    card.setAttribute('link', `/pages/configurateur.html?id=${index}`)

    // Placement selon l'index
    if (index < 2) {
      container1.appendChild(card)
    } else if (index === 2) {
      card.setAttribute('full-width', '')
      containerFull.appendChild(card)
    } else {
      container2.appendChild(card)
    }
  })
})
