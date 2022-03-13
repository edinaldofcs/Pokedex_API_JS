import { controls } from "../HTML_Controls/variables.js";


export const ShowEmptyPage = ()=>{

  controls.dataCard.innerHTML = `
  <h1 style="color: #777; text-align: center;">No pokémon found</h1>
  `
}