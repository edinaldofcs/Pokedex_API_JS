import { controls } from './variables.js'
import { pokeSearch, maxPokemonsPerPage} from '../index.js'
import { Load } from '../loadPage/index.js'
import { Theme } from '../../theme/index.js'

export const ButtonEvents = ()=>{  
  controls.btnForwardAndBack.addEventListener('click', (event) => {
    let buttonClicked = event.target;
    if (buttonClicked.value === undefined) return
  
    if (!isNaN(buttonClicked.textContent)) {
      changePage(parseInt(buttonClicked.textContent) - 1)
      let normalizeValue = buttonClicked.value - 1;
      changeSelectionOfNumericalButtons(normalizeValue);
      changeValueButtonsPreviousAndNext(normalizeValue);
      return;
    }  
    btnPreviousOrNext(buttonClicked)  
  })
}

function btnPreviousOrNext(button) {
  if (button.value >= -1 && button.value <= 4 && button.value < Load.AmountPages(pokeSearch)) {
    let index_Value = getCorrectIndex(button.value)
    changePage(parseInt(controls.allChangeButtons()[index_Value].textContent) - 1)
    changeSelectionOfNumericalButtons(index_Value);
    changeValueButtonsPreviousAndNext(index_Value)
  }
}

function getCorrectIndex(buttonValue){
  let value = buttonValue;
  if (buttonValue == 4) {
    value--;
    IncrementAndDecrementeButtonsNumbers(1)
  }
  if (buttonValue == -1) {
    value++;
    IncrementAndDecrementeButtonsNumbers(-1)
  }
  return value
}

function IncrementAndDecrementeButtonsNumbers(num) {
  let change = controls.allChangeButtons();
  if (parseInt(change[change.length - 1].textContent) == Load.AmountPages(pokeSearch) && num > 0 ||
    parseInt(change[0].textContent) == 1 && num == -1) return
  change.forEach((element) => {
    element.textContent = parseInt(element.textContent) + num
  })
}

function changeValueButtonsPreviousAndNext(value) {
  controls.btnPrevious().value = parseInt(value) - 1
  if (value == 4) return
  controls.btnNext().value = parseInt(value) + 1
}

function changeSelectionOfNumericalButtons(value) {
  let change = controls.allChangeButtons();

  if (isNaN(value)) return
  change.forEach((element) => {
    element.classList.remove('btn__selected')
  })
  change[value].classList.toggle('btn__selected')
}

function changePage(buttonValue) {
  var initialValue = (parseInt(buttonValue) + 1) * maxPokemonsPerPage - maxPokemonsPerPage
  var finalValue = (parseInt(buttonValue) + 1) * maxPokemonsPerPage
  UpdateCards(pokeSearch, initialValue, finalValue);
}

const UpdateCards = (pokemons, start, end) => {
  // console.log(controls.pokeTypes()[0])
  var number = 0;
  for (let i = start; i < end; i++) {

    controls.pokeTypes()[number].innerHTML = ''
    if (pokemons[i]) {
      pokemons[i].type.forEach((element, index) => {
        if(index == 0){
          controls.svgColor()[number].style.fill = Theme.RGBAConverter(Theme.colors[element.type.name])          
        }
        controls.pokeTypes()[number].innerHTML += `<span style="
        border-color: ${Theme.colors[element.type.name]};
        color: ${Theme.colors[element.type.name]}">${element.type.name}</span>`
      });
      controls.imgPokemon()[number].src = pokemons[i].image
      controls.imgPokemon()[number].alt = pokemons[i].name
      controls.pokeName()[number].textContent = pokemons[i].name
      controls.singleCard()[number].style.display = 'flex'
    } else {
      controls.singleCard()[number].style.display = 'none'
    }
    number++;
  }
}