

export class HomePage extends HTMLElement {
    connectedCallback() {
        this.template  = document.getElementById('template-home');
        const content = this.template.content.cloneNode(true);
        this.appendChild(content);
    }
} 



customElements.define('home-page', HomePage);