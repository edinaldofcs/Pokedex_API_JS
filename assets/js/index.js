import { services } from "./services/index_API.js";
import { Load } from "./loadPage/index.js";
import { controls } from "./HTML_Controls/variables.js";
import { ButtonEvents } from "./HTML_Controls/ButtonsEvents.js";
import { Filter } from "./HTML_Controls/InputFilter.js";
import { CheckBoxFilter } from "./HTML_Controls/CheckBoxFilter.js";

Load.LoadNav();

export var pokeInfos;
export var pokeSearch;
export var maxPokemonsPerPage = 12;
export var firstPokemonNumber = 0;

(async () => {
  const amountPokemons = 1126;
  pokeInfos = await services.fetchPokemons(amountPokemons);
  pokeSearch = pokeInfos
  // console.log(pokeInfos)  
  Load.LoadCards(pokeSearch, firstPokemonNumber, maxPokemonsPerPage);
  ButtonEvents();
  Filter();
  CheckBoxFilter();
})();

export const updatePokeSearch = (pokemons)=>{
  pokeSearch = pokemons;
}


