

export  class MoviesSelectComponent extends HTMLElement {
    connectedCallback() {
        const template = document.getElementById("template-movies-select");
        const content = template.content.cloneNode(true);
        this.appendChild(content);

        this.loadGenres();
    }

    async loadGenres() {
        const genres = await API.getGenres();
        const select = this.querySelector("#filter");
        select.innerHTML = `
            <option value=''>Filter by Genre</option>
        `;
        genres.forEach(genre => {
            var option = document.createElement("option");
            option.value = genre.id;
            option.textContent = genre.name;
            select.appendChild(option);
        });
    }
}