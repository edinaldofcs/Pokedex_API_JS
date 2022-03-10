import { services } from "./services/index_API.js";
import { Load } from "./loadPage/index.js";
import { ButtonEvents } from "./HTML_Controls/ButtonsEvents.js";
import { Filter } from "./HTML_Controls/InputFilter.js";
import { CheckBoxFilter } from "./HTML_Controls/CheckBoxFilter.js";

export var pokeInfos;
export var pokeSearch;
export var maxPokemonsPerPage = 12;
export var firstPokemonNumber = 0;

(async () => {
  Load.LoadNav();
  pokeInfos = await services.findPokemons();  
  pokeSearch = pokeInfos
  Load.LoadCards(pokeSearch, firstPokemonNumber, maxPokemonsPerPage);
  ButtonEvents();
  Filter();
  CheckBoxFilter();
})();

export const updatePokeSearch = (pokemons) => {
  pokeSearch = pokemons;
}


