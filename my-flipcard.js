class FlipCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  static style = /* css */ `
    *,
    *::before,
    *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :host {
      height: 100%;
      width: 100%;
      display: block;
      --card-width: 15rem;
      --card-hegiht: 25rem;

      --transition: transform 0.3s ease-in-out;

      --font-family: sans-serif;
      --box-shadow: 3px 3px 5px #555;

      --front-background: rgba(0, 0, 0, 0.005);
      --front-color: #222;
      --back-background: rgba(0, 0, 0, 0.005);
    }

    .card {
      font-family: var(--font-family);
      width: var(--card-width, 15rem);
      height: var(--card-height);
    }

    .card__content {
      position: relative;

      display: grid;
      place-items: center;

      height: var(--card-height);

      padding: 5rem;

      transition: var(--transition);
      transform-style: preserve-3d;

      text-align: center;
    }

    .card:hover .card__content {
      transform: rotateY(0.5turn);
    }

    .card__front,
    .card__back {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;

      display: grid;
      place-items: center;

      padding: 2rem;
      backface-visibility: hidden;
      height: var(--card-height);

      box-shadow: 0 0 1.5px rgba(0, 0, 0, 0.3);

      border-radius: 25px;
    }

    .card__front {
      background: var(--front-background);
      box-shadow: var(--box-shadow);
      color: var(--front-color);
    }
    
    .card__back {
      transform: rotateY(0.5turn);
      background: var(--back-background);
      box-shadow: var(--box-shadow);
      color: var(--back-color);
    }
`;

  static template = /* html */ `
  <template id="flipcard-template">
    <div class="card">
      <div class="card__content">
        <slot name="front" class="card__front">Front Content</slot>
        <slot name="back" class="card__back">Back Content</slot>
      </div>
    </div>
  </template>`;

  connectedCallback() {
    this.setStyles();
    this.setMarkup();
  }

  setStyles() {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = FlipCard.style;
    this.shadowRoot.appendChild(styleTag);
  }

  setMarkup() {
    const fragment = document
      .createRange()
      .createContextualFragment(FlipCard.template);

    const html = fragment
      .querySelector("#flipcard-template")
      .content.cloneNode(true);

    this.shadowRoot.appendChild(html);
  }
}

customElements.define("my-flipcard", FlipCard);
