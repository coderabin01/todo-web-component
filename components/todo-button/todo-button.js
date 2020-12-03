const templateBtn = document.createElement('template');
templateBtn.innerHTML = `
<button><slot></slot></button>
`;

class TodoButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(templateBtn.content.cloneNode(true));
    }
}

window.customElements.define('todo-button', TodoButton);