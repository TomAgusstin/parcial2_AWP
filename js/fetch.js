const APIKEY = '41534f60';
let palabra = document.getElementById('palabraBuscar');
let html;
let contenedor = document.getElementById('contenedor-pelis');
let arrayFav = [];
let buscar = document.getElementById('buscar');


buscar.addEventListener('click', function fetchMovies() { 
    {   
        fetch(`http://www.omdbapi.com/?s=${palabra.value}&page=5&apikey=${APIKEY}`)
        .then(resp=>{
            return resp.json();
        })
        .then(json=>{
            console.log(json)
            contenedor.innerHTML = "";
            html = "";
            for(let i = 0; i < json.Search.length; i++)
            {   
                html += `
                <div class=" card m-auto col-md-4 col-lg-3 my-4 mx-1">
                    <img src="${json.Search[i].Poster}" alt="${json.Search[i].Title}" class="card-img-top" id="img-poster">
                    <div class="card-body">
                      <h2  id="nombre" class="text-center text-pink">${json.Search[i].Title}</h2>
                      <div class="row">
                        <div class="col-xs-6 col-md-6 col-lg-6">
                          <p class="text-pink ">
                            <strong id="anio">${json.Search[i].Year}</strong>
                          </p>
                        </div>
                        <div class="col-xs-6 col-md-6 col-lg-6">
                          <i class="fa-solid fa-heart text-light" onclick="movieFav('a${json.Search[i].Title}')"><span class="text-pink"> Añadir a favoritos</span></i>
                        </div>
                      </div>
                      
                    </div>
                    <div class="card-body d-flex justify-content-center">
                      <a class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#modalPeliculas" onclick="verPelicula('${json.Search[i].Title}')"><strong>Ver mas</strong></a>
                    </div>
                      
                    </div>`;
                
            } 
            contenedor.innerHTML = html;
        })
        .catch(err=> {
          alert(`Puede que no se haya encontrado ninguna pelicula con ese nombre.`)
          console.log(`Error: ${err}`)})
        .finally(ok=>{
            console.log(`Succes`);
        })
    }
 })