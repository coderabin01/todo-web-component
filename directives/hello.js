import { html, render, directive } from 'https://unpkg.com/lit-html/lit-html.js?module';

class HelloDirective extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const directve = directive((value) => (part) => { part.setValue(value) });
        const template = html`<div>Hello ${directve('World')}</div>`
        render(template, this.shadowRoot);
    }
}

window.customElements.define('hello-directive', HelloDirective);