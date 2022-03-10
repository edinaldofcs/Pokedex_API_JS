const getAmount = async () => {
  const pokeAmount = await fetch(`https://pokeapi.co/api/v2/pokemon`)
  .then(response => response.json())
  .then(data => data.count)  
  return pokeAmount;
}

const findPokemons = async () => {
  const pokeAmount = await getAmount();
  const fullList = await fetchPokemons(pokeAmount)
  
  const getpokemons = name => `https://pokeapi.co/api/v2/pokemon/${name}`
  
  const pokemons = []
  for (let i in fullList) {
    pokemons.push(fetch(getpokemons(fullList[i])).then(resp => resp.json()))
  }
  
  var list;
  await Promise.all(pokemons)
  .then(response => {
    list = response
  })
  
  return treatObject(list)
}

async function fetchPokemons(amountPokemons) {
  var list;
  await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${amountPokemons}`)
    .then(response => response.json())
    .then(data => {
      list = data.results;
    })
    .catch(err => console.log(err));

  const pokemons = []

  for (let i = 0; i < amountPokemons; i++) {
    pokemons.push(list[i].name)
  }

  return pokemons;
}

function treatObject(list) {
  var filterList = []
  for (let pokemon of list) {
    filterList.push({
      name: pokemon.name,
      image: pokemon.sprites.other.home.front_default,
      type: pokemon.types
    })
  }
  return filterList
}

export const services = {
  findPokemons,
}

