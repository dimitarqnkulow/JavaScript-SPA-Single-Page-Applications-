import { html } from "../../node_modules/lit-html/lit-html.js";
import { getOfferById, updateOffer } from "../data/offers.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (offer, onEdit) => html` <section id="edit">
  <div class="form">
    <h2>Edit Offer</h2>
    <form class="edit-form" @submit=${onEdit}>
      <input
        type="text"
        name="title"
        id="job-title"
        .value="${offer.title}"
        placeholder="Title"
      />
      <input
        type="text"
        name="imageUrl"
        id="job-logo"
        .value="${offer.imageUrl}"
        placeholder="Company logo url"
      />
      <input
        type="text"
        name="category"
        id="job-category"
        .value="${offer.category}"
        placeholder="Category"
      />
      <textarea
        id="job-description"
        name="description"
        placeholder="Description"
        .value="${offer.description}"
        rows="4"
        cols="50"
      ></textarea>
      <textarea
        id="job-requirements"
        name="requirements"
        placeholder="Requirements"
        .value="${offer.requirements}"
        rows="4"
        cols="50"
      ></textarea>
      <input
        type="text"
        name="salary"
        id="job-salary"
        placeholder="Salary"
        .value="${offer.salary}"
      />

      <button type="submit">post</button>
    </form>
  </div>
</section>`;

export async function editView(ctx) {
  const offerId = ctx.params.id;
  const offer = await getOfferById(offerId);

  ctx.render(editTemplate(offer, createSubmitHandler(onEdit)));

  async function onEdit({
    title,
    imageUrl,
    category,
    description,
    requirements,
    salary,
  }) {
    if (
      [title, imageUrl, category, description, requirements, salary].some(
        (f) => f == ""
      )
    ) {
      throw alert("All fields are requierd!");
    }
    await updateOffer(offerId, {
      title,
      imageUrl,
      category,
      description,
      requirements,
      salary,
    });
    ctx.page.redirect("/catalog");
  }
}
