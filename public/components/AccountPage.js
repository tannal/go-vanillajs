
import { API } from "../services/api.js";

export class AccountPage extends HTMLElement {
    constructor() {
        super();
        this.template = document.getElementById('template-account');
    }

    async render() {
        if (localStorage.getItem("jwt") === null) {
            console.error("User is not logged in, redirecting to login page.");
            app.Router.go("/account/login");
            return;
        } else {
            const user = await API.getCurrentUser();
            const content = this.template.content.cloneNode(true);
            content.querySelector("#account-name").textContent = user.name;
            this.appendChild(content);
        }

    }

    connectedCallback() {

        this.render().catch(error => {
            console.error("Error rendering AccountFavoritePage:", error);
        });
    }
}

customElements.define("account-page", AccountPage);