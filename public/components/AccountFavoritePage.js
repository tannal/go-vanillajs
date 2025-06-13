
import { API } from "../services/api.js";

export class AccountFavoritePage extends HTMLElement {
    constructor() {
        super();
        this.template = document.getElementById('template-account-favorite');
    }

    async render() {
        const favoriteMovies = await API.getFavoriteMovies();
        const ul = this.querySelector("ul");
        ul.innerHTML = "Account Favorite Movies:";
        favoriteMovies.forEach(movie => {
            const li = document.createElement("li");
            li.appendChild(new MovieItem(movie));
            ul.appendChild(li);
        });
    }

    connectedCallback() {
        const content = this.template.content.cloneNode(true);
        this.appendChild(content);
        
        this.render().catch(error => {
            console.error("Error rendering AccountFavoritePage:", error);
        });
    }
}

customElements.define("account-favorite-page", AccountFavoritePage);