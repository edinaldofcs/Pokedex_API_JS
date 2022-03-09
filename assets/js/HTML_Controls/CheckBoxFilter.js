import { controls } from './variables.js'
import { pokeInfos, pokeSearch, maxPokemonsPerPage, firstPokemonNumber, updatePokeSearch } from '../index.js'
import { Load } from '../loadPage/index.js'
import { ShowEmptyPage } from '../loadPage/emptyPage.js';

export var pokeCheck;

export const CheckBoxFilter = () => {
  controls.checkArea.addEventListener('change', (e) => {
    var array = []
    controls.checkBox().forEach((el) => {
      if (el.checked) {
        array.push(el.name)
      }
    })

    pokeCheck = checkFilter(array)
    // console.log(pokeCheck.length)
    updatePokeSearch(pokeCheck)

    if (pokeSearch.length == 0 && array.length == 0) {
      updatePokeSearch(pokeInfos)
    }else if(pokeSearch.length == 0){
      ShowEmptyPage();
      return
    }
    Load.LoadCards(pokeSearch, firstPokemonNumber, maxPokemonsPerPage)
  })
}

function checkFilter(array) {
  var arrayTemp = [];
  pokeInfos.filter(function (pokemon) {
    pokemon.type.map((poketypes) => {
      if (array.includes(poketypes.type.name)) {
        arrayTemp.push(pokemon)
      }
    })
  })
  return arrayTemp
}