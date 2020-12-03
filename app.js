const MOCK_TODOS = [
    { id: 1, name: 'Learn Vue', completed: false },
    { id: 2, name: 'Learn React', completed: false },
    { id: 3, name: 'Learn Angular', completed: true },
    { id: 4, name: 'Learn Web Components', completed: false }
];

class TodoApp {
    constructor() {
        this._todos = [...MOCK_TODOS.reverse()];
        this._addTodo = document.querySelector('#add-todo');
        this._todoList = document.querySelector('#todo-list');

        this.addTodoEventListener();
        this.deleteTodoEventListener();

        this.renderTodoList();

    }

    addTodoEventListener() {
        this._addTodo.addEventListener('addTodo', ev => {
            if (!this._addTodo.value) {
                return;
            } else {
                const todo = {
                    id: this.getTodoId(),
                    name: this._addTodo.value,
                    complete: false
                }

                this._todos = [todo, ...this._todos];
                this.renderTodoList();
                this._addTodo.value = null;
                console.log(this._todos);
            }
        })
    }

    deleteTodoEventListener() {
        this._todoList.addEventListener('deleteTodo', (ev) => {
            const element = ev.target;
            console.log(+element.id);
            this._todos = this._todos.filter(td => td.id !== +element.id);
            this._todoList.removeChild(element);
        })
    }

    renderTodoList() {
        this._todoList.innerHTML = this._todos.map((todo) => this.mapTodoToElement(todo)).join('');
    }

    mapTodoToElement(todo) {
        return `<todo-item id="${todo.id}" name="${todo.name}"> ${todo.name} </todo-item>`;
    }

    getTodoId() {
        const id = this._todos[0] ? this._todos[0].id : 0;
        return id + 1;
    }
}

new TodoApp();