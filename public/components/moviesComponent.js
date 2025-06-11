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
	})
}