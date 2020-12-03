const templateTwo = document.createElement('template');
templateTwo.innerHTML = `
<div class="name"><slot></slot></div>
<todo-button>-</todo-button>
`;

class TodoItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(templateTwo.content.cloneNode(true));

        this._deleteTodoBtn = this.shadowRoot.querySelector('todo-button');

        this.onDeleteBtnClick();
    }

    onDeleteBtnClick() {
        this._deleteTodoBtn.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('deleteTodo', { bubbles: true }));
            console.log("delete todo")
        })
    }

}

window.customElements.define('todo-item', TodoItem);