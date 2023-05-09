import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteOffer, getOfferById } from "../data/offers.js";
import { getUserData } from "../util.js";

const detailsTemplate = (
  offer,
  isOwner,
  onDelete
) => html`<section id="details">
  <div id="details-wrapper">
    <img id="details-img" src="${offer.imageUrl}" alt="example1" />
    <p id="details-title">${offer.title}</p>
    <p id="details-category">
      Category: <span id="categories">${offer.category}</span>
    </p>
    <p id="details-salary">
      Salary: <span id="salary-number">${offer.salary}</span>
    </p>
    <div id="info-wrapper">
      <div id="details-description">
        <h4>Description</h4>
        <span>${offer.description}</span>
      </div>
      <div id="details-requirements">
        <h4>Requirements</h4>
        <span>${offer.requirements}</span>
      </div>
    </div>
    ${
      !isOwner
        ? html``
        : html`<div id="action-buttons">
            <a href="/data/offers/${offer._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn"
              >Delete</a
            >
          </div>`
    }
</section>`;

export async function detailsView(ctx) {
  const offerId = ctx.params.id;
  const offer = await getOfferById(offerId);

  const userId = getUserData()._id;
  const isOwner = userId == offer._ownerId;

  ctx.render(detailsTemplate(offer, isOwner, onDelete));

  function onDelete() {
    const choice = confirm("Are you sure you want to delete this offer?");

    if (choice) {
      deleteOffer(offerId);
      ctx.page.redirect("/catalog");
    }
  }
}
