
async function fetchPokemons(amountPokemons) {
  var list;
  await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${amountPokemons}`)
    .then(response => response.json())
    .then(data => {
      list = data.results;
    })
    .catch(err => console.log(err));
  return listPokemons (list);
}

async function listPokemons(pokemons) {
  let list = []
  for (let i = 0; i < pokemons.length; i++) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemons[i].name}`)
      .then(response => response.json())
      .then(data => {
        list.push(data);
      })
      .catch(err => console.log(err));
  }

  // console.log(list)
  return treatObject(list)
  // return arrangeInAlphabeticalOrder(list);
}

function arrangeInAlphabeticalOrder(list) {
  
  list.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
  return treatObject(list)
}

function treatObject(pokemons) {
  let pokeTemp = []
  pokemons.forEach((element) => {
    if (element.sprites.other.home.front_default) {
      let pokemon = {
        name: element.name,
        type: element.types,
        image: element.sprites.other.home.front_default,
      }
      pokeTemp.push(pokemon);
    }
  })
  return pokeTemp;
}

export const services = {
  fetchPokemons
}

