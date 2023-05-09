import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllBooks } from "../data/books.js";
import { bookCard } from "./common/bookCardView.js";

const catalogTemplate = (books) => html`
  <section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
    <!-- Display ul: with list-items for All books (If any) -->

    <ul class="other-books-list">
      ${books && books.length > 0
        ? books.map(bookCard)
        : html`<p class="no-books">No books in database!</p>`}
    </ul>
  </section>
`;

export async function catalogView(ctx) {
  const books = await getAllBooks();

  ctx.render(catalogTemplate(books));
}
