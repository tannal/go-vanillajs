import { HomePage } from "../components/HomePage.js";
import { MovieDetailsPage } from "../components/MovieDetailsPage.js";
import { MoviesPage } from "../components/MoviesPage.js";
import FavoritePage from "../components/FavoritePage.js";
import { RegistrationPage } from "../components/RegistrationPage.js";
import { LoginPage } from "../components/LoginPage.js";
import { AccountPage } from "../components/AccountPage.js";
import WatchListPage from "../components/WatchListPage.js";

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
    path: "/account/register",
    component: RegistrationPage,
  },
  {
    path: "/account/login",
    component: LoginPage,
  },
  {
    path: "/account",
    component: AccountPage,
  },
  {
    path: "/account/profile",
    component: AccountPage,
    loggedIn: true,
  },
  {
    path: "/account/favorites",
    component: FavoritePage,
    loggedIn: true
  },
  {
    path: "/account/watchlist",
    component: WatchListPage,
    loggedIn: true
  },

]