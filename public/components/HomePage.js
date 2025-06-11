import { API } from '../services/api.js';
import { MovieItem } from './MovieItem.js';

export class HomePage extends HTMLElement {
    async render() {
        const topMovies = await API.getTopMovies();
        renderMoviesInList(topMovies, this.querySelector("#top-10 ul"));

        const randomMovies = await API.getRandomMovies();
        renderMoviesInList(randomMovies, this.querySelector("#random ul"));

        function renderMoviesInList(movies, ul) {
            ul.innerHTML = "";
            movies.forEach(movie => {
                const li = document.createElement("li");
                // li.textContent = movie.title; // Assuming movie has a title property
                li.appendChild(new MovieItem(movie));
                ul.appendChild(li);
            });
        }
    }

    connectedCallback() {
        this.template = document.getElementById('template-home');
        const content = this.template.content.cloneNode(true);
        this.appendChild(content);

        this.render().catch(error => {
            console.error("Error rendering HomePage:", error);
        });
    }
}



customElements.define('home-page', HomePage);