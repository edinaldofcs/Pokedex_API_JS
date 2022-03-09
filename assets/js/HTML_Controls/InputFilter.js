import { controls } from './variables.js'
import { pokeInfos, pokeSearch, maxPokemonsPerPage, firstPokemonNumber, updatePokeSearch } from '../index.js'
import { Load } from '../loadPage/index.js'
import { pokeCheck } from './CheckBoxFilter.js'
import { ShowEmptyPage } from '../loadPage/emptyPage.js';

export const Filter = () => {
  controls.input.addEventListener('input', () => {

    var pokeTemp;

    if (isCheck()) {
      pokeTemp = pokeCheck.filter(filterByInputValue)
    } else {
      pokeTemp = pokeInfos.filter(filterByInputValue)
    }

    updatePokeSearch(pokeTemp)

    if (showIsEmptyIfPokeSearchIsEmpty()) return ShowEmptyPage();

    Load.LoadCards(pokeSearch, firstPokemonNumber, maxPokemonsPerPage)

  })
}

function showIsEmptyIfPokeSearchIsEmpty() {
  return pokeSearch.length == 0
}

function filterByInputValue(val) {
  if (val.name.includes(controls.input.value.toLowerCase())) {
    return val
  }
}

function isCheck() {
  var checked = false
  controls.checkBox().forEach((el) => {
    if (el.checked) {
      checked = true;
    }
  })
  return checked;
}