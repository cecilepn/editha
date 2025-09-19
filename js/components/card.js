class Card extends HTMLElement {
  connectedCallback() {
    const imageUrl =
      this.getAttribute('image-url') ||
      'https://wallpaperaccess.com/full/4990824.png'
    const title1 = this.getAttribute('title1') || 'Lorem ipsum dolor sit amet.'
    const title2 = this.getAttribute('title2') || 'Lorem ipsum dolor sit amet.'
    const price = this.getAttribute('price') || '45,00€'
    const fullWidth = this.hasAttribute('full-width')
    const link = this.getAttribute('link') || '#'

    this.innerHTML = `
      <a href="${link}" class="card flex flex-col gap-20 no-underline text-black">
        <div class="card-container-img ${fullWidth ? 'full-width' : ''}">
          <img src="${imageUrl}" alt="${title1}" class="h-full w-full" />
        </div>
        <div class="product-infos flex flex-col gap-20">
          <div class="flex flex-col gap-10 h4">
            <p>${title1}</p>
            <p>${title2}</p>
          </div>
          <p class="body-m font-bold">${price}</p>
        </div>
      </a>
    `
  }
}

customElements.define('app-card', Card)
