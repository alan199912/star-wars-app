import { Characters } from '../models/characters.model';
import { Films } from '../models/films.model';
import { Planets } from '../models/planets.model';
import { StarShips } from '../models/starships.model';

export const characterTemplate = (data: Characters, starships: StarShips[], films: Films[]) => {
  return `
  <div class="flex flex-col px-10">
  <div class="my-5">
    <h2 class="text-3xl text-white font-bold mt-5">Características</h2>

    <div class="mt-5 bg-[#2C2C2C] rounded-lg flex flex-col justify-start w-[300px]">
      <span class="text-white font-bold rounded-lg px-5 pt-2.5 mr-2 mb-2">
        Altura: ${data.height}
      </span>
      <span class="text-white font-bold rounded-lg px-5 pt-2.5 mr-2 mb-2">
        Peso: ${data.mass}
      </span>
      <span class="text-white font-bold rounded-lg px-5 pt-2.5 mr-2 mb-2">
        Genero: ${data.gender}
      </span>
      <span class="text-white font-bold rounded-lg px-5 pt-2.5 mr-2 mb-2">
        Fecha de nacimiento: ${data.birth_year}
      </span>
    </div>
  </div>

  <div class="my-5 flex flex-col items-end">
    <h2 class="text-3xl text-white font-bold mt-5">Naves</h2>

    <div class="mt-5 bg-[#2C2C2C] rounded-lg flex flex-col justify-end w-[300px] text-right">
      ${starships.map(
        (starship) => `
          <span
              class="text-white font-bold rounded-lg px-5 pt-2.5 mr-2 mb-2"
            >
              Nombre: ${starship.name}
            </span>
          `
      )}
    </div>
  </div>

  <div class="my-5 flex flex-col items-start">
    <h2 class="text-3xl text-white font-bold mt-5">Películas</h2>

    <div class="mt-5 bg-[#2C2C2C] rounded-lg flex flex-col justify-start w-[300px] text-left">
    ${films.map(
      (film) => `
        <span
            class="text-white font-bold rounded-lg px-5 pt-2.5 mr-2 mb-2"
          >
            Nombre: ${film.title}
          </span>
        `
    )}
    </div>
  </div>
</div>
  `;
};

export const planetsTemplate = (data: Planets, residents: Characters[], films: Films[]) => {
  return `
  <div class="flex flex-col px-10">
  <div class="my-5">
    <h2 class="text-3xl text-white font-bold mt-5">Características</h2>

    <div class="mt-5 bg-[#2C2C2C] rounded-lg flex flex-col justify-start w-[300px]">
      <span class="text-white font-bold rounded-lg px-5 pt-2.5 mr-2 mb-2">
        Clima: ${data.climate}
      </span>
      <span class="text-white font-bold rounded-lg px-5 pt-2.5 mr-2 mb-2">
        Gravedad: ${data.gravity}
      </span>
      <span class="text-white font-bold rounded-lg px-5 pt-2.5 mr-2 mb-2">
        Terreno: ${data.terrain}
      </span>
      <span class="text-white font-bold rounded-lg px-5 pt-2.5 mr-2 mb-2">
        Población: ${data.population}
      </span>
    </div>
  </div>

  <div class="my-5 flex flex-col items-end">
    <h2 class="text-3xl text-white font-bold mt-5">Residentes</h2>

    <div class="mt-5 bg-[#2C2C2C] rounded-lg flex flex-col justify-end w-[300px] text-right">
      ${residents.map(
        (people) => `
          <span
              class="text-white font-bold rounded-lg px-5 pt-2.5 mr-2 mb-2"
            >
              Nombre: ${people.name}
            </span>
          `
      )}
    </div>
  </div>

  <div class="my-5 flex flex-col items-start">
    <h2 class="text-3xl text-white font-bold mt-5">Películas</h2>

    <div class="mt-5 bg-[#2C2C2C] rounded-lg flex flex-col justify-start w-[300px] text-left">
    ${films.map(
      (film) => `
        <span
            class="text-white font-bold rounded-lg px-5 pt-2.5 mr-2 mb-2"
          >
            Nombre: ${film.title}
          </span>
        `
    )}
    </div>
  </div>
</div>
  `;
};

export const starshipsTemplate = (data: StarShips, pilots: Characters[], films: Films[]) => {
  return `
  <div class="flex flex-col px-10">
  <div class="my-5">
    <h2 class="text-3xl text-white font-bold mt-5">Características</h2>

    <div class="mt-5 bg-[#2C2C2C] rounded-lg flex flex-col justify-start w-[300px]">
      <span class="text-white font-bold rounded-lg px-5 pt-2.5 mr-2 mb-2">
        Modelo: ${data.model}
      </span>
      <span class="text-white font-bold rounded-lg px-5 pt-2.5 mr-2 mb-2">
        Clase: ${data.starship_class}
      </span>
      <span class="text-white font-bold rounded-lg px-5 pt-2.5 mr-2 mb-2">
        Fabricante: ${data.manufacturer}
      </span>
      <span class="text-white font-bold rounded-lg px-5 pt-2.5 mr-2 mb-2">
        Precio: ${data.cost_in_credits}
      </span>
      <span class="text-white font-bold rounded-lg px-5 pt-2.5 mr-2 mb-2">
        Velocidad atmosférica maxima: ${data.max_atmosphering_speed}
      </span>
    </div>
  </div>

  <div class="my-5 flex flex-col items-end">
    <h2 class="text-3xl text-white font-bold mt-5">Pilotos</h2>

    <div class="mt-5 bg-[#2C2C2C] rounded-lg flex flex-col justify-end w-[300px] text-right">
      ${
        pilots.length === 0
          ? `<div class="text-white font-bold rounded-lg px-5 pt-2.5 mr-2 mb-2"> No tiene pilotos</div>`
          : pilots.map(
              (people) => `
            <span
                class="text-white font-bold rounded-lg px-5 pt-2.5 mr-2 mb-2"
              >
                Nombre: ${people.name}
              </span>
            `
            )
      }
    </div>
  </div>

  <div class="my-5 flex flex-col items-start">
    <h2 class="text-3xl text-white font-bold mt-5">Películas</h2>

    <div class="mt-5 bg-[#2C2C2C] rounded-lg flex flex-col justify-start w-[300px] text-left">
    ${films.map(
      (film) => `
        <span
            class="text-white font-bold rounded-lg px-5 pt-2.5 mr-2 mb-2"
          >
            Nombre: ${film.title}
          </span>
        `
    )}
    </div>
  </div>
</div>
  `;
};

export const filmsTemplate = (
  data: Films,
  characters: Characters[],
  starships: StarShips[],
  planets: Planets[]
) => {
  return `
  <div class="flex flex-col px-10">
  <div class="my-5">
    <h2 class="text-3xl text-white font-bold mt-5">Características</h2>

    <div class="mt-5 bg-[#2C2C2C] rounded-lg flex flex-col justify-start w-[300px]">
      <span class="text-white font-bold rounded-lg px-5 pt-2.5 mr-2 mb-2">
        Episodio: ${data.episode_id}
      </span>
      <span class="text-white font-bold rounded-lg px-5 pt-2.5 mr-2 mb-2">
        Director: ${data.director}
      </span>
      <span class="text-white font-bold rounded-lg px-5 pt-2.5 mr-2 mb-2">
        Productor: ${data.producer}
      </span>
      <span class="text-white font-bold rounded-lg px-5 pt-2.5 mr-2 mb-2">
        Sinópsis : ${data.opening_crawl}
      </span>
    </div>
  </div>

  <div class="my-5 flex flex-col items-end">
    <h2 class="text-3xl text-white font-bold mt-5">Naves</h2>

    <div class="mt-5 bg-[#2C2C2C] rounded-lg flex flex-col justify-end w-[300px] text-right">
      ${starships.map(
        (starship) => `
          <span
              class="text-white font-bold rounded-lg px-5 pt-2.5 mr-2 mb-2"
            >
              Nombre: ${starship.name}
            </span>
          `
      )}
    </div>
  </div>

  <div class="my-5 flex flex-col items-start">
    <h2 class="text-3xl text-white font-bold mt-5">Personajes</h2>

    <div class="mt-5 bg-[#2C2C2C] rounded-lg flex flex-col justify-start w-[300px] text-left">
    ${characters.map(
      (people) => `
        <span
            class="text-white font-bold rounded-lg px-5 pt-2.5 mr-2 mb-2"
          >
            Nombre: ${people.name}
          </span>
        `
    )}
    </div>
  </div>

  <div class="my-5 flex flex-col items-end">
    <h2 class="text-3xl text-white font-bold mt-5">Planetas</h2>

    <div class="mt-5 bg-[#2C2C2C] rounded-lg flex flex-col justify-end w-[300px] text-right">
    ${planets.map(
      (planet) => `
        <span
            class="text-white font-bold rounded-lg px-5 pt-2.5 mr-2 mb-2"
          >
            Nombre: ${planet.name}
          </span>
        `
    )}
    </div>
  </div>
</div>
  `;
};
