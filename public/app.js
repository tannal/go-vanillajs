import { API } from "./services/api.js";
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
    register : (event) => {
        event.preventDefault();
        const form = document.querySelector("form#register");
        const data = new FormData(form);
        API.register(data).then(() => {
            app.Router.go("/account/favorites");
        }).catch(error => {
            app.showError(error.message);
        });
    },
    api: API
}