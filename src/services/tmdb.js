const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY || process.env.API_KEY;

export function isTmdbConfigured() {
  return Boolean(API_KEY);
}

async function getJson(url) {
  const response = await fetch(url, {
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

function pegarDiretor(crew = [], createdBy = []) {
  const diretor = crew.find((pessoa) => pessoa.job === 'Director');

  if (diretor?.name) {
    return diretor.name;
  }

  if (createdBy.length > 0) {
    return createdBy.map((pessoa) => pessoa.name).join(', ');
  }

  return 'Nao informado';
}

export async function fetchPopularByCategory(categoria) {
  if (!API_KEY) {
    throw new Error('TMDB API key ausente. Configure EXPO_PUBLIC_TMDB_API_KEY no .env.');
  }

  const tipo = categoria === 'series' ? 'tv' : 'movie';
  const popularesUrl = `${TMDB_BASE_URL}/${tipo}/popular?api_key=${API_KEY}&language=pt-BR&page=1`;

  const populares = await getJson(popularesUrl);
  const itensBase = (populares.results || []).slice(0, 12);

  const resultadoFinal = [];

  for (const item of itensBase) {
    try {
      const detalhesUrl = `${TMDB_BASE_URL}/${tipo}/${item.id}?api_key=${API_KEY}&language=pt-BR&append_to_response=credits`;
      const detalhes = await getJson(detalhesUrl);

      const nome = detalhes.title || detalhes.name || 'Sem titulo';
      const data = detalhes.release_date || detalhes.first_air_date || '';
      const ano = data ? data.slice(0, 4) : '----';
      const genero = (detalhes.genres || []).map((g) => g.name).join(', ') || 'Nao informado';
      const diretor = pegarDiretor(detalhes.credits?.crew, detalhes.created_by || []);
      const atores = (detalhes.credits?.cast || []).slice(0, 4).map((ator) => ator.name);

      resultadoFinal.push({
        id: String(detalhes.id),
        nome,
        descricao: detalhes.overview || 'Descricao nao disponivel.',
        imagem: detalhes.poster_path ? `${TMDB_IMAGE_BASE_URL}${detalhes.poster_path}` : null,
        genero,
        diretor,
        atoresPrincipais: atores,
        ano,
      });
    } catch (error) {
    }
  }

  return resultadoFinal;
}
