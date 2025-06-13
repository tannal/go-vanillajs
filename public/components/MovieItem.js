
import Router from '../services/Router.js';

export class MovieItem extends HTMLElement {
  constructor(movie) {
    super();
    this.movie = movie;
    // this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.innerHTML = `
    <a class="navlink" href="/movies/${this.movie.id}">
      <article>
        <img src="${this.movie.poster_url}" alt="">
        <p>${this.movie.title} ${this.movie.release_year}</p>
      </article>
    </a>
  `;
    this.querySelector("a").onclick = (event) => {
        event.preventDefault();
        Router.go(`/movies/${this.movie.id}`);
    }
  }
}



customElements.define('movie-item', MovieItem);