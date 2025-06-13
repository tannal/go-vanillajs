

export class RegistrationPage extends HTMLElement {
    constructor() {
        super();
    }

    async render() {
    }

    connectedCallback() {
        const template = document.getElementById("template-register");
        const content = template.content.cloneNode(true);
        this.appendChild(content);
    }
}

customElements.define("registration-page", RegistrationPage);