
const btnForwardAndBack = document.querySelector('[data-btn]')
const input = document.querySelector('[data-input]')
const dataCard = document.querySelector('[data-cards]')
const checkArea = document.querySelector('[data-detalhes]')
const aside = document.querySelector('[data-detalhes]')

const allChangeButtons = () => {
  return document.querySelectorAll('#change')
}
const btnNext = () => {
  return document.querySelector('[data-next]')
}
const btnPrevious = () => {
  return document.querySelector('[data-previous]')
}
const checkBox = () => {
  return document.querySelectorAll('[data-check]')
}
const imgPokemon = ()=>{
  return document.querySelectorAll('[data-img]');  
} 
const pokeName = ()=>{
  return document.querySelectorAll('[data-pokeName]');
} 
const singleCard = ()=>{
  return document.querySelectorAll('[data-singleCard]')
} 
const svgColor = ()=>{
  return document.querySelectorAll('[data-svg]')
} 
const pokeTypes = ()=>{
  return document.querySelectorAll('[data-types]')
}

export const controls = {
  btnForwardAndBack,
  input,
  dataCard,
  checkArea,
  aside,
  allChangeButtons,
  btnNext,
  btnPrevious,
  checkBox,
  imgPokemon,
  pokeName,
  singleCard,
  svgColor,
  pokeTypes
}