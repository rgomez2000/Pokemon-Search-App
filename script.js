const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const spriteContainer = document.getElementById("sprite-container");
const spriteContainerFemale = document.getElementById("sprite-container-female");
const spriteContainerShiny = document.getElementById("sprite-container-shiny");
const spriteContainerShinyFemale = document.getElementById("sprite-container-shiny-female");
const pokemonTypes = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");


const getPokemon = async () => {
  try {
    const pokemonNameOrId = searchInput.value.toLowerCase();
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`);
    const data = await res.json();
    
    setPokemonInfo(data)
  } catch (err) {
    alert("Pokémon not found")
    console.log(err);
  }
};


const setPokemonInfo = (data) => {
  const { name, id, weight, height, types, sprites, stats } = data;

  pokemonName.textContent = `${name[0].toUpperCase() + name.slice(1)}`;
  pokemonId.textContent = `#${id}`;
  pokemonWeight.textContent = `Weight: ${weight / 10} Kg`;
  pokemonHeight.textContent = `Height: ${height / 10} M`;

  spriteContainer.innerHTML = 
  `<img id="sprite-default" src="${sprites.front_default}" alt="${name}">
   <span class="sprite-text">Default</span>`;
  if (sprites.front_female && sprites.front_shiny_female) {
    spriteContainerFemale.innerHTML = 
    `<img id="sprite-female" src="${sprites.front_female}" alt="${name}">
     <span class="sprite-text">Female</span>`;
    spriteContainerShinyFemale.innerHTML = `<img id="sprite-shiny-female" src="${sprites.front_shiny_female}" alt="${name}">
     <span class="sprite-text">Shiny Female</span>`;
  } else {
    spriteContainerFemale.innerHTML = '';
    spriteContainerShinyFemale.innerHTML = ''; // Clear the container if no female sprite exists
  }
  spriteContainerShiny.innerHTML = 
  `<img id="sprite-shiny" src="${sprites.front_shiny}" alt="${name}">
   <span class="sprite-text">Shiny</span>`;

  hp.textContent = `HP: ${stats[0].base_stat}`;
  attack.textContent = `Attack: ${stats[1].base_stat}`;
  defense.textContent = `Defense: ${stats[2].base_stat}`;
  specialAttack.textContent = `Sp.Attack: ${stats[3].base_stat}`;
  specialDefense.textContent = `Sp.Def ${stats[4].base_stat}`;
  speed.textContent = `Speed: ${stats[5].base_stat}`;

  pokemonTypes.innerHTML = types.map(obj => `<span class="${obj.type.name}">${obj.type.name[0].toUpperCase() + obj.type.name.slice(1)}</span>`).join(" ");
};

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  getPokemon();
});

searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    searchButton.click();
  }
});

