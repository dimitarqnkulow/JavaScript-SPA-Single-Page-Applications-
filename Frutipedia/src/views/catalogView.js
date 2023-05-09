import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllFruits } from "../data/fruits.js";
import { fruitCard } from "./common/common.js";

const catalogTemplate = (fruits) => html`<h2>Fruits</h2>
  ${fruits <= 0
    ? html`<h2>No fruit info yet.</h2> `
    : html`<section id="dashboard">${fruits.map(fruitCard)}</section>`}`;

export async function catalogView(ctx) {
  const fruits = await getAllFruits();

  ctx.render(catalogTemplate(fruits));
}
