import { ICharacter } from "../model/ICharacter";
import { IHtmlControl } from "./IHtmlControl";

export class CharacerInfo implements IHtmlControl<ICharacter> {

    public html: HTMLDivElement = <HTMLDivElement>(document.createElement('div'));

    genaratedHtml(val: ICharacter): HTMLDivElement {
        if (this.html)
        while (this.html.firstChild) {
            this.html.firstChild.remove();
        }

        this.html.innerHTML = `
      <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${val.image}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${val.name}</h5>
    <h7 class="card-title">${val.status}</h7>
    <p class="card-text"></p>
  </div>
</div>
      `;
        return this.html;
    }
}