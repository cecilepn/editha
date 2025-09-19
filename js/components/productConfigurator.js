import { fetchProducts } from '../utils/fetchData.js'
import { updatePrice } from '../utils/calculatePrice.js'
import { showErrorMessage } from '../utils/showError.js'
import { storage } from '../utils/handleLocalStorage.js'

// Affichage des données
document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts()
  if (!products.length) return

  const mainProduct = products[0]

  // Initialiser les informations du produit
  initProductInfo(mainProduct)

  // Initialiser les options (formats et couleurs)
  initProductOptions(mainProduct)

  // Initialiser le texte personnalisé
  initCustomText()

  // Initialiser les recommandations
  initRecommendations(products.slice(1, 4))
  if (products.length > 0) {
    const mainProduct = products[0]

    // Principales informations
    const productImage = document.querySelector('.productImage')
    const productTitle = document.querySelector('.productInfos h1')
    const productDescription = document.querySelector('.productInfos p')

    productImage.src = mainProduct.images[0].url
    productImage.alt = mainProduct.title
    productTitle.textContent = mainProduct.title
    productDescription.textContent = mainProduct.description

    // Zone de prix
    const priceElement = document.createElement('p')
    priceElement.classList.add('productPrice', 'h4')
    document.querySelector('.productInfos').appendChild(priceElement)

    // Formats options
    const formatsFieldset = document.querySelector(
      '.productOptions fieldset:nth-of-type(1)'
    )
    formatsFieldset.innerHTML = '<legend>Format</legend>'

    Object.entries(mainProduct.formats).forEach(([format, details], index) => {
      const id = `format-${index}`
      const option = document.createElement('div')
      option.classList.add('flex', 'items-center', 'gap-10')

      option.innerHTML = `
        <input type="radio" id="${id}" name="format" value="${format}" />
        <label for="${id}">${format}</label>
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
      option.classList.add('flex', 'items-center', 'gap-10')

      option.innerHTML = `
        <input type="radio" id="${id}" name="color" value="${color}" />
        <label for="${id}"><span class="sr-only">${color}</span></label>
      `
      colorsFieldset.appendChild(option)
    })

    // Listeners sur les options
    document.querySelectorAll('input[name="format"]').forEach(input => {
      input.addEventListener('change', () => updatePrice(mainProduct))
    })

    document.querySelectorAll('input[name="color"]').forEach(input => {
      input.addEventListener('change', () => updatePrice(mainProduct))
    })

    // Listener sur le champ texte personnalisé
    document.querySelector('#textcustom').addEventListener('input', () => {
      updatePrice(mainProduct)
    })

    // Initialisation du prix
    updatePrice(mainProduct)

    // Affichage des produits recommandées
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
          <p>${product.general_price} €</p>
        </div>
      `
      recommendationsContainer.appendChild(card)
    })
  }
})

// Initialise les informations du produit principal
const initProductInfo = product => {
  const productImage = document.querySelector('.productImage')
  const productTitle = document.querySelector('.productInfos h1')
  const productDescription = document.querySelector('.productInfos p')

  productImage.src = product.images[0].url
  productImage.alt = product.title
  productTitle.textContent = product.title
  productDescription.textContent = product.description
}

// Initialise et gère les options du produit (formats et couleurs)
const initProductOptions = product => {
  // Formats
  const formatsFieldset = document.querySelector(
    '.productOptions fieldset:nth-of-type(1)'
  )
  formatsFieldset.innerHTML = '<legend>Format</legend>'

  Object.entries(product.formats).forEach(([format, details], index) => {
    const option = document.createElement('div')
    option.classList.add('flex', 'items-center', 'gap-10')
    option.innerHTML = `
      <input type="radio" id="format-${index}" name="format" value="${format}" />
      <label for="format-${index}">${format}</label>
    `
    formatsFieldset.appendChild(option)
  })

  // Couleurs
  const colorsFieldset = document.querySelector(
    '.productOptions fieldset:nth-of-type(2)'
  )
  colorsFieldset.innerHTML = '<legend>Couleurs</legend>'

  Object.keys(product.cover_colors).forEach((color, index) => {
    const option = document.createElement('div')
    option.classList.add('flex', 'items-center', 'gap-10')
    option.innerHTML = `
      <input type="radio" id="color-${index}" name="color" value="${color}" />
      <label for="color-${index}"><span class="sr-only">${color}</span></label>
    `
    colorsFieldset.appendChild(option)
  })

  // Restaurer et gérer la sauvegarde des options
  setTimeout(() => {
    const savedSettings = storage.load()
    if (savedSettings) {
      // Restaurer les sélections
      if (savedSettings.selectedFormat) {
        const formatRadio = document.querySelector(
          `input[name="format"][value="${savedSettings.selectedFormat}"]`
        )
        if (formatRadio) formatRadio.checked = true
      }
      if (savedSettings.selectedColor) {
        const colorRadio = document.querySelector(
          `input[name="color"][value="${savedSettings.selectedColor}"]`
        )
        if (colorRadio) colorRadio.checked = true
      }
    }

    // Ajouter les listeners
    document
      .querySelectorAll('input[name="format"], input[name="color"]')
      .forEach(radio => {
        radio.addEventListener('change', saveAllSettings)
      })
  }, 100)
}

// Initialise les recommandations de produits
const initRecommendations = products => {
  const recommendationsContainer = document.querySelector('#recommendations')
  recommendationsContainer.innerHTML = ''

  products.forEach(product => {
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

// Initialise le système de texte personnalisé
const initCustomText = () => {
  const textInput = document.getElementById('textcustom')
  if (!textInput) return

  // Ajouter les contrôles
  const controls = document.createElement('div')
  controls.className = 'flex flex-col gap-10'
  controls.innerHTML = `
    <div class="flex gap-10 items-center">
      <label for="textSize">Taille:</label>
      <select id="textSize" class="text-size-selector">
        <option value="14">Petite</option>
        <option value="18" selected>Standard</option>
        <option value="24">Grande</option>
        <option value="32">Très grande</option>
      </select>
    </div>
    <div class="flex gap-10 items-center">
      <label for="textFont">Police:</label>
      <select id="textFont" class="text-font-selector">
        <option value="Arial, sans-serif">Arial</option>
        <option value="Georgia, serif">Georgia</option>
        <option value="'Times New Roman', serif">Times New Roman</option>
        <option value="'Courier New', monospace">Courier New</option>
        <option value="Impact, sans-serif">Impact</option>
      </select>
    </div>
    <div class="flex gap-10 items-center">
      <label for="textColor">Couleur:</label>
      <div class="flex gap-10">
        <input type="radio" id="colorBlack" name="textColor" value="#000000" checked />
        <label for="colorBlack" class="color-option color-black"></label>
        <input type="radio" id="colorWhite" name="textColor" value="#FFFFFF" />
        <label for="colorWhite" class="color-option color-white"></label>
        <input type="radio" id="colorRed" name="textColor" value="#FF0000" />
        <label for="colorRed" class="color-option color-red"></label>
      </div>
    </div>
    <div id="errorMessage" class="error-message" style="display: none; color: red; font-size: 12px;"></div>
  `
  textInput.parentElement.appendChild(controls)

  // Créer l'élément texte overlay
  const container = document.querySelector('.product-image-container')
  if (!container) return

  const textOverlay = document.createElement('div')
  textOverlay.id = 'customTextOverlay'
  textOverlay.className = 'custom-text-overlay'
  textOverlay.style.cssText = `
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    font-size: 18px; color: #000000; font-weight: bold; font-family: Arial, sans-serif;
    text-shadow: 1px 1px 2px rgba(255,255,255,0.8); cursor: move; user-select: none;
    z-index: 10; white-space: nowrap; display: none;
  `
  container.appendChild(textOverlay)

  // Restaurer les paramètres sauvegardés
  const savedSettings = storage.load()
  if (savedSettings) {
    textInput.value = savedSettings.text || ''
    textOverlay.textContent = savedSettings.text || ''
    textOverlay.style.display = savedSettings.text ? 'block' : 'none'

    if (savedSettings.fontSize) {
      document.getElementById('textSize').value = savedSettings.fontSize
      textOverlay.style.fontSize = savedSettings.fontSize + 'px'
    }
    if (savedSettings.fontFamily) {
      document.getElementById('textFont').value = savedSettings.fontFamily
      textOverlay.style.fontFamily = savedSettings.fontFamily
    }
    if (savedSettings.color) {
      const colorRadio = document.querySelector(
        `input[name="textColor"][value="${savedSettings.color}"]`
      )
      if (colorRadio) {
        colorRadio.checked = true
        textOverlay.style.color = savedSettings.color
      }
    }
    if (savedSettings.position) {
      textOverlay.style.left = savedSettings.position.left + 'px'
      textOverlay.style.top = savedSettings.position.top + 'px'
      textOverlay.style.transform = 'none'
    }
  }

  // Event listeners
  textInput.addEventListener('input', e => {
    textOverlay.textContent = e.target.value
    textOverlay.style.display = e.target.value ? 'block' : 'none'
    saveAllSettings()
  })

  document.getElementById('textSize').addEventListener('change', e => {
    const size = parseInt(e.target.value)
    if (size >= 10 && size <= 50) {
      textOverlay.style.fontSize = size + 'px'
      saveAllSettings()
    } else {
      showErrorMessage('Taille de texte invalide')
    }
  })

  document.getElementById('textFont').addEventListener('change', e => {
    textOverlay.style.fontFamily = e.target.value
    saveAllSettings()
  })

  document.querySelectorAll('input[name="textColor"]').forEach(radio => {
    radio.addEventListener('change', e => {
      if (e.target.checked) {
        textOverlay.style.color = e.target.value
        saveAllSettings()
      }
    })
  })

  // Déplacement souris uniquement (desktop)
  let isDragging = false
  textOverlay.addEventListener('mousedown', e => {
    isDragging = true
    const startX = e.clientX
    const startY = e.clientY
    const rect = textOverlay.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    const startLeft = rect.left - containerRect.left
    const startTop = rect.top - containerRect.top

    const handleMouseMove = e => {
      if (!isDragging) return
      const deltaX = e.clientX - startX
      const deltaY = e.clientY - startY
      let newLeft = startLeft + deltaX
      let newTop = startTop + deltaY

      // Contraintes
      const maxLeft = containerRect.width - rect.width
      const maxTop = containerRect.height - rect.height
      newLeft = Math.max(0, Math.min(newLeft, maxLeft))
      newTop = Math.max(0, Math.min(newTop, maxTop))

      textOverlay.style.left = newLeft + 'px'
      textOverlay.style.top = newTop + 'px'
      textOverlay.style.transform = 'none'
    }

    const handleMouseUp = () => {
      isDragging = false
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      saveAllSettings()
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    e.preventDefault()
  })
}

// Sauvegarde tous les paramètres actuels
const saveAllSettings = () => {
  try {
    const textInput = document.getElementById('textcustom')
    const textSizeSelect = document.getElementById('textSize')
    const textFontSelect = document.getElementById('textFont')
    const customTextElement = document.getElementById('customTextOverlay')

    const settings = {
      text: textInput?.value || '',
      fontSize: parseInt(textSizeSelect?.value) || 18,
      fontFamily: textFontSelect?.value || 'Arial, sans-serif',
      color:
        document.querySelector('input[name="textColor"]:checked')?.value ||
        '#000000',
      position: {
        left: parseInt(customTextElement?.style.left) || 0,
        top: parseInt(customTextElement?.style.top) || 0
      },
      selectedFormat: document.querySelector('input[name="format"]:checked')
        ?.value,
      selectedColor: document.querySelector('input[name="color"]:checked')
        ?.value
    }
    storage.save(settings)
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
    showErrorMessage('Impossible de sauvegarder vos modifications')
  }
}
