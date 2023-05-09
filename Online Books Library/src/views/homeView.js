import { html } from "../../node_modules/lit-html/lit-html.js";

//TODO REplace with actual view

const homeTemplate = () => html`
  <h1>Home Page</h1>
  <p>Welcome to our side</p>
`;

export function homeView(ctx) {
  ctx.render(homeTemplate());
}
