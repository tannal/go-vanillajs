import { API } from "./services/api.js";
import './components/HomePage.js'

window.app = {
    search: (event) => {
        event.preventDefault();
        const searchInput = document.querySelector('input[name="search"]');
        const query = searchInput.value.trim();

        if (query) {
            window.location.href = `/search?q=${encodeURIComponent(query)}`;
        } else {
            alert('Please enter a search term.');
        }
    },

    api: API

}