class Card extends HTMLElement {
  connectedCallback() {
    // Récupérer les attributs
    const imageUrl = this.getAttribute('image-url') || 'https://wallpaperaccess.com/full/4990824.png';
    const title1 = this.getAttribute('title1') || 'Lorem ipsum dolor sit amet.';
    const title2 = this.getAttribute('title2') || 'Lorem ipsum dolor sit amet.';
    const price = this.getAttribute('price') || '45,00€';
    const imageClass = this.getAttribute('image-class') || 'object-cover w-full';
    const cardClass = this.getAttribute('card-class') || '';
    const fullWidth = this.hasAttribute('full-width');
    
    this.innerHTML = `
      <div class="card flex flex-col w-fit p-4 ${cardClass}">
        <div class="card-img-container p-8 ${fullWidth ? 'full-width-container' : ''}">
          <img src="${imageUrl}" alt="" class="${imageClass}" />
        </div>
        <div class="card-content-row mt-4">
          <div class="card-text-container flex flex-col">
            <h5>${title1}</h5>
            <h5>${title2}</h5>
          </div>
          <div class="card-price-container ml-8">
            <p class="body-m font-bold">${price}</p>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('app-card', Card);
