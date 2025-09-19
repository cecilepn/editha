import { fetchProducts } from '../utils/fetchData.js'
import { updatePrice } from '../utils/calculatePrice.js'
import { showErrorMessage } from '../utils/showError.js'
import { storage } from '../utils/handleLocalStorage.js'

// Produit courant global
let currentProduct = null

document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts()
  if (!products.length) return

  currentProduct = products[0]

  // Initialisations
  initProductInfo(currentProduct)
  initProductOptions(currentProduct)
  initCustomText()
  initRecommendations(products.slice(1, 4))

  // Premier calcul du prix
  updatePrice(currentProduct)
})

//  INFOS PRODUIT
const initProductInfo = product => {
  const productImage = document.querySelector('.productImage')
  const productTitle = document.querySelector('.productInfos h1')
  const productDescription = document.querySelector('.productInfos p')

  productImage.src = product.images[0].url
  productImage.alt = product.title
  productTitle.textContent = product.title
  productDescription.textContent = product.description

  // Ajouter prix si pas déjà présent
  if (!document.querySelector('.productPrice')) {
    const priceElement = document.createElement('p')
    priceElement.classList.add('productPrice', 'h4')
    document.querySelector('.productInfos').appendChild(priceElement)
  }
}

// OPTIONS PRODUIT
const initProductOptions = product => {
  // Formats
  const formatsFieldset = document.querySelector(
    '.productOptions fieldset:nth-of-type(1)'
  )
  formatsFieldset.innerHTML = '<legend>Format</legend>'
  Object.entries(product.formats).forEach(([format, details], index) => {
    formatsFieldset.insertAdjacentHTML(
      'beforeend',
      `
      <div class="flex items-center gap-10">
        <input type="radio" id="format-${index}" name="format" value="${format}" />
        <label for="format-${index}">${format}</label>
      </div>
    `
    )
  })

  // Couleurs
  const colorsFieldset = document.querySelector(
    '.productOptions fieldset:nth-of-type(2)'
  )
  colorsFieldset.innerHTML = '<legend>Couleurs</legend>'
  Object.keys(product.cover_colors).forEach((color, index) => {
    colorsFieldset.insertAdjacentHTML(
      'beforeend',
      `
      <div class="flex items-center gap-10">
        <input type="radio" id="color-${index}" name="color" value="${color}" />
        <label for="color-${index}"><span class="sr-only">${color}</span></label>
      </div>
    `
    )
  })

  // Restauration des sélections
  const saved = storage.load()
  if (saved) {
    if (saved.selectedFormat) {
      const formatRadio = document.querySelector(
        `input[name="format"][value="${saved.selectedFormat}"]`
      )
      if (formatRadio) formatRadio.checked = true
    }
    if (saved.selectedColor) {
      const colorRadio = document.querySelector(
        `input[name="color"][value="${saved.selectedColor}"]`
      )
      if (colorRadio) colorRadio.checked = true
    }
  }

  // Listeners
  document
    .querySelectorAll('input[name="format"], input[name="color"]')
    .forEach(input => {
      input.addEventListener('change', () => {
        saveAllSettings()
        if (currentProduct) updatePrice(currentProduct)
      })
    })
}

// RECOMMANDATIONS
const initRecommendations = products => {
  const recommendationsContainer = document.querySelector('#recommendations')
  recommendationsContainer.innerHTML = ''
  products.forEach(product => {
    recommendationsContainer.insertAdjacentHTML(
      'beforeend',
      `
      <div class="productReco">
        <img src="${product.images[0].url}" alt="${product.title}" class="productRecoImg w-full object-cover"/>
        <div class="flex flex-col gap-10">
          <h3>${product.title}</h3>
          <p>Auteur : ${product.author}</p>
          <p>Prix : ${product.general_price} €</p>
        </div>
      </div>
    `
    )
  })
}

// TEXTE PERSONNALISÉ
const initCustomText = () => {
  const textInput = document.getElementById('textcustom')
  if (!textInput) return

  // Ajout des contrôles
  const controls = `
    <div class="optionsCustomInput flex flex-col gap-20">
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
    </div>
    <div id="errorMessage" class="error-message" style="display:none;color:red;font-size:12px;"></div>
  `
  textInput.parentElement.insertAdjacentHTML('beforeend', controls)

  // Overlay
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

  // Restauration depuis storage
  const saved = storage.load()
  if (saved) {
    textInput.value = saved.text || ''
    textOverlay.textContent = saved.text || ''
    textOverlay.style.display = saved.text ? 'block' : 'none'
    if (saved.fontSize) {
      document.getElementById('textSize').value = saved.fontSize
      textOverlay.style.fontSize = saved.fontSize + 'px'
    }
    if (saved.fontFamily) {
      document.getElementById('textFont').value = saved.fontFamily
      textOverlay.style.fontFamily = saved.fontFamily
    }
    if (saved.color) {
      const colorRadio = document.querySelector(
        `input[name="textColor"][value="${saved.color}"]`
      )
      if (colorRadio) colorRadio.checked = true
      textOverlay.style.color = saved.color
    }
    if (saved.position) {
      textOverlay.style.left = saved.position.left + 'px'
      textOverlay.style.top = saved.position.top + 'px'
      textOverlay.style.transform = 'none'
    }
  }

  // Listeners
  textInput.addEventListener('input', e => {
    textOverlay.textContent = e.target.value
    textOverlay.style.display = e.target.value ? 'block' : 'none'
    saveAllSettings()
    if (currentProduct) updatePrice(currentProduct)
  })

  document.getElementById('textSize').addEventListener('change', e => {
    const size = parseInt(e.target.value)
    if (size >= 10 && size <= 50) {
      textOverlay.style.fontSize = size + 'px'
      saveAllSettings()
      if (currentProduct) updatePrice(currentProduct)
    } else {
      showErrorMessage('Taille de texte invalide')
    }
  })

  document.getElementById('textFont').addEventListener('change', e => {
    textOverlay.style.fontFamily = e.target.value
    saveAllSettings()
    if (currentProduct) updatePrice(currentProduct)
  })

  document.querySelectorAll('input[name="textColor"]').forEach(radio => {
    radio.addEventListener('change', e => {
      if (e.target.checked) {
        textOverlay.style.color = e.target.value
        saveAllSettings()
        if (currentProduct) updatePrice(currentProduct)
      }
    })
  })

  // Déplacement (drag & drop desktop)
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
      let newLeft = startLeft + (e.clientX - startX)
      let newTop = startTop + (e.clientY - startY)
      newLeft = Math.max(0, Math.min(newLeft, containerRect.width - rect.width))
      newTop = Math.max(0, Math.min(newTop, containerRect.height - rect.height))
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

// SAUVEGARDE
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
    if (currentProduct) updatePrice(currentProduct)
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error)
    showErrorMessage('Impossible de sauvegarder vos modifications')
  }
}
