class productCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="productCard flex flex-col gap-20">
          <img
            src="https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY="
            alt="" />
          <div class="flex justify-between">
            <p>Lorem ipsum</p>
            <p>44€</p>
          </div>
          <p>Options :</p>
        </div>
    `
  }
}
customElements.define('product-card', productCard)
