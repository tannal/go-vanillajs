import { API } from "./services/API.js";
import Router from "./services/Router.js";


window.addEventListener("DOMContentLoaded", event => {
    app.Router.init();
});

window.app = {
    Router,
    showError: (message = "There was an error.", goToHome = true) => {
        document.getElementById("alert-modal").showModal();
        document.querySelector("#alert-modal p").textContent = message; // Added 'message' as the content based on context

        if (goToHome) {
            document.querySelector("#alert-modal button").addEventListener("click", () => {
                app.Router.go("/");
            });
        }
    },
    closeError: () => {
        const modal = document.getElementById("alert-modal");
        if (modal) {
            modal.close();
        }
    },
    search: (event) => {
        event.preventDefault();
        const keywords = document.querySelector("input[type=search]").value;
        if (keywords.length>1) {
            app.Router.go(`/movies?q=${keywords}`)
        }
    },
    api: API
}