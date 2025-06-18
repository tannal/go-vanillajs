import { API } from "./services/api.js";
import Router from "./services/Router.js";
import Store from "./services/Store.js";

window.addEventListener("DOMContentLoaded", event => {
    app.Router.init();
});

window.app = {
    Router,
    Store,
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
        if (keywords.length > 1) {
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
    getFavorites: async () => {
        try {
            return await API.fetch("/api/account/favorites");
        } catch (e) {
            app.Router.go("/account/")
        }
    },
    getWatchlist: async () => {
        try {
            return await API.fetch("/api/account/watchlist");
        } catch (e) {
            app.Router.go("/account/")
        }

    },
    saveToCollection: async (movie_id, collection) => {
        return await API.send("/api/account/save-to-collection/", {
            movie_id, collection
        });
    },
    register: async (event) => {
        event.preventDefault();
        const formData = new FormData(event?.target || document.querySelector("#template-register form"));
        const name = formData.get("name") || "";
        const email = formData.get("email") || "";
        const password = formData.get("password") || "";
        const passwordConfirmation = formData.get("password-confirmation") || "";

        const errors = [];
        if (name.length < 4) errors.push("Enter your complete name");
        if (password.length < 7) errors.push("Enter a password with at least 7 characters");
        if (email.length < 4) errors.push("Enter your complete email");
        if (password != passwordConfirmation) errors.push("Passwords don't match");
        formData.delete("password-confirmation");

        if (errors.length == 0) {
            const response = await API.register(formData);
            if (response.success) {
                app.Store
                app.Router.go("/account/");
            } else {
                app.showError(response.message);
            }
        } else {
            app.showError(errors.join(". "));
        }

    },
    login: async (event) => {
        event.preventDefault();
        const formData = new FormData(event?.target || document.querySelector("#template-login form"));
        const email = formData.get("email") || "";
        const password = formData.get("password") || "";

        const errors = [];
        if (password.length < 7) errors.push("Enter a password with at least 7 characters");
        if (email.length < 4) errors.push("Enter your complete email");

        if (errors.length == 0) {
            const response = await API.login(email, password);
            if (response.success) {
                app.Store.jwt = response.jwt;
                // app.Store.user = response.user;
                // app.Router.go("/account/");
            } else {
                app.showError(response.message);
            }
        } else {
            app.showError(errors.join(". "));
        }
    },
    logout: () => {
        app.Store.jwt = null;
        localStorage.removeItem("jwt");
        app.Router.go("/");
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