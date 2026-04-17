const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY || process.env.API_KEY;

function buildUrl(path, params = {}) {
  const query = new URLSearchParams({
    api_key: API_KEY || '',
    ...params,
  });

  return `${TMDB_BASE_URL}${path}?${query.toString()}`;
}

async function request(path, params = {}) {
  const response = await fetch(buildUrl(path, params), {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed (${response.status})`);
  }

  return response.json();
}

function getMovieDirector(crew = []) {
  const director = crew.find((person) => person.job === 'Director');
  return director?.name || 'Nao informado';
}

function getSeriesDirector(crew = [], createdBy = []) {
  const preferredJobs = ['Series Director', 'Director', 'Executive Producer', 'Creator'];
  const crewDirector = preferredJobs
    .map((job) => crew.find((person) => person.job === job))
    .find(Boolean);

  if (crewDirector?.name) {
    return crewDirector.name;
  }

  if (createdBy.length > 0) {
    return createdBy.map((person) => person.name).join(', ');
  }

  return 'Nao informado';
}

function mapItemDetail(item, mediaType) {
  const title = item.title || item.name || 'Sem titulo';
  const releaseDate = item.release_date || item.first_air_date || '';
  const year = releaseDate ? releaseDate.slice(0, 4) : '----';
  const genre = (item.genres || []).map((entry) => entry.name).join(', ') || 'Nao informado';
  const cast = (item.credits?.cast || []).slice(0, 4).map((person) => person.name);

  const director =
    mediaType === 'movie'
      ? getMovieDirector(item.credits?.crew)
      : getSeriesDirector(item.credits?.crew, item.created_by || []);

  return {
    id: String(item.id),
    nome: title,
    descricao: item.overview || 'Descricao nao disponivel.',
    imagem: item.poster_path ? `${TMDB_IMAGE_BASE_URL}${item.poster_path}` : null,
    genero: genre,
    diretor: director,
    atoresPrincipais: cast,
    ano: year,
  };
}

export function isTmdbConfigured() {
  return Boolean(API_KEY);
}

export async function fetchPopularByCategory(categoria) {
  if (!API_KEY) {
    throw new Error('TMDB API key ausente. Configure EXPO_PUBLIC_TMDB_API_KEY no .env.');
  }

  const mediaType = categoria === 'series' ? 'tv' : 'movie';

  const popularData = await request(`/${mediaType}/popular`, {
    language: 'pt-BR',
    page: '1',
  });

  const baseResults = (popularData.results || []).slice(0, 12);

  const detailedResults = await Promise.all(
    baseResults.map(async (result) => {
      try {
        const details = await request(`/${mediaType}/${result.id}`, {
          language: 'pt-BR',
          append_to_response: 'credits',
        });

        return mapItemDetail(details, mediaType);
      } catch (error) {
        return null;
      }
    }),
  );

  return detailedResults.filter(Boolean);
}
