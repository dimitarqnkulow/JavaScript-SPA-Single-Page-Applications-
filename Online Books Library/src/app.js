import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { layoutTemplate } from "./views/layout.js";
import { getUserData } from "./util.js";
import { homeView } from "./views/homeView.js";
import { loginView } from "./views/loginView.js";
import { registerView } from "./views/registerView.js";
import { logout } from "./data/auth.js";
import { catalogView } from "./views/catalogView.js";
import { addBookView } from "./views/addBookView.js";
import { detailsView } from "./views/detailsView.js";
import { editView } from "./views/editBookView.js";
import { myBooksView } from "./views/myBooksView.js";

const root = document.getElementById("container");

page(decorateContext);

page("/index.html", "/");
page("/", catalogView);
page("/login", loginView);
page("/register", registerView);
page("/logout", logoutAction);
page("/catalog", catalogView);
page("/create", addBookView);
page("/details/:id", detailsView);
page("/data/books/:id", editView);
page("/my-books", myBooksView);

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

  page.redirect("/catalog");
}
