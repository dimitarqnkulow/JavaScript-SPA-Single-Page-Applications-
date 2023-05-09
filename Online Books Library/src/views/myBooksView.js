import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyBooks } from "../data/books.js";
import { getUserData } from "../util.js";
import { bookCard } from "./common/bookCardView.js";

const myBooksTemplate = (myBooks) => html`<section
  id="my-books-page"
  class="my-books"
>
  <h1>My Books</h1>
  <ul class="my-books-list">
    ${myBooks && myBooks.length > 0
      ? myBooks.map(bookCard)
      : html`<p class="no-books">No books in database!</p>`}
  </ul>
</section>`;

export async function myBooksView(ctx) {
  const userId = getUserData()?._id;
  const myBooks = await getMyBooks(userId);
  console.log(myBooks);
  ctx.render(myBooksTemplate(myBooks));
}
