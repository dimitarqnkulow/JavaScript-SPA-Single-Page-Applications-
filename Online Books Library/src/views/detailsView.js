import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteBook, getBookById } from "../data/books.js";
import { getUserData } from "../util.js";

const detailsTemplate = (book, isOwner, onDelete) => html` <section
  id="details-page"
  class="details"
>
  <div class="book-information">
    <h3>${book.title}</h3>
    <p class="type">Type: ${book.type}</p>
    <p class="img"><img src="${book.imageUrl}" /></p>

    ${isOwner
      ? html`<div class="actions">
          <a class="button" href="/data/books/${book._id}">Edit</a>
          <a @click=${onDelete} class="button" href="javascript:void(0)"
            >Delete</a
          >
        </div>`
      : null}
  </div>
  <div class="book-description">
    <h3>Description:</h3>
    <p>${book.description}</p>
  </div>
</section>`;

export async function detailsView(ctx) {
  const bookId = ctx.params.id;
  const book = await getBookById(bookId);
  const userData = getUserData();
  let isOwner;

  if (userData != null) {
    isOwner = userData._id == book._ownerId;
  } else {
    isOwner = false;
  }
  ctx.render(detailsTemplate(book, isOwner, onDelete));

  function onDelete() {
    const choice = confirm("Are you sure you want to delete this offer?");

    if (choice) {
      deleteBook(bookId);
      ctx.page.back();
    }
  }
}
