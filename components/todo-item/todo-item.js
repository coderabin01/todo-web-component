const templateTodoItem = document.createElement('template');
templateTodoItem.innerHTML = `
<style>
  :host {
    display: flex;
    align-items: center;
    margin: 5px 0;
  }

  .completed {
    cursor: pointer;
    transition: all 0.3s;
    font-size: 24px;
  }

  .completed:hover {
    color: orange;
  }

  .name {
    flex: 1;
    font-size: 20px;
    margin: 5px 10px;
  }

  .completed.inactive {
    color: green;
  }

  .name.inactive {
    text-decoration: line-through;
  }
</style>
<div class="completed">&#10003;</div>
<div class="name"><slot></slot></div>
<todo-button>-</todo-button>
`;

class TodoItem extends HTMLElement {
    static get observedAttributes() {
        return ['completed'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(templateTodoItem.content.cloneNode(true));

        this._deleteTodoBtn = this.shadowRoot.querySelector('todo-button');
        this._completeTodoBtn = this.shadowRoot.querySelector('.completed');
        this._todoName = this.shadowRoot.querySelector('.name');

        this.onDeleteBtnClick();
        this.onCompleteBtnClick();
    }

    /**
     * toogles striking of line in todo item
     * @param {*} attrName 
     * @param {*} oldVal 
     * @param {*} newVal 
     */
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName === 'completed') {
            if (newVal === "true") {
                this._completeTodoBtn.classList.add('inactive');
                this._todoName.classList.add('inactive');
            } else {
                this._completeTodoBtn.classList.remove('inactive');
                this._todoName.classList.remove('inactive');
            }
        }
    }

    /**
     *  dispatch event on click of delete button
     */
    onDeleteBtnClick() {
        this._deleteTodoBtn.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('deleteTodo', { bubbles: true }));
        })
    }

    /**
     * dispatch event on click of complete button
     */
    onCompleteBtnClick() {
        this._completeTodoBtn.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('toggleCompleted', { bubbles: true }));
        })
    }
}

window.customElements.define('todo-item', TodoItem);