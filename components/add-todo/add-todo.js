const template = document.createElement('template');

template.innerHTML = `
<style>
:host {
    display: flex;
    color: #333;
    align-items: center;
  }

  input {
    flex: 1;
    border: none;
    border-bottom: 1px solid gray;
    box-sizing: border-box;
    padding: 5px 10px;
    margin-right: 15px;
    font-size: 22px;
  }

  input:focus {
    outline: none;
    border-bottom: 1px solid #3f51b5;
  }
</style>
<input type='text' /> <todo-button>+</todo-button>`
    ;

class AddTodo extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = "";

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this._input = this.shadowRoot.querySelector('input');
        this._addButton = this.shadowRoot.querySelector('todo-button');

        this._addButton.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('addTodo'));
        })
    }

    get value() {
        return this._input.value;
    }

    set value(val) {
        this._input.value = val;
    }
}

window.customElements.define('add-todo', AddTodo);