
import { html, render, directive } from 'https://unpkg.com/lit-html/lit-html.js?module';

class AsyncDirective extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const resolvePromise = directive((promise) => (part) => {
            // This first setValue call is synchronous, so 
            // doesn't need the commit
            part.setValue("Waiting for promise to resolve.");

            Promise.resolve(promise).then((resolvedValue) => {
                part.setValue(resolvedValue);
                part.commit();
            });
        });

        const waitForIt = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Promise is resolved.");
            }, 1000);
        });

        const myTemplate =
            html`<div>${resolvePromise(waitForIt)}</div>`;

        render(myTemplate, this.shadowRoot);
    }
}


window.customElements.define('async-directive', AsyncDirective);