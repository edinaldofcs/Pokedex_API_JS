import { Theme } from "../../theme/index.js";
import { controls } from "../HTML_Controls/variables.js";
import { maxPokemonsPerPage } from '../index.js'

const types = ["normal", "fighting", "flying", "ground", "ghost", "fire", "grass",
  "psychic", "dragon", "fairy", "poison", "rock", "steel", "water",
  "electric", "ice", "dark", "bug"
];

export const LoadNav = () => {
  var contents = ''
  types.map((pokeType) => {
    // console.log(element)
    contents += `
    <div class="asside__check">
            <input type="checkbox" id="${pokeType}" name="${pokeType}" data-check>
            <label for="${pokeType}">${pokeType}</label>
          </div>  
    `
  })
  controls.aside.innerHTML = `<summary><h2>Filter By Type</h2></summary>` + contents;
}

export const LoadCards = (pokemons, start, end) => {  

  let cardHtml = '';
  var number = 1;
  let typeHtml = '';

  for (let i = start; i < end; i++) {
    if (pokemons[i]) {
      pokemons[i].type.map((item) => {
        typeHtml += `<span style="border-color: ${Theme.colors[item]};
        color: ${Theme.colors[item]}">${item}</span>`
      })
      cardHtml += `
        <div class="pokecards__card  card${number}" data-singleCard>  
          <div class="pokecards__container">  
          ${Theme.BackGroundImage(Theme.RGBAConverter(Theme.colors[pokemons[number - 1].type[0]]))}   
          <img class="pokecards__img" src="${pokemons[i].image}" alt="${pokemons[i].image}" data-img>          
          </div>
          <p data-pokeName>${pokemons[i].name}</p>
          <div class="pokecards__types" data-types>${typeHtml}</div>
          <button class="pages__button" data-seeMore>See more</button>
        </div>`
    }

    if (number % maxPokemonsPerPage == 0) break
    number++;
    typeHtml = '';
  }
  controls.dataCard.innerHTML = cardHtml

  LoadButtons(pokemons)
}

function LoadButtons(pokemons) {
  let amountButtons = AmountPages(pokemons)

  var contents = `<button data-previous value="0" class="pages__btn">Previous</button>`

  for (let i = 0; i < amountButtons; i++) {
    if (i > 3) break
    contents += `<button id="change" value="${i + 1}" class="pages__btn btn__num ${i == 0 && "btn__selected"}">${i + 1}</button>`

  }
  contents += `<button data-next value="1" class="pages__btn">Next</button>`

  controls.btnForwardAndBack.innerHTML = contents;
}

export function AmountPages(pokemons){
  let amountButtons = Math.floor(pokemons.length / maxPokemonsPerPage)
  let rest = pokemons.length % maxPokemonsPerPage != 0 ? 1 : 0
  amountButtons += rest
  return amountButtons;
}

export const Load = {
  LoadNav,
  LoadCards,
  AmountPages
}