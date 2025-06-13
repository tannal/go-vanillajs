import { HomePage } from "../components/HomePage.js";
import { MovieDetailsPage } from "../components/MovieDetailsPage.js";
import { MoviesPage } from "../components/MoviesPage.js";
import { AccountFavoritePage } from "../components/AccountFavoritePage.js";
import { RegistrationPage } from "../components/RegistrationPage.js";
import { LoginPage } from "../components/LoginPage.js";

export const routes = [
  {
    path: "/",
    component: HomePage
  },
  {
    path: /\/movies\/(\d+)/,
    component: MovieDetailsPage
  },
  {
    path: "/movies",
    component: MoviesPage
  },
  {
    path: "/account/favorites",
    component: AccountFavoritePage
  },
  {
    path: "/account/register",
    component: RegistrationPage,
  },
  {
    path: "/account/login",
    component: LoginPage,
  },

]