const findPokemons = async () => {
  const getpokemons = name => `https://pokeapi.co/api/v2/type/${name}`
  const pokeRequests = []

  for (let i = 1; i < 19; i++) {
    pokeRequests.push(fetch(getpokemons([i])).then(resp => resp.json()))
  }

  var typesOfPokemons;
  await Promise.all(pokeRequests)
    .then(response => {
      typesOfPokemons = response
    })
  return filterPokemons(typesOfPokemons)
}

function filterPokemons(typesOfPokemons) {
  const PokemonsFilteredByTypes = []

  for (let i = 0; i < typesOfPokemons.length; i++) {
    PokemonsFilteredByTypes.push({
      type: typesOfPokemons[i].name,
      name: []
    })
    typesOfPokemons[i].pokemon.forEach((pokemon) => {
      PokemonsFilteredByTypes[i].name.push(pokemon.pokemon.name)
    })
  }
  return findPokemonsAndImages(PokemonsFilteredByTypes)
}

const findPokemonsAndImages = async (PokemonsFilteredByTypes) => {
  const amount = await getAmount();
  const fullPokelist = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${amount}`)
    .then(response => response.json())
    .then(data => {
      return data
    })
  return createPokeObject(fullPokelist, PokemonsFilteredByTypes)
}

function createPokeObject(fullPokelist, PokemonsFilteredByTypes) {
  const PokeBase = []
  const imgIsNull = [718, 10061, 10080, 10081, 10082, 10083, 10084, 10085, 10093, 10116, 10121, 10122, 10128, 10129, 10130, 10131, 10132, 10133, 10134, 10135, 10144, 10145, 10146, 10149, 10150, 10151, 10153, 10154, 10158, 10159, 10181, 10182, 10183, 10187, 10192, 10228]

  fullPokelist.results.forEach((pokemon) => {
    var img = pokemon.url.match(/\d+/g)
    img = parseInt(img[1])
    if (!imgIsNull.includes(img)) {
      PokeBase.push({
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${img}.png`,
        type: []
      })
    }
  })
  return treatObject(PokemonsFilteredByTypes, PokeBase)
}

const getAmount = async () => {
  const pokeAmount = await fetch(`https://pokeapi.co/api/v2/pokemon`)
    .then(response => response.json())
    .then(data => data.count)
  return pokeAmount;
}

function treatObject(poketipo, pokemons) {
  pokemons.forEach((item) => {

    for (let i = 0; i < poketipo.length; i++) {

      if (poketipo[i].name.includes(item.name)) {
        item.type.push(poketipo[i].type)
      }
    }
  })
  return pokemons
}

export const services = {
  findPokemons,
}

