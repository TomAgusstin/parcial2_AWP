// const app = new Vue({
//     el: '#app',

//     data:
//     {
//         search: '',
//         allPeliculas: peliculas,
//         peliculaSeleccionada: [],
//         peliculasFav: []
//     },


//     created() {
//         this.leer();
//     },

//     computed:
//     {
       
//     },

//     methods:
//     {
//         leer() {
            
//         let datosGuardados = localStorage.getItem('peliFav');

//         if(datosGuardados)
//         {
//             this.peliculasFav = JSON.parse(datosGuardados);

//             for(let i in this.allPeliculas)
//             {
//                 if(this.allPeliculas[i].nombre == datosGuardados.nombre)
//                 {
//                     this.allPeliculas[i].fav = true;
//                 }
//             }
//         }

//         },

//         mostrarPelicula(item) {

//             fetch(`http://www.omdbapi.com/?t=${item.nombre}&apikey=${APIKEY}`)
//                 .then(resp => {
//                     return resp.json();
//                 })
//                 .then(json => {
//                     console.log(json)
//                     document.getElementById('tituloModal').innerText = json.Title;
//                     document.getElementById('descripcionMovie').innerText = json.Plot;
//                     document.getElementById('img-modal').src = json.Poster;
//                     document.getElementById('writer').innerText = json.Writer;
//                     document.getElementById('year').innerText = json.Year;
//                     document.getElementById('actors').innerText = json.Actors;
//                     document.getElementById('director').innerText = json.Director;

//                 })
//                 .catch(err => { console.log(`Error: ${err}`) })
//                 .finally(ok => {
//                     console.log(`Succes`);
//                 })
//         },

//         limpiarModal() {
//             document.getElementById('tituloModal').innerText = "";
//             document.getElementById('descripcionMovie').innerText = "";
//             document.getElementById('img-modal').src = "";
//             document.getElementById('writer').innerText = "";
//             document.getElementById('year').innerText = "";
//             document.getElementById('actors').innerText = "";
//             document.getElementById('director').innerText = "";
//         },

//         favoritos(item) {
//             item.fav = !item.fav;

//             let noExistePelicula = true;

//             if (this.peliculasFav.length > 0) {
//                 for (const i in this.peliculasFav) 
//                 {
                    
//                     if (this.peliculasFav[i].nombre == item.nombre) 
//                     {
//                         this.peliculasFav.splice(i, 1);
//                         noExistePelicula = false;
//                     }
//                 }

//                 if(noExistePelicula)
//                     {
//                         this.peliculasFav.push(item);
//                     }
//             }
//             else {
//                 this.peliculasFav.push(item);
//             }

//             localStorage.setItem('peliFav', JSON.stringify(this.peliculasFav));

//         },

//         fetchPelicula()
//         {
//             fetch(`http://www.omdbapi.com/?s=superman&page=5&apikey=${APIKEY}`)
//         .then(resp=>{
//             return resp.json();
//         })
//         .then(json=>{
//             // this.allPeliculas = [];

//             for(let i = 0; i < json.Search.length; i++)
//             {   
                
//                 let pelis = new Object();
//                 pelis.nombre = json.Search[i].Title;
//                 pelis.poster = json.Search[i].Poster;
//                 pelis.year = json.Search[i].Year;
//                 pelis.fav = false;
//                 peliculas.push(pelis);
                               
//             }          
            
//             this.allPeliculas = peliculas;
//         })
//         .catch(err=> {console.log(`Error: ${err}`)})
//         .finally(ok=>{
//             console.log(`Succes ${ok}`);
//         })
//         }
//     }

// })


function verPelicula(name){
        {   
            fetch(`http://www.omdbapi.com/?t=${name}&apikey=${APIKEY}`)
            .then(resp=>{
                return resp.json();
            })
            .then(json=>{
                console.log(json)
              document.getElementById('imgModal').src = json.Poster;
              document.getElementById('tituloModal').innerText = json.Title;
              document.getElementById('writerModal').innerText = json.Writer;   
              document.getElementById('yearModal').innerText = json.Year;
              document.getElementById('actorsModal').innerText = json.Actors;
              document.getElementById('descripcionModal').innerText = json.Plot;   
              document.getElementById('directorModal').innerText = json.Director;
   
            })
            .catch(err=> {console.log(`Error: ${err}`)})
            .finally(ok=>{
                console.log(`Succes`);
            })
        }
}


function limpiarModal(){
                document.getElementById('tituloModal').innerText = "";
                document.getElementById('descripcionModal').innerText = "";
                document.getElementById('imgModal').src = "";
                document.getElementById('writerModal').innerText = "";
                document.getElementById('yearModal').innerText = "";
                document.getElementById('actorsModal').innerText = "";
                document.getElementById('directorModal').innerText = "";
            }


function movieFav(name){
    let existe = false;
    if(arrayFav.length > 0)
    {
        for (const i in arrayFav) {
            if(arrayFav[i] == name)
            {
                arrayFav.splice(i, 1);
                existe = true;
            }
        }

        if(!existe)
        {
        arrayFav.push(name)
        }
    }
    else
    {   
        arrayFav.push(name)
    }
}

function llenarModal(){

    let cont = document.getElementById('peliFav');
    let html;

    cont.innerHTML = "";
    if(arrayFav.length > 0)
    {    document.getElementById('noFavs').innerText = "";
         for (const i in arrayFav) {
            html += `
            <label class="list-group-item py-3 pe-5">
                          <div class="col-xs-12 my-2">
                            <i class="fa-solid fa-trash float-end text-pink" onclick="borrarFav('${arrayFav[i]}')"></i>
                            <p id="favNombre" class="text-pink">${arrayFav[i]}</p>
                          </div>
                          </label>`
            // document.getElementById('favPoster').src = ;
            // document.getElementById('favNombre').innerText = arrayFav[i].name;
        }

        cont.innerHTML = html;
    }
    else
    {
        document.getElementById('noFavs').innerText = 'No hay favoritos aun.';
    }
}

function borrarFav(name){
 
        for (const i in arrayFav) {
            if(arrayFav[i] == name)
            {
                arrayFav.splice(i, 1);
                llenarModal();
            }
        }
}