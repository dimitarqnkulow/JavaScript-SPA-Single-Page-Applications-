import { html } from "../../node_modules/lit-html/lit-html.js";
import { searchFruit } from "../data/applications.js";
import { createSubmitHandler } from "../util.js";
import { fruitCard } from "./common/common.js";

const searchTemplate = (fruits, onSearch) => html`<section id="search">
  <div class="form">
    <h2>Search</h2>
    <form class="search-form" @submit=${onSearch}>
      <input type="text" name="search" id="search-input" />
      <button class="button-list">Search</button>
    </form>
  </div>
  <h4>Results:</h4>
  <div class="search-result">
    ${fruits && fruits.length > 0
      ? html`${fruits.map(fruitCard)}`
      : html`<p class="no-result">No result.</p>`}
  </div>
</section>`;

export async function searchView(ctx) {
  let fruits;
  ctx.render(searchTemplate(fruits, createSubmitHandler(onSearch)));

  async function onSearch({ search }) {
    if (search == "") {
      throw alert("No search criteria!");
    }
    fruits = await searchFruit(search);

    ctx.render(searchTemplate(fruits, createSubmitHandler(onSearch)));
  }
}
