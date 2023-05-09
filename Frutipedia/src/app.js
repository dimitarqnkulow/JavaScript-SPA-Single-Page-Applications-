import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { layoutTemplate } from "./views/layout.js";
import { getUserData } from "./util.js";
import { homeView } from "./views/homeView.js";
import { loginView } from "./views/loginView.js";
import { registerView } from "./views/registerView.js";
import { logout } from "./data/auth.js";
import { getAllFruits } from "./data/fruits.js";
import { catalogView } from "./views/catalogView.js";
import { createView } from "./views/createView.js";
import { detailsView } from "./views/detailsView.js";
import { editView } from "./views/editView.js";
import { searchView } from "./views/searchView.js";

const root = document.body;
console.log(getAllFruits());
page(decorateContext);
page("/index.html", "/");
page("/", homeView);
page("/login", loginView);
page("/register", registerView);
page("/logout", logoutAction);
page("/catalog", catalogView);
page("/create", createView);
page("/details/:id", detailsView);
page("/edit/:id", editView);
page("/search", searchView);

page.start();

function decorateContext(ctx, next) {
  ctx.render = renderView;

  next();
}

//TODO Inject dependencies
function renderView(content) {
  const userData = getUserData();
  render(layoutTemplate(userData, content), root);
}

function logoutAction(ctx) {
  logout();

  page.redirect("/");
}
