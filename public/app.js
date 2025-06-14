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
    searchOrderChange: (order) => {
        console.log("Order changed to:", order);
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        if (query) {
            app.Router.go(`/movies?q=${query}&order=${order}`);
        } else {
            app.showError("No search query provided.");
        }
    },
    searchFilterChange: (genre) => {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        if (query) {
            app.Router.go(`/movies?q=${query}&genre=${genre}`);
        } else {
            app.showError("No search query provided.");
        }
    },
    register: async (event) => {
        event.preventDefault();
        const formData = new FormData(event?.target || document.querySelector("#template-register form"));
        console.log("Registering user with data:", formData.get("email"), formData.get("password"));
        await API.send("/api/account/register", {email: formData.get("email"), password: formData.get("password"), name: formData.get("name")});
        Router.go("/account/login");
    },
    authenticate: async (event) => {
        event.preventDefault();
        const formData = new FormData(event?.target || document.querySelector("#template-login form"));
        await API.send("/api/account/authenticate", {email: formData.get("email"), password: formData.get("password")})

        Router.go("/");
    },   
    send: async (service, args) => {
        try {
            const response = await fetch(API.baseURL + service, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(args)
            });
            const result = await response.json();
            return result;
        } catch (e) {
            console.error(e);
            app.showError();
        }
    },   

    api: API
}