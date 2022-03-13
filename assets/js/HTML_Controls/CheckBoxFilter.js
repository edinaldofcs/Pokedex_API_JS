import { controls } from './variables.js'
import { pokeInfos, pokeSearch, maxPokemonsPerPage, firstPokemonNumber, updatePokeSearch } from '../index.js'
import { Load } from '../loadPage/index.js'
import { isCheck } from './InputFilter.js';

export var pokeCheck;
export var pokemonsOnlyWithSelectedTypes;

const createArray = () => {
  var array = []
  controls.checkBox().forEach((el) => {
    if (el.checked) {
      array.push(el.name)
    }
  })
  return array
}

const updatepokeCheckByRestrictTypes = (array) => {
  pokemonsOnlyWithSelectedTypes = checkFilterByType(array)
  pokeCheck = pokemonsOnlyWithSelectedTypes
  updatePokeSearch(pokeCheck)
  Load.LoadCards(pokeSearch, firstPokemonNumber, maxPokemonsPerPage)
}

function checkFilterByType(array) {
  var arrayTemp = [];

  pokeInfos.filter(function (pokemon) {
    var isAvailable = true

    if (array.length == 1) {
      if (pokemon.type.length == 1) {
        array[0] != pokemon.type[0] && (isAvailable = false)
      }else{
        isAvailable = false
      }
    } else {
      array.forEach((item) => {
        if (item == pokemon.type[0] || (item == pokemon.type[1] && pokemon.type[1])) {

        } else {
          isAvailable = false
        }
      })
    }

    isAvailable && arrayTemp.push(pokemon);
  })
  return arrayTemp
}

export const CheckBoxFilter = () => {
  controls.checkArea.addEventListener('change', (e) => {

    const array = createArray();

    if (controls.slider.checked) {
      updatepokeCheckByRestrictTypes(array)
      return
    }

    pokeCheck = checkFilter(array)
    updatePokeSearch(pokeCheck)

    if (pokeSearch.length == 0 && array.length == 0) {
      updatePokeSearch(pokeInfos)
    }

    Load.LoadCards(pokeSearch, firstPokemonNumber, maxPokemonsPerPage)
  })

  //------------------------------------
  controls.slider.addEventListener('change', () => {

    const array = createArray();

    if (controls.slider.checked) {
      updatepokeCheckByRestrictTypes(array)
    } else {
      var pokeTemp;
      if (isCheck()) {
        pokeCheck = checkFilter(array)
        pokeTemp = pokeCheck
      } else {
        pokeTemp = pokeInfos
      }
      updatePokeSearch(pokeTemp)
      Load.LoadCards(pokeSearch, firstPokemonNumber, maxPokemonsPerPage)
    }
  })
}

function checkFilter(array) {
  var arrayTemp = [];
  pokeInfos.filter(function (pokemon) {
    pokemon.type.map((poketypes) => {
      if (array.includes(poketypes)) {
        arrayTemp.push(pokemon)
      }
    })
  })
  return arrayTemp
}
