import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteFruit, getFruitById } from "../data/fruits.js";
import { getUserData } from "../util.js";

const detailsTemplate = (fruit, isOwner, onDelete) => html`<section
  id="details"
>
  <div id="details-wrapper">
    <img id="details-img" src="${fruit.imageUrl}" alt="example1" />
    <p id="details-title">${fruit.name}</p>
    <div id="info-wrapper">
      <div id="details-description">
        <p>${fruit.description}</p>
        <p id="nutrition">Nutrition</p>
        <p id="details-nutrition">${fruit.nutrition}</p>
      </div>

      ${isOwner
        ? html`<div id="action-buttons">
            <a href="/edit/${fruit._id}" id="edit-btn">Edit</a>
            <a @click="${onDelete}href" ="javascript:void(0)" id="delete-btn"
              >Delete</a
            >
          </div>`
        : null}
    </div>
  </div>
</section>`;

export async function detailsView(ctx) {
  const fruitId = ctx.params.id;
  let isOwner = false;
  const userData = await getUserData();
  const fruit = await getFruitById(fruitId);
  if (userData && userData._id == fruit._ownerId) {
    isOwner = true;
  }
  ctx.render(detailsTemplate(fruit, isOwner, onDelete));

  function onDelete() {
    const choice = confirm("Are you sure you want to delete this fruit?");

    if (choice) {
      deleteFruit(fruitId);
      ctx.page.redirect("/catalog");
    }
  }
}
