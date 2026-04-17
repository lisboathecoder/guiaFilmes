fetch(`https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&language=pt-BR`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    })